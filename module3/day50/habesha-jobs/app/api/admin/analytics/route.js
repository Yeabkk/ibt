import { requireRole, requireUser } from "@/lib/authorization";
import { getAdminAnalytics } from "@/lib/admin-data";

export async function GET() {
  const auth = await requireUser();
  if (auth.response) return auth.response;
  const denied = requireRole(auth.user, ["admin"]);
  if (denied) return denied;

  const analytics = await getAdminAnalytics();
  return Response.json({ analytics });
}
