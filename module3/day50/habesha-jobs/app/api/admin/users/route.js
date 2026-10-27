import { prisma } from "@/lib/prisma";
import { requireRole, requireUser } from "@/lib/authorization";

export async function GET() {
  const auth = await requireUser();
  if (auth.response) return auth.response;
  const denied = requireRole(auth.user, ["admin"]);
  if (denied) return denied;

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      _count: { select: { jobs: true, applications: true } },
    },
    orderBy: { createdAt: "desc" },
  });
  return Response.json({ users });
}
