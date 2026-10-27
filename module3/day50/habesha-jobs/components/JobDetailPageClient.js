"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Bookmark, CalendarDays, Check, Copy, MapPin, Send } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import ApplyModal from "@/components/ApplyModal";
import { toggleSavedJobId } from "@/lib/storage";

export default function JobDetailPageClient({ job }) {
  const { user } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const [applyOpen, setApplyOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (user?.role !== "jobSeeker") return;
    fetch("/api/saved-jobs", { cache: "no-store" })
      .then((response) => response.ok ? response.json() : null)
      .then((data) => {
        if (data) setIsSaved(data.savedJobs.some((saved) => saved.jobId === job.id));
      })
      .catch(() => setNotice("Could not load your saved-job status."));
  }, [job.id, user]);

  async function toggleSave() {
    if (user?.role === "jobSeeker") {
      const response = await fetch(
        isSaved ? `/api/saved-jobs?jobId=${encodeURIComponent(job.id)}` : "/api/saved-jobs",
        {
          method: isSaved ? "DELETE" : "POST",
          headers: isSaved ? undefined : { "Content-Type": "application/json" },
          body: isSaved ? undefined : JSON.stringify({ jobId: job.id }),
        },
      );
      if (!response.ok) {
        setNotice("Could not update saved jobs. Please sign in as a job seeker.");
        return;
      }
      setIsSaved(!isSaved);
      setNotice(isSaved ? "Removed from saved jobs." : "Saved to your account.");
      return;
    }

    if (user) {
      setNotice("Saved jobs are available to job seekers.");
      return;
    }

    const result = toggleSavedJobId(job.id);
    setIsSaved(result.isSaved);
    setNotice("Saved in this browser only.");
  }

  async function shareJob() {
    const url = `${window.location.origin}/jobs/${encodeURIComponent(job.id)}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setNotice("Job link copied.");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setNotice("Could not access the clipboard. Copy the page URL from your browser.");
    }
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-emerald-700">
        <ArrowLeft className="h-4 w-4" /> Back to vacancies
      </Link>

      <article className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 bg-slate-950 px-6 py-7 text-white sm:px-8">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-sm font-black text-white" style={{ backgroundColor: job.companyColor }}>
                {job.companyLogoText || job.company.slice(0, 3).toUpperCase()}
              </div>
              <div>
                <p className="text-xs font-bold uppercase text-emerald-300">{job.company}</p>
                <h1 className="mt-1 text-2xl font-black sm:text-3xl">{job.title}</h1>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-300">
                  <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" />{job.location}</span>
                  <span>{job.employmentType}</span>
                  <span>{job.workplaceType}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={toggleSave} className="inline-flex items-center gap-2 rounded-lg border border-slate-600 px-3 py-2 text-sm font-semibold hover:bg-slate-800">
                <Bookmark className="h-4 w-4" /> {isSaved ? "Saved" : "Save job"}
              </button>
              <button onClick={shareJob} className="inline-flex items-center gap-2 rounded-lg border border-slate-600 px-3 py-2 text-sm font-semibold hover:bg-slate-800">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}{copied ? "Copied" : "Share"}
              </button>
            </div>
          </div>
          {job.featured && <span className="mt-5 inline-block rounded-md bg-amber-400/15 px-2.5 py-1 text-xs font-bold text-amber-300">Featured role</span>}
        </div>

        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_260px]">
          <div className="space-y-7">
            <section>
              <h2 className="text-lg font-bold text-slate-900">Role overview</h2>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-slate-600">{job.description}</p>
            </section>
            {[["Responsibilities", job.responsibilities], ["Requirements", job.requirements], ["Benefits", job.benefits]].map(([heading, items]) => (
              <section key={heading}>
                <h2 className="text-lg font-bold text-slate-900">{heading}</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
                  {items.map((item, index) => <li key={`${heading}-${index}`}>{item}</li>)}
                </ul>
              </section>
            ))}
            {job.tags.length > 0 && (
              <section>
                <h2 className="text-xs font-bold uppercase text-slate-500">Skills</h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  {job.tags.map((tag) => <span key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700">{tag}</span>)}
                </div>
              </section>
            )}
          </div>

          <aside className="h-fit rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h2 className="font-bold text-slate-900">Position details</h2>
            <dl className="mt-4 space-y-4 text-sm">
              <div><dt className="text-xs text-slate-500">Compensation</dt><dd className="mt-1 font-semibold text-emerald-800">{job.salary}</dd></div>
              <div><dt className="text-xs text-slate-500">Experience</dt><dd className="mt-1 font-semibold text-slate-800">{job.experience}</dd></div>
              <div><dt className="text-xs text-slate-500">Category</dt><dd className="mt-1 font-semibold text-slate-800">{job.category}</dd></div>
              <div><dt className="text-xs text-slate-500">Application deadline</dt><dd className="mt-1 inline-flex items-center gap-1.5 font-semibold text-slate-800"><CalendarDays className="h-4 w-4" />{job.deadline}</dd></div>
            </dl>
            <button onClick={() => setApplyOpen(true)} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 text-sm font-bold text-white hover:bg-emerald-700">
              <Send className="h-4 w-4" /> Apply for this position
            </button>
            {notice && <p className="mt-3 text-xs text-slate-600" role="status">{notice}</p>}
          </aside>
        </div>
      </article>

      <ApplyModal
        job={job}
        isOpen={applyOpen}
        onClose={() => setApplyOpen(false)}
        onApplicationSuccess={() => setNotice("Application submitted successfully.")}
        user={user}
      />
    </main>
  );
}
