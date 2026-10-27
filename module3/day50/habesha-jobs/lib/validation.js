import { z } from "zod";

const roleSchema = z.enum(["jobSeeker", "employer"]);
const textArray = z.array(z.string().trim().min(1).max(500)).max(30);

export const registrationSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  password: z.string().min(10).max(128),
  role: roleSchema,
});

export const loginSchema = z.object({
  email: z.string().trim().email().max(254),
  password: z.string().min(1).max(128),
});

export const jobSchema = z.object({
  title: z.string().trim().min(3).max(150),
  company: z.string().trim().min(2).max(150),
  category: z.string().trim().min(2).max(80),
  location: z.string().trim().min(2).max(150),
  workplaceType: z.enum(["On-site", "Hybrid", "Remote"]),
  employmentType: z.enum(["Full-Time", "Part-Time", "Contract", "Internship"]),
  experience: z.string().trim().min(2).max(100),
  salary: z.string().trim().min(2).max(120),
  deadline: z.string().trim().min(2).max(80),
  description: z.string().trim().min(20).max(5000),
  responsibilities: textArray.default([]),
  requirements: textArray.default([]),
  benefits: textArray.default([]),
  tags: z.array(z.string().trim().min(1).max(60)).max(30).default([]),
  featured: z.boolean().default(false),
  urgent: z.boolean().default(false),
});

export const jobUpdateSchema = jobSchema.partial().extend({
  approvalStatus: z.enum(["pending", "approved", "rejected"]).optional(),
});

export const applicationSchema = z.object({
  jobId: z.string().min(1),
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().min(8).max(24).refine((value) => {
    const normalized = value.replace(/[\s-]/g, "");
    return /^(?:\+?251|0)9\d{8}$/.test(normalized);
  }, "Enter a valid Ethiopian mobile number."),
  location: z.string().trim().min(2).max(150),
  experience: z.string().trim().min(1).max(80),
  resumeFileName: z.string().trim().max(255).optional().or(z.literal("")),
  coverNote: z.string().trim().max(3000).optional(),
});

export const applicationStatusSchema = z.object({
  status: z.enum(["submitted", "reviewing", "shortlisted", "rejected", "withdrawn"]),
});

export const roleUpdateSchema = z.object({
  role: roleSchema,
});
