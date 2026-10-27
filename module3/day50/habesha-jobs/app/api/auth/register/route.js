import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/auth";
import { jsonError, readJson, validationError } from "@/lib/http";
import { registrationSchema } from "@/lib/validation";

export async function POST(request) {
  const { data: body, response } = await readJson(request);
  if (response) return response;

  const parsed = registrationSchema.safeParse(body);
  if (!parsed.success) return validationError(parsed.error);

  const email = parsed.data.email.toLowerCase();
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) return jsonError("An account with this email already exists.", 409);

  const passwordHash = await bcrypt.hash(parsed.data.password, 12);
  try {
    const user = await prisma.user.create({
      data: {
        name: parsed.data.name,
        email,
        passwordHash,
        role: parsed.data.role,
      },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });

    await createSession(user.id);
    return Response.json({ user }, { status: 201 });
  } catch (error) {
    if (error.code === "P2002") {
      return jsonError("An account with this email already exists.", 409);
    }
    throw error;
  }
}
