import { Suspense } from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { serializeJob } from "@/lib/jobs";
import { getCurrentUser } from "@/lib/auth";
import JobDetailPageClient from "@/components/JobDetailPageClient";

export const metadata = { title: "Job details" };

export default function JobPage({ params }) {
  return (
    <Suspense fallback={<main className="mx-auto w-full max-w-5xl px-4 py-12 text-sm text-slate-500">Loading job details...</main>}>
      <JobContent params={params} />
    </Suspense>
  );
}

async function JobContent({ params }) {
  const { id } = await params;
  const user = await getCurrentUser();
  const canSeeAll = user?.role === "admin";
  const record = await prisma.job.findFirst({
    where: canSeeAll
      ? { id }
      : {
          id,
          OR: [
            { approvalStatus: "approved" },
            ...(user ? [{ employerId: user.id }] : []),
          ],
        },
    include: { employer: { select: { id: true, name: true } } },
  });
  if (!record) notFound();
  return <JobDetailPageClient job={serializeJob(record)} />;
}
