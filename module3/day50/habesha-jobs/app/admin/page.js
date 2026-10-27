import { Suspense } from "react";
import { redirect } from "next/navigation";
import AdminDashboard from "@/components/AdminDashboard";
import { getCurrentUser } from "@/lib/auth";

export const metadata = { title: "Admin dashboard" };

export default function AdminPage() {
  return (
    <Suspense fallback={<main className="p-8 text-sm text-slate-500">Loading administration...</main>}>
      <AdminContent />
    </Suspense>
  );
}

async function AdminContent() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/admin");
  if (user.role !== "admin") redirect("/dashboard");
  return <AdminDashboard admin={user} />;
}
