"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Briefcase, LockKeyhole } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";

export default function AuthForm({ mode, defaultRole = "jobSeeker" }) {
  const isRegister = mode === "register";
  const router = useRouter();
  const { setUser } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(defaultRole === "employer" ? "employer" : "jobSeeker");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const response = await fetch(isRegister ? "/api/auth/register" : "/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isRegister ? { name, email, password, role } : { email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Please check the information and try again.");
        return;
      }
      setUser(data.user);
      router.push(data.user.role === "admin" ? "/admin" : "/dashboard");
      router.refresh();
    } catch {
      setError("A network error prevented sign-in. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <section className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
        <div className="bg-slate-950 px-7 py-7 text-white">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300">
            {isRegister ? <Briefcase className="h-5 w-5" /> : <LockKeyhole className="h-5 w-5" />}
          </div>
          <p className="mt-5 text-xs font-bold uppercase tracking-wider text-emerald-300">Habesha Jobs</p>
          <h1 className="mt-1 text-2xl font-black">{isRegister ? "Create your account" : "Welcome back"}</h1>
          <p className="mt-2 text-sm text-slate-300">
            {isRegister ? "Join as a job seeker or employer." : "Sign in to continue to your workspace."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-7">
          {isRegister && (
            <>
              <label className="block text-sm font-semibold text-slate-700">
                Full name
                <input required minLength={2} maxLength={100} value={name} onChange={(event) => setName(event.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 font-normal outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100" />
              </label>
              <label className="block text-sm font-semibold text-slate-700">
                Account type
                <select value={role} onChange={(event) => setRole(event.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 font-normal outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100">
                  <option value="jobSeeker">Job seeker</option>
                  <option value="employer">Employer</option>
                </select>
              </label>
            </>
          )}
          <label className="block text-sm font-semibold text-slate-700">
            Email address
            <input required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 font-normal outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100" />
          </label>
          <label className="block text-sm font-semibold text-slate-700">
            Password
            <input required type="password" autoComplete={isRegister ? "new-password" : "current-password"} minLength={isRegister ? 10 : 1} maxLength={128} value={password} onChange={(event) => setPassword(event.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 font-normal outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100" />
            {isRegister && <span className="mt-1 block text-xs font-normal text-slate-500">Use at least 10 characters.</span>}
          </label>
          {error && <p className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700" role="alert">{error}</p>}
          <button disabled={submitting} className="w-full rounded-lg bg-emerald-600 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-700 disabled:cursor-wait disabled:opacity-60">
            {submitting ? "Please wait..." : isRegister ? "Create account" : "Sign in"}
          </button>
          <p className="text-center text-sm text-slate-600">
            {isRegister ? "Already registered?" : "New to Habesha Jobs?"}{" "}
            <Link href={isRegister ? "/login" : "/register"} className="font-bold text-emerald-700 hover:underline">
              {isRegister ? "Sign in" : "Create an account"}
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}
