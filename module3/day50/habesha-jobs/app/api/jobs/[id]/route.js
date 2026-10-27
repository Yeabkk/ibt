import { prisma } from "@/lib/prisma";
import { requireRole, requireUser } from "@/lib/authorization";
import { internalError, jsonError, readJson, validationError } from "@/lib/http";
import { serializeJob } from "@/lib/jobs";
import { jobUpdateSchema } from "@/lib/validation";

export async function GET(request, { params }) {
  const { id } = await params;
  const job = await prisma.job.findUnique({
    where: { id },
    include: { employer: { select: { id: true, name: true } } },
  });

  if (!job) return jsonError("Job not found.", 404);

  if (job.approvalStatus !== "approved") {
    const auth = await requireUser();
    if (auth.response) return auth.response;
    const ownsJob = job.employerId === auth.user.id;
    if (!ownsJob && auth.user.role !== "admin") {
      return jsonError("Job not found.", 404);
    }
  }

  return Response.json({ job: serializeJob(job) });
}

export async function PATCH(request, { params }) {
  const auth = await requireUser();
  if (auth.response) return auth.response;
  const denied = requireRole(auth.user, ["employer", "admin"]);
  if (denied) return denied;

  const { id } = await params;
  const existing = await prisma.job.findUnique({ where: { id } });
  if (!existing) return jsonError("Job not found.", 404);
  if (auth.user.role !== "admin" && existing.employerId !== auth.user.id) {
    return jsonError("You can only edit your own job listings.", 403);
  }

  const { data: body, response } = await readJson(request);
  if (response) return response;
  const parsed = jobUpdateSchema.safeParse(body);
  if (!parsed.success) return validationError(parsed.error);
  const updates = parsed.data;

  if (auth.user.role !== "admin") {
    if (Object.hasOwn(updates, "approvalStatus")) {
      return jsonError("Only administrators can change job approval status.", 403);
    }
    delete updates.featured;
    delete updates.urgent;
  }

  const { responsibilities, requirements, benefits, tags, ...fields } = updates;
  const data = {
    ...fields,
    ...(responsibilities && { responsibilities: JSON.stringify(responsibilities) }),
    ...(requirements && { requirements: JSON.stringify(requirements) }),
    ...(benefits && { benefits: JSON.stringify(benefits) }),
    ...(tags && { tags: JSON.stringify(tags) }),
  };
  if (auth.user.role === "employer" && existing.approvalStatus === "approved") {
    data.approvalStatus = "pending";
  }

  try {
    const job = await prisma.job.update({
      where: { id },
      data,
      include: { employer: { select: { id: true, name: true } } },
    });
    return Response.json({ job: serializeJob(job) });
  } catch {
    return internalError();
  }
}

export async function DELETE(request, { params }) {
  const auth = await requireUser();
  if (auth.response) return auth.response;
  const denied = requireRole(auth.user, ["employer", "admin"]);
  if (denied) return denied;

  const { id } = await params;
  const job = await prisma.job.findUnique({ where: { id } });
  if (!job) return jsonError("Job not found.", 404);
  if (auth.user.role !== "admin" && job.employerId !== auth.user.id) {
    return jsonError("You can only delete your own job listings.", 403);
  }

  await prisma.job.delete({ where: { id } });
  return Response.json({ success: true });
}
