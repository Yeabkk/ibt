import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { INITIAL_JOBS } from "../lib/jobs-data.js";

const prisma = new PrismaClient();

async function seedJobs() {
  for (const job of INITIAL_JOBS) {
    const data = {
      title: job.title,
      company: job.company,
      companyLogoText: job.companyLogoText ?? "",
      companyColor: job.companyColor ?? "#059669",
      category: job.category,
      location: job.location,
      workplaceType: job.workplaceType,
      employmentType: job.type,
      experience: job.experience,
      salary: job.salary,
      deadline: job.deadline,
      description: job.description,
      postedDate: job.postedDate ?? "Just now",
      applicantsCount: job.applicantsCount ?? 0,
      responsibilities: JSON.stringify(job.responsibilities ?? []),
      requirements: JSON.stringify(job.requirements ?? []),
      benefits: JSON.stringify(job.benefits ?? []),
      tags: JSON.stringify(job.tags ?? []),
      featured: Boolean(job.featured),
      urgent: Boolean(job.urgent),
      approvalStatus: "approved",
    };

    await prisma.job.upsert({
      where: { id: job.id },
      update: data,
      create: { id: job.id, ...data },
    });
  }
}

async function seedAdminFromEnvironment() {
  const { SEED_ADMIN_NAME, SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD } = process.env;
  const providedValues = [SEED_ADMIN_NAME, SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD];

  if (providedValues.every((value) => !value)) return;
  if (providedValues.some((value) => !value)) {
    throw new Error(
      "Set SEED_ADMIN_NAME, SEED_ADMIN_EMAIL, and SEED_ADMIN_PASSWORD together.",
    );
  }

  const passwordHash = await bcrypt.hash(SEED_ADMIN_PASSWORD, 12);

  await prisma.user.upsert({
    where: { email: SEED_ADMIN_EMAIL.toLowerCase() },
    update: {
      name: SEED_ADMIN_NAME,
      passwordHash,
      role: "admin",
    },
    create: {
      name: SEED_ADMIN_NAME,
      email: SEED_ADMIN_EMAIL.toLowerCase(),
      passwordHash,
      role: "admin",
    },
  });
}

try {
  await seedJobs();
  await seedAdminFromEnvironment();
  console.log(`Seeded ${INITIAL_JOBS.length} demo jobs.`);
} finally {
  await prisma.$disconnect();
}
