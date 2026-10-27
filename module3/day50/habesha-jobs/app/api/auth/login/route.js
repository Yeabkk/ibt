import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/auth";
import { jsonError, readJson, validationError } from "@/lib/http";
import { loginSchema } from "@/lib/validation";

export async function POST(request) {
  const { data: body, response } = await readJson(request);
  if (response) return response;

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) return validationError(parsed.error);

  const user = await prisma.user.findUnique({
    where: { email: parsed.data.email.toLowerCase() },
  });
  const passwordMatches = user
    ? await bcrypt.compare(parsed.data.password, user.passwordHash)
    : false;

  if (!user || !passwordMatches) {
    return jsonError("Invalid email or password.", 401);
  }

  await createSession(user.id);
  return Response.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    },
  });
}
