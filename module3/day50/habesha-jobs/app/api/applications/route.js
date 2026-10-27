import { randomBytes } from "node:crypto";
import { prisma } from "@/lib/prisma";
import { requireRole, requireUser } from "@/lib/authorization";
import { internalError, jsonError, readJson, validationError } from "@/lib/http";
import { applicationSchema } from "@/lib/validation";

export async function GET() {
  const auth = await requireUser();
  if (auth.response) return auth.response;

  let where = {};
  if (auth.user.role === "jobSeeker") {
    where.userId = auth.user.id;
  } else if (auth.user.role === "employer") {
    where.job = { employerId: auth.user.id };
  } else if (auth.user.role !== "admin") {
    return jsonError("You do not have permission to view applications.", 403);
  }

  try {
    const applications = await prisma.application.findMany({
      where,
      include: {
        applicant: { select: { id: true, name: true, email: true } },
        job: { select: { id: true, title: true, company: true, employerId: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return Response.json({ applications });
  } catch {
    return internalError();
  }
}

export async function POST(request) {
  const auth = await requireUser();
  if (auth.response) return auth.response;
  const denied = requireRole(auth.user, ["jobSeeker"]);
  if (denied) return denied;

  const { data: body, response } = await readJson(request);
  if (response) return response;
  const parsed = applicationSchema.safeParse(body);
  if (!parsed.success) return validationError(parsed.error);

  const job = await prisma.job.findFirst({
    where: { id: parsed.data.jobId, approvalStatus: "approved" },
  });
  if (!job) return jsonError("This job is unavailable for applications.", 404);

  const existingApplication = await prisma.application.findFirst({
    where: { userId: auth.user.id, jobId: job.id },
    select: { id: true },
  });
  if (existingApplication) return jsonError("You have already applied to this job.", 409);

  const referenceCode = `HJ-${new Date().getFullYear()}-${randomBytes(4).toString("hex").toUpperCase()}`;
  try {
    const application = await prisma.application.create({
      data: {
        ...parsed.data,
        email: auth.user.email,
        referenceCode,
        userId: auth.user.id,
        jobId: job.id,
        jobTitle: job.title,
        company: job.company,
      },
    });
    return Response.json({ application }, { status: 201 });
  } catch {
    return internalError();
  }
}
