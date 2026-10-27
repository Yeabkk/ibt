"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, BriefcaseBusiness, ClipboardList, Trash2 } from "lucide-react";

async function readJson(response) {
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "The request could not be completed.");
  return data;
}

export default function RoleDashboard({ user }) {
  const [jobs, setJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingJob, setEditingJob] = useState(null);
  const [notice, setNotice] = useState("");

  async function loadData() {
    setLoading(true);
    setError("");
    try {
      if (user.role === "jobSeeker") {
        const [applicationsResponse, savedResponse] = await Promise.all([
          fetch("/api/applications", { cache: "no-store" }),
          fetch("/api/saved-jobs", { cache: "no-store" }),
        ]);
        const [applicationData, savedData] = await Promise.all([
          readJson(applicationsResponse),
          readJson(savedResponse),
        ]);
        setApplications(applicationData.applications);
        setSavedJobs(savedData.savedJobs.map((saved) => saved.job));
      } else {
        const [jobsResponse, applicationsResponse] = await Promise.all([
          fetch("/api/jobs?mine=true", { cache: "no-store" }),
          fetch("/api/applications", { cache: "no-store" }),
        ]);
        const [jobsData, applicationData] = await Promise.all([
          readJson(jobsResponse),
          readJson(applicationsResponse),
        ]);
        setJobs(jobsData.jobs);
        setApplications(applicationData.applications);
      }
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [user.role]);

  async function saveJob(jobId) {
    if (!editingJob) return;
    try {
      const response = await fetch(`/api/jobs/${encodeURIComponent(jobId)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingJob),
      });
      await readJson(response);
      setEditingJob(null);
      setNotice("Listing updated and sent for review.");
      await loadData();
    } catch (saveError) {
      setNotice(saveError.message);
    }
  }

  async function deleteJob(jobId) {
    if (!window.confirm("Delete this job listing?")) return;
    try {
      await readJson(await fetch(`/api/jobs/${encodeURIComponent(jobId)}`, { method: "DELETE" }));
      setNotice("Listing deleted.");
      await loadData();
    } catch (deleteError) {
      setNotice(deleteError.message);
    }
  }

  async function updateApplication(id, status) {
    try {
      await readJson(await fetch(`/api/applications/${encodeURIComponent(id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      }));
      setNotice(status === "withdrawn" ? "Application withdrawn." : "Application status updated.");
      await loadData();
    } catch (updateError) {
      setNotice(updateError.message);
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-emerald-700"><ArrowLeft className="h-4 w-4" /> Back to vacancies</Link>
        <header className="mt-5 flex flex-wrap items-end justify-between gap-4 rounded-2xl bg-slate-950 p-6 text-white">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-300">{user.role === "employer" ? "Employer workspace" : "Candidate workspace"}</p>
            <h1 className="mt-1 text-2xl font-black">Hello, {user.name}</h1>
            <p className="mt-1 text-sm text-slate-300">{user.email}</p>
          </div>
          <button onClick={loadData} disabled={loading} className="rounded-lg border border-slate-700 px-3 py-2 text-sm font-semibold hover:bg-slate-800 disabled:opacity-50">{loading ? "Refreshing..." : "Refresh"}</button>
        </header>

        {notice && <p role="status" className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900">{notice}</p>}
        {error && <div role="alert" className="mt-4 rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">{error}<button onClick={loadData} className="ml-2 font-bold underline">Retry</button></div>}
        {loading && <p className="mt-6 text-sm text-slate-500">Loading your workspace...</p>}

        {!loading && !error && user.role === "jobSeeker" && (
          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <SectionHeading icon={BriefcaseBusiness} title="Saved jobs" count={savedJobs.length} />
              {savedJobs.length ? <div className="mt-4 space-y-3">{savedJobs.map((job) => <article key={job.id} className="rounded-lg border border-slate-200 p-4"><h3 className="font-bold">{job.title}</h3><p className="mt-1 text-xs text-slate-500">{job.company} · {job.location}</p><Link className="mt-3 inline-block text-xs font-bold text-emerald-700 hover:underline" href={`/jobs/${encodeURIComponent(job.id)}`}>View job</Link></article>)}</div> : <EmptyState>Saved jobs will appear here.</EmptyState>}
            </section>
            <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <SectionHeading icon={ClipboardList} title="My applications" count={applications.length} />
              {applications.length ? <div className="mt-4 space-y-3">{applications.map((application) => <article key={application.id} className="rounded-lg border border-slate-200 p-4"><div className="flex flex-wrap items-start justify-between gap-3"><div><h3 className="font-bold">{application.jobTitle}</h3><p className="mt-1 text-xs text-slate-500">{application.company} · {application.referenceCode}</p></div><span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold capitalize text-amber-800">{application.status}</span></div><p className="mt-2 text-xs text-slate-500">Submitted {new Date(application.createdAt).toLocaleDateString()}</p>{application.status !== "withdrawn" && <button onClick={() => updateApplication(application.id, "withdrawn")} className="mt-3 text-xs font-bold text-rose-700 hover:underline">Withdraw application</button>}</article>)}</div> : <EmptyState>Submitted applications will appear here.</EmptyState>}
            </section>
          </div>
        )}

        {!loading && !error && user.role === "employer" && (
          <div className="mt-5 space-y-5">
            <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <SectionHeading icon={BriefcaseBusiness} title="My job listings" count={jobs.length} />
              {jobs.length ? <div className="mt-4 overflow-x-auto"><table className="w-full min-w-[700px] text-left text-sm"><thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="p-3">Position</th><th className="p-3">Approval</th><th className="p-3">Applicants</th><th className="p-3">Actions</th></tr></thead><tbody className="divide-y divide-slate-100">{jobs.map((job) => <tr key={job.id}><td className="p-3"><Link className="font-bold text-slate-800 hover:text-emerald-700" href={`/jobs/${encodeURIComponent(job.id)}`}>{job.title}</Link><p className="text-xs text-slate-500">{job.category} · {job.location}</p></td><td className="p-3 text-xs capitalize">{job.approvalStatus}</td><td className="p-3">{applications.filter((application) => application.jobId === job.id).length}</td><td className="p-3"><div className="flex gap-2"><button onClick={() => setEditingJob({ ...job })} className="rounded-md border border-slate-200 px-2.5 py-1.5 text-xs font-bold">Edit</button><button onClick={() => deleteJob(job.id)} className="rounded-md border border-rose-200 px-2.5 py-1.5 text-xs font-bold text-rose-700"><Trash2 className="h-3.5 w-3.5" /></button></div></td></tr>)}</tbody></table></div> : <EmptyState>Your submitted listings will appear here.</EmptyState>}
            </section>

            {editingJob && <EditJobForm job={editingJob} setJob={setEditingJob} onCancel={() => setEditingJob(null)} onSave={() => saveJob(editingJob.id)} />}

            <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <SectionHeading icon={ClipboardList} title="Applications received" count={applications.length} />
              {applications.length ? <div className="mt-4 space-y-3">{applications.map((application) => <article key={application.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 p-4"><div><h3 className="font-bold">{application.fullName} · {application.jobTitle}</h3><p className="mt-1 text-xs text-slate-500">{application.email} · {application.referenceCode}</p></div><select value={application.status} onChange={(event) => updateApplication(application.id, event.target.value)} className="rounded-md border border-slate-300 bg-white px-2 py-1.5 text-xs"><option value="submitted">Submitted</option><option value="reviewing">Reviewing</option><option value="shortlisted">Shortlisted</option><option value="rejected">Rejected</option></select></article>)}</div> : <EmptyState>Applications to your listings will appear here.</EmptyState>}
            </section>
          </div>
        )}
      </div>
    </main>
  );
}

function SectionHeading({ icon: Icon, title, count }) {
  return <div className="flex items-center justify-between"><h2 className="flex items-center gap-2 text-base font-bold"><Icon className="h-4 w-4 text-emerald-700" />{title}</h2><span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">{count}</span></div>;
}

function EmptyState({ children }) {
  return <p className="mt-4 rounded-lg bg-slate-50 p-6 text-center text-sm text-slate-500">{children}</p>;
}

function EditJobForm({ job, setJob, onCancel, onSave }) {
  const fields = [
    ["title", "Title"], ["company", "Company"], ["category", "Category"],
    ["location", "Location"], ["salary", "Salary"], ["experience", "Experience"],
    ["deadline", "Deadline"], ["description", "Description"],
  ];
  return (
    <form onSubmit={(event) => { event.preventDefault(); onSave(); }} className="rounded-xl border border-emerald-200 bg-white p-5 shadow-sm">
      <h2 className="font-bold">Edit listing</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {fields.map(([name, label]) => <label key={name} className="text-xs font-semibold text-slate-600">{label}<input required value={job[name] ?? ""} onChange={(event) => setJob((current) => ({ ...current, [name]: event.target.value }))} className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-normal text-slate-800" /></label>)}
      </div>
      <div className="mt-4 flex justify-end gap-2"><button type="button" onClick={onCancel} className="rounded-md border border-slate-300 px-3 py-2 text-xs font-bold">Cancel</button><button className="rounded-md bg-emerald-600 px-3 py-2 text-xs font-bold text-white">Save changes</button></div>
    </form>
  );
}
