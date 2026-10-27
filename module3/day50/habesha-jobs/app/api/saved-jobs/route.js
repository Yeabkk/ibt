import { prisma } from "@/lib/prisma";
import { requireRole, requireUser } from "@/lib/authorization";
import { jsonError, readJson } from "@/lib/http";

export async function GET() {
  const auth = await requireUser();
  if (auth.response) return auth.response;
  const denied = requireRole(auth.user, ["jobSeeker"]);
  if (denied) return denied;

  const savedJobs = await prisma.savedJob.findMany({
    where: { userId: auth.user.id },
    include: { job: true },
    orderBy: { createdAt: "desc" },
  });
  return Response.json({ savedJobs });
}

export async function POST(request) {
  const auth = await requireUser();
  if (auth.response) return auth.response;
  const denied = requireRole(auth.user, ["jobSeeker"]);
  if (denied) return denied;
  const { data: body, response } = await readJson(request);
  if (response) return response;
  if (typeof body.jobId !== "string" || !body.jobId) {
    return jsonError("A jobId is required.", 422);
  }

  const job = await prisma.job.findFirst({
    where: { id: body.jobId, approvalStatus: "approved" },
    select: { id: true },
  });
  if (!job) return jsonError("Job not found.", 404);

  const savedJob = await prisma.savedJob.upsert({
    where: { userId_jobId: { userId: auth.user.id, jobId: job.id } },
    update: {},
    create: { userId: auth.user.id, jobId: job.id },
  });
  return Response.json({ savedJob }, { status: 201 });
}

export async function DELETE(request) {
  const auth = await requireUser();
  if (auth.response) return auth.response;
  const denied = requireRole(auth.user, ["jobSeeker"]);
  if (denied) return denied;
  const jobId = new URL(request.url).searchParams.get("jobId");
  if (!jobId) return jsonError("A jobId query parameter is required.", 400);

  await prisma.savedJob.deleteMany({ where: { userId: auth.user.id, jobId } });
  return Response.json({ success: true });
}
