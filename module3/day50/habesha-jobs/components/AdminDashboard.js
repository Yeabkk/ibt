"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Activity,
  BriefcaseBusiness,
  Building2,
  ClipboardList,
  LayoutDashboard,
  Users,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const NAV_ITEMS = [
  { id: "overview", label: "Dashboard", icon: LayoutDashboard },
  { id: "jobs", label: "Jobs", icon: BriefcaseBusiness },
  { id: "users", label: "Users", icon: Users },
  { id: "applications", label: "Applications", icon: ClipboardList },
];
const CHART_COLORS = ["#059669", "#0f766e", "#d97706", "#2563eb", "#e11d48", "#64748b"];

async function readJson(response) {
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "The request could not be completed.");
  return data;
}

async function loadAllJobs() {
  const jobs = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages) {
    const data = await readJson(
      await fetch(`/api/jobs?includeAll=true&page=${page}&pageSize=100`, { cache: "no-store" }),
    );
    jobs.push(...data.jobs);
    totalPages = data.totalPages;
    page += 1;
  }

  return jobs;
}

async function fetchDashboardData() {
  const [analyticsResponse, jobs, usersResponse, applicationsResponse] = await Promise.all([
    fetch("/api/admin/analytics", { cache: "no-store" }),
    loadAllJobs(),
    fetch("/api/admin/users", { cache: "no-store" }),
    fetch("/api/applications", { cache: "no-store" }),
  ]);
  const [analyticsData, usersData, applicationsData] = await Promise.all([
    readJson(analyticsResponse),
    readJson(usersResponse),
    readJson(applicationsResponse),
  ]);

  return {
    analytics: analyticsData.analytics,
    jobs,
    users: usersData.users,
    applications: applicationsData.applications,
  };
}

export default function AdminDashboard({ admin }) {
  const [view, setView] = useState("overview");
  const [analytics, setAnalytics] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [users, setUsers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [jobForm, setJobForm] = useState(null);
  const [savingJob, setSavingJob] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  function applyDashboardData(data) {
    setAnalytics(data.analytics);
    setJobs(data.jobs);
    setUsers(data.users);
    setApplications(data.applications);
  }

  async function loadDashboard() {
    setLoading(true);
    setError("");
    try {
      applyDashboardData(await fetchDashboardData());
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let active = true;
    async function loadInitialDashboard() {
      try {
        const data = await fetchDashboardData();
        if (active) applyDashboardData(data);
      } catch (loadError) {
        if (active) setError(loadError.message);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadInitialDashboard();
    return () => {
      active = false;
    };
  }, []);

  async function updateJob(id, changes) {
    try {
      const response = await fetch(`/api/jobs/${encodeURIComponent(id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(changes),
      });
      await readJson(response);
      setNotice("Job listing updated.");
      await loadDashboard();
      return true;
    } catch (updateError) {
      setNotice(updateError.message);
      return false;
    }
  }

  async function saveJobEdits(event) {
    event.preventDefault();
    if (!editingJob || !jobForm) return;

    setSavingJob(true);
    const saved = await updateJob(editingJob.id, jobForm);
    setSavingJob(false);
    if (saved) {
      setEditingJob(null);
      setJobForm(null);
    }
  }

  async function deleteJob(id) {
    if (!window.confirm("Delete this job listing? This cannot be undone.")) return;
    try {
      const response = await fetch(`/api/jobs/${encodeURIComponent(id)}`, { method: "DELETE" });
      await readJson(response);
      setNotice("Job listing deleted.");
      await loadDashboard();
    } catch (deleteError) {
      setNotice(deleteError.message);
    }
  }

  async function updateUserRole(id, role) {
    try {
      const response = await fetch(`/api/admin/users/${encodeURIComponent(id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });
      await readJson(response);
      setNotice("User role updated.");
      await loadDashboard();
    } catch (updateError) {
      setNotice(updateError.message);
    }
  }

  async function updateApplicationStatus(id, status) {
    try {
      const response = await fetch(`/api/applications/${encodeURIComponent(id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      await readJson(response);
      setNotice("Application status updated.");
      await loadDashboard();
    } catch (updateError) {
      setNotice(updateError.message);
    }
  }

  const total = analytics?.totals ?? { jobs: 0, users: 0, applications: 0, pendingJobs: 0 };

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <header className="border-b border-slate-800 bg-slate-950 text-white">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-300">Habesha Jobs · Administration</p>
            <h1 className="mt-1 text-xl font-black sm:text-2xl">Platform overview</h1>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold">{admin.name}</p>
            <p className="text-xs capitalize text-slate-400">{admin.role}</p>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1500px] gap-5 px-4 py-6 sm:px-6 lg:grid-cols-[220px_1fr] lg:px-8">
        <aside className="h-fit rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
          <nav aria-label="Admin sections" className="grid grid-cols-2 gap-1 lg:grid-cols-1">
            {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setView(id)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-semibold transition-colors ${view === id ? "bg-emerald-50 text-emerald-800" : "text-slate-600 hover:bg-slate-50"}`}
              >
                <Icon className="h-4 w-4" />{label}
                {id === "jobs" && total.pendingJobs > 0 && <span className="ml-auto rounded-full bg-amber-100 px-2 py-0.5 text-[10px] text-amber-800">{total.pendingJobs}</span>}
              </button>
            ))}
          </nav>
          <Link href="/" className="mt-2 block rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-500 hover:bg-slate-50">← Back to vacancies</Link>
        </aside>

        <section className="min-w-0 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold">{NAV_ITEMS.find((item) => item.id === view)?.label}</h2>
              <p className="text-xs text-slate-500">Live totals from the local SQLite database.</p>
              <p className="mt-1 text-xs text-slate-500">Browser-only demo activity is stored separately and is not included in these totals.</p>
            </div>
            <button onClick={loadDashboard} disabled={loading} className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-50">
              {loading ? "Refreshing..." : "Refresh data"}
            </button>
          </div>

          {notice && <p role="status" className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm text-emerald-900">{notice}</p>}
          {error && <div role="alert" className="rounded-lg border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800"><p>{error}</p><button onClick={loadDashboard} className="mt-2 font-bold underline">Try again</button></div>}
          {loading && !analytics && <div className="rounded-xl border border-slate-200 bg-white p-8 text-sm text-slate-500">Loading platform records...</div>}

          {!loading && !error && view === "overview" && (
            <>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard label="Total jobs" value={total.jobs} icon={BriefcaseBusiness} tone="emerald" />
                <StatCard label="Registered users" value={total.users} icon={Users} tone="blue" />
                <StatCard label="Applications" value={total.applications} icon={ClipboardList} tone="amber" />
                <StatCard label="Pending jobs" value={total.pendingJobs} icon={Activity} tone="rose" />
              </div>
              <div className="grid gap-4 xl:grid-cols-2">
                <ChartPanel title="Jobs by category" empty={analytics.jobsByCategory.length === 0}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analytics.jobsByCategory} margin={{ top: 8, right: 12, bottom: 24, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" angle={-20} textAnchor="end" interval={0} height={54} tick={{ fontSize: 10 }} />
                      <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Bar dataKey="value" name="Jobs" fill="#059669" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartPanel>
                <ChartPanel title="Applications over time" empty={analytics.applicationsOverTime.length === 0}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={analytics.applicationsOverTime} margin={{ top: 8, right: 12, bottom: 4, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis
                        dataKey="date"
                        tick={{ fontSize: 10 }}
                        tickFormatter={(date) =>
                          new Date(`${date}T00:00:00`).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                          })
                        }
                      />
                      <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                      <Tooltip
                        labelFormatter={(date) =>
                          new Date(`${date}T00:00:00`).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        }
                      />
                      <Line type="monotone" dataKey="count" name="Applications" stroke="#0f766e" strokeWidth={3} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartPanel>
                <ChartPanel title="Jobs by employment type" empty={analytics.jobsByEmploymentType.length === 0}>
                  <div className="flex h-full flex-col">
                    <div className="min-h-0 flex-1">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={analytics.jobsByEmploymentType} dataKey="value" nameKey="name" innerRadius="48%" outerRadius="78%" paddingAngle={3}>
                            {analytics.jobsByEmploymentType.map((item, index) => <Cell key={item.name} fill={CHART_COLORS[index % CHART_COLORS.length]} />)}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <ul aria-label="Employment type counts" className="grid grid-cols-2 gap-x-3 gap-y-1 px-1 pb-1 text-[11px] text-slate-600">
                      {analytics.jobsByEmploymentType.map((item, index) => (
                        <li key={item.name} className="flex min-w-0 items-center gap-1.5">
                          <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }} />
                          <span className="truncate">{item.name}</span>
                          <span className="ml-auto font-bold text-slate-800">{item.value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ChartPanel>
                <ChartPanel title="Job approval status" empty={analytics.jobsByApprovalStatus.every((item) => item.value === 0)}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analytics.jobsByApprovalStatus} margin={{ top: 8, right: 12, bottom: 4, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                      <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Bar dataKey="value" name="Listings" fill="#d97706" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartPanel>
              </div>
            </>
          )}

          {!loading && !error && view === "jobs" && (
            <JobsTable
              jobs={jobs}
              onUpdate={updateJob}
              onDelete={deleteJob}
              onEdit={(job) => {
                setEditingJob(job);
                setJobForm({
                  title: job.title,
                  company: job.company,
                  category: job.category,
                  location: job.location,
                  workplaceType: job.workplaceType,
                  employmentType: job.employmentType,
                  experience: job.experience,
                  salary: job.salary,
                  deadline: job.deadline,
                  description: job.description,
                });
              }}
            />
          )}
          {!loading && !error && view === "users" && <UsersTable users={users} onRoleChange={updateUserRole} />}
          {!loading && !error && view === "applications" && <ApplicationsTable applications={applications} onStatusChange={updateApplicationStatus} />}
        </section>
      </div>
      {editingJob && jobForm && (
        <JobEditDialog
          job={editingJob}
          form={jobForm}
          saving={savingJob}
          onChange={(field, value) => setJobForm((current) => ({ ...current, [field]: value }))}
          onClose={() => {
            if (!savingJob) {
              setEditingJob(null);
              setJobForm(null);
            }
          }}
          onSubmit={saveJobEdits}
        />
      )}
    </main>
  );
}

function StatCard({ label, value, icon: Icon, tone }) {
  const colors = {
    emerald: "bg-emerald-50 text-emerald-700",
    blue: "bg-blue-50 text-blue-700",
    amber: "bg-amber-50 text-amber-700",
    rose: "bg-rose-50 text-rose-700",
  };
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold text-slate-500">{label}</p>
        <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${colors[tone]}`}><Icon className="h-4 w-4" /></span>
      </div>
      <p className="mt-3 text-3xl font-black tracking-tight text-slate-950">{value}</p>
    </article>
  );
}

function ChartPanel({ title, empty, children }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="text-sm font-bold text-slate-800">{title}</h3>
      <div className="mt-3 h-64 min-w-0">
        {empty ? <div className="flex h-full items-center justify-center rounded-lg bg-slate-50 text-sm text-slate-500">No records to chart yet.</div> : children}
      </div>
    </article>
  );
}

function JobsTable({ jobs, onUpdate, onDelete, onEdit }) {
  if (!jobs.length) return <EmptyState title="No job listings" />;
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="p-3">Position</th><th className="p-3">Employer</th><th className="p-3">Status</th><th className="p-3">Created</th><th className="p-3">Actions</th></tr></thead>
        <tbody className="divide-y divide-slate-100">
          {jobs.map((job) => <tr key={job.id}>
            <td className="p-3"><p className="font-bold text-slate-800">{job.title}</p><p className="text-xs text-slate-500">{job.category} · {job.location}</p></td>
            <td className="p-3">{job.company}</td>
            <td className="p-3"><span className="rounded-full bg-slate-100 px-2 py-1 text-xs capitalize">{job.approvalStatus}</span></td>
            <td className="p-3 text-xs text-slate-500">{new Date(job.createdAt).toLocaleDateString()}</td>
            <td className="p-3"><div className="flex gap-2">
              <button onClick={() => onEdit(job)} className="rounded-md border border-slate-200 px-2.5 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50">Edit</button>
              {job.approvalStatus !== "approved" && <button onClick={() => onUpdate(job.id, { approvalStatus: "approved" })} className="rounded-md bg-emerald-600 px-2.5 py-1.5 text-xs font-bold text-white">Approve</button>}
              {job.approvalStatus !== "rejected" && <button onClick={() => onUpdate(job.id, { approvalStatus: "rejected" })} className="rounded-md border border-rose-200 px-2.5 py-1.5 text-xs font-bold text-rose-700">Reject</button>}
              <button onClick={() => onDelete(job.id)} className="rounded-md border border-slate-200 px-2.5 py-1.5 text-xs font-bold text-slate-600">Delete</button>
            </div></td>
          </tr>)}
        </tbody>
      </table>
    </div>
  );
}

function JobEditDialog({ job, form, saving, onChange, onClose, onSubmit }) {
  const fields = [
    { name: "title", label: "Job title" },
    { name: "company", label: "Company" },
    { name: "category", label: "Category" },
    { name: "location", label: "Location" },
    { name: "experience", label: "Experience" },
    { name: "salary", label: "Salary" },
    { name: "deadline", label: "Application deadline" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4" role="presentation">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-job-title"
        className="my-auto w-full max-w-2xl rounded-2xl bg-white p-5 shadow-2xl sm:p-7"
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 id="edit-job-title" className="text-lg font-black text-slate-900">Edit job listing</h2>
            <p className="mt-1 text-sm text-slate-500">{job.company}</p>
          </div>
          <button type="button" onClick={onClose} disabled={saving} className="rounded-lg px-3 py-1.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-50">Cancel</button>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {fields.map(({ name, label }) => (
              <label key={name} className="block text-xs font-semibold text-slate-600">
                {label}
                <input
                  required
                  value={form[name]}
                  onChange={(event) => onChange(name, event.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                />
              </label>
            ))}
            <label className="block text-xs font-semibold text-slate-600">
              Workplace type
              <select value={form.workplaceType} onChange={(event) => onChange("workplaceType", event.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900">
                <option>On-site</option><option>Hybrid</option><option>Remote</option>
              </select>
            </label>
            <label className="block text-xs font-semibold text-slate-600">
              Employment type
              <select value={form.employmentType} onChange={(event) => onChange("employmentType", event.target.value)} className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900">
                <option>Full-Time</option><option>Part-Time</option><option>Contract</option><option>Internship</option>
              </select>
            </label>
          </div>
          <label className="block text-xs font-semibold text-slate-600">
            Description
            <textarea
              required
              minLength={20}
              maxLength={5000}
              rows={5}
              value={form.description}
              onChange={(event) => onChange("description", event.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
            />
          </label>
          <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
            <button type="button" onClick={onClose} disabled={saving} className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-bold text-slate-700 disabled:opacity-50">Cancel</button>
            <button type="submit" disabled={saving} className="rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-800 disabled:opacity-50">
              {saving ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

function UsersTable({ users, onRoleChange }) {
  if (!users.length) return <EmptyState title="No registered users" />;
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full min-w-[620px] text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="p-3">User</th><th className="p-3">Role</th><th className="p-3">Jobs</th><th className="p-3">Applications</th><th className="p-3">Joined</th></tr></thead>
        <tbody className="divide-y divide-slate-100">
          {users.map((user) => <tr key={user.id}>
            <td className="p-3"><p className="font-bold">{user.name}</p><p className="text-xs text-slate-500">{user.email}</p></td>
            <td className="p-3">{user.role === "admin" ? <span className="rounded-full bg-slate-900 px-2.5 py-1 text-xs font-semibold text-white">Administrator</span> : <select value={user.role} onChange={(event) => onRoleChange(user.id, event.target.value)} className="rounded-md border border-slate-300 bg-white px-2 py-1.5 text-xs"><option value="jobSeeker">Job seeker</option><option value="employer">Employer</option></select>}</td>
            <td className="p-3">{user._count.jobs}</td><td className="p-3">{user._count.applications}</td>
            <td className="p-3 text-xs text-slate-500">{new Date(user.createdAt).toLocaleDateString()}</td>
          </tr>)}
        </tbody>
      </table>
    </div>
  );
}

function ApplicationsTable({ applications, onStatusChange }) {
  if (!applications.length) return <EmptyState title="No applications yet" />;
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase text-slate-500"><tr><th className="p-3">Applicant</th><th className="p-3">Position</th><th className="p-3">Reference</th><th className="p-3">Received</th><th className="p-3">Status</th></tr></thead>
        <tbody className="divide-y divide-slate-100">
          {applications.map((application) => <tr key={application.id}>
            <td className="p-3"><p className="font-bold">{application.fullName}</p><p className="text-xs text-slate-500">{application.email} · {application.phone}</p></td>
            <td className="p-3"><p>{application.jobTitle}</p><p className="text-xs text-slate-500">{application.company}</p></td>
            <td className="p-3 font-mono text-xs">{application.referenceCode}</td>
            <td className="p-3 text-xs text-slate-500">{new Date(application.createdAt).toLocaleDateString()}</td>
            <td className="p-3"><select value={application.status} onChange={(event) => onStatusChange(application.id, event.target.value)} className="rounded-md border border-slate-300 bg-white px-2 py-1.5 text-xs"><option value="submitted">Submitted</option><option value="reviewing">Reviewing</option><option value="shortlisted">Shortlisted</option><option value="rejected">Rejected</option><option value="withdrawn">Withdrawn</option></select></td>
          </tr>)}
        </tbody>
      </table>
    </div>
  );
}

function EmptyState({ title }) {
  return <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm"><Building2 className="mx-auto h-8 w-8 text-slate-300" /><h3 className="mt-3 font-bold text-slate-800">{title}</h3><p className="mt-1 text-sm text-slate-500">New platform activity will appear here.</p></div>;
}
