import { prisma } from "@/lib/prisma";
import { requireRole, requireUser } from "@/lib/authorization";
import { jsonError, readJson, validationError } from "@/lib/http";
import { applicationStatusSchema } from "@/lib/validation";

export async function PATCH(request, { params }) {
  const auth = await requireUser();
  if (auth.response) return auth.response;
  const { id } = await params;
  const application = await prisma.application.findUnique({
    where: { id },
    include: { job: { select: { employerId: true } } },
  });
  if (!application) return jsonError("Application not found.", 404);

  const { data: body, response } = await readJson(request);
  if (response) return response;
  const parsed = applicationStatusSchema.safeParse(body);
  if (!parsed.success) return validationError(parsed.error);

  const requestedStatus = parsed.data.status;
  const isApplicant = application.userId === auth.user.id;
  const isEmployer = application.job?.employerId === auth.user.id;
  const isAdmin = auth.user.role === "admin";

  if (requestedStatus === "withdrawn") {
    if (!isApplicant || auth.user.role !== "jobSeeker") {
      return jsonError("You can only withdraw your own application.", 403);
    }
  } else if (!isAdmin && !(isEmployer && auth.user.role === "employer")) {
    return jsonError("Only the job owner or an administrator can update this status.", 403);
  }

  const updated = await prisma.application.update({
    where: { id },
    data: { status: requestedStatus },
  });
  return Response.json({ application: updated });
}
