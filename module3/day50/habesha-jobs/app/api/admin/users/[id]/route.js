import { prisma } from "@/lib/prisma";
import { requireRole, requireUser } from "@/lib/authorization";
import { jsonError, readJson, validationError } from "@/lib/http";
import { roleUpdateSchema } from "@/lib/validation";

export async function PATCH(request, { params }) {
  const auth = await requireUser();
  if (auth.response) return auth.response;
  const denied = requireRole(auth.user, ["admin"]);
  if (denied) return denied;

  const { id } = await params;
  if (id === auth.user.id) {
    return jsonError("You cannot change your own administrator role.", 409);
  }

  const { data: body, response } = await readJson(request);
  if (response) return response;
  const parsed = roleUpdateSchema.safeParse(body);
  if (!parsed.success) return validationError(parsed.error);

  const existing = await prisma.user.findUnique({ where: { id }, select: { id: true } });
  if (!existing) return jsonError("User not found.", 404);

  const user = await prisma.user.update({
    where: { id },
    data: { role: parsed.data.role },
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  });
  return Response.json({ user });
}
