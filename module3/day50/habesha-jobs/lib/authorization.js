import "server-only";
import { getCurrentUser } from "@/lib/auth";
import { jsonError } from "@/lib/http";

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) {
    return { user: null, response: jsonError("Authentication required.", 401) };
  }
  return { user, response: null };
}

export function requireRole(user, roles) {
  if (!roles.includes(user.role)) {
    return jsonError("You do not have permission to perform this action.", 403);
  }
  return null;
}
