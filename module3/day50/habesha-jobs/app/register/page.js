"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AuthForm from "@/components/AuthForm";

export default function RegisterPage() {
  return (
    <Suspense fallback={<main className="p-12 text-center text-sm text-slate-500">Loading registration...</main>}>
      <RegistrationForm />
    </Suspense>
  );
}

function RegistrationForm() {
  const searchParams = useSearchParams();
  return <AuthForm mode="register" defaultRole={searchParams.get("role")} />;
}
