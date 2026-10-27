import "server-only";
import { prisma } from "@/lib/prisma";

export async function getAdminAnalytics() {
  const [totalJobs, totalUsers, totalApplications, pendingJobs, jobs, applications] =
    await Promise.all([
      prisma.job.count(),
      prisma.user.count(),
      prisma.application.count(),
      prisma.job.count({ where: { approvalStatus: "pending" } }),
      prisma.job.findMany({
        select: { category: true, employmentType: true, approvalStatus: true },
      }),
      prisma.application.findMany({
        select: { createdAt: true },
        orderBy: { createdAt: "asc" },
      }),
    ]);

  const countBy = (field) => {
    const counts = new Map();
    for (const job of jobs) {
      const label = job[field] || "Other";
      counts.set(label, (counts.get(label) ?? 0) + 1);
    }
    return [...counts].map(([name, value]) => ({ name, value }));
  };

  const dailyApplications = new Map();
  for (const application of applications) {
    const date = application.createdAt.toISOString().slice(0, 10);
    dailyApplications.set(date, (dailyApplications.get(date) ?? 0) + 1);
  }

  const statusCounts = new Map([
    ["pending", 0],
    ["approved", 0],
    ["rejected", 0],
  ]);
  for (const job of jobs) {
    statusCounts.set(job.approvalStatus, (statusCounts.get(job.approvalStatus) ?? 0) + 1);
  }

  return {
    totals: { jobs: totalJobs, users: totalUsers, applications: totalApplications, pendingJobs },
    jobsByCategory: countBy("category"),
    jobsByEmploymentType: countBy("employmentType"),
    applicationsOverTime: [...dailyApplications].map(([date, count]) => ({ date, count })),
    jobsByApprovalStatus: [...statusCounts].map(([name, value]) => ({ name, value })),
  };
}
