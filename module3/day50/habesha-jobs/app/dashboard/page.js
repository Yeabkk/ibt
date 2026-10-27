import { Suspense } from "react";
import { redirect } from "next/navigation";
import RoleDashboard from "@/components/RoleDashboard";
import { getCurrentUser } from "@/lib/auth";

export const metadata = { title: "My dashboard" };

export default function DashboardPage() {
  return (
    <Suspense fallback={<main className="p-8 text-sm text-slate-500">Loading your workspace...</main>}>
      <DashboardContent />
    </Suspense>
  );
}

async function DashboardContent() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/dashboard");
  if (user.role === "admin") redirect("/admin");
  return <RoleDashboard user={user} />;
}
