"use client";

import { useState, useEffect, useCallback } from "react";
import {
  X,
  PlusCircle,
  Building2,
  Briefcase,
  MapPin,
  DollarSign,
  Calendar,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import {
  JOB_CATEGORIES,
  ETHIOPIAN_LOCATIONS,
  EMPLOYMENT_TYPES,
  EXPERIENCE_LEVELS,
} from "@/lib/jobs-data";
import { saveUserPostedJob } from "@/lib/storage";

export default function PostJobModal({
  isOpen,
  onClose,
  onJobPosted,
}) {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [category, setCategory] = useState("Technology");
  const [location, setLocation] = useState("Addis Ababa (Bole)");
  const [workplaceType, setWorkplaceType] = useState("Hybrid");
  const [type, setType] = useState("Full-Time");
  const [salary, setSalary] = useState("ETB 45,000 - 70,000 / month");
  const [experience, setExperience] = useState("Mid-Level (3-5 yrs)");
  const [deadline, setDeadline] = useState("Dec 15, 2026");
  const [description, setDescription] = useState("");
  const [requirementsInput, setRequirementsInput] = useState(
    "Bachelor's degree in related field\n3+ years of relevant industry experience\nStrong analytical and team collaboration skills"
  );
  const [tagsInput, setTagsInput] = useState("React, Node.js, Full-Stack");

  const [errors, setErrors] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdJob, setCreatedJob] = useState(null);

  const handleClose = useCallback(() => {
    setIsSuccess(false);
    setErrors({});
    onClose();
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") handleClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!title.trim()) errs.title = "Job Title is required";
    if (!company.trim()) errs.company = "Company / Organization name is required";
    if (!description.trim() || description.length < 20) {
      errs.description = "Please provide at least a brief job description (min 20 characters)";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const requirements = requirementsInput
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const tags = tagsInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const newJobPayload = {
      title: title.trim(),
      company: company.trim(),
      category,
      location,
      workplaceType,
      type,
      salary: salary.trim(),
      experience,
      deadline: deadline.trim(),
      description: description.trim(),
      responsibilities: [
        "Collaborate with internal department stakeholders in Addis Ababa.",
        "Deliver against high quality project objectives and business KPIs.",
        "Maintain industry best practices and documentation standards."
      ],
      requirements: requirements.length > 0 ? requirements : ["Proven experience in relevant field"],
      benefits: [
        "Competitive performance-based compensation",
        "Company health scheme and transport allowance",
        "Professional development opportunities"
      ],
      tags: tags.length > 0 ? tags : ["Addis Ababa", "Urgent", "New"],
    };

    const saved = saveUserPostedJob(newJobPayload);
    setCreatedJob(saved);
    setIsSuccess(true);

    if (onJobPosted) {
      onJobPosted(saved);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col max-h-[92vh] overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-sm">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                Employer Portal
              </span>
              <h2 className="text-base font-bold text-white leading-tight">
                Post an Ethiopian Vacancy
              </h2>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {isSuccess ? (
            /* SUCCESS STATE */
            <div className="py-8 text-center space-y-4 animate-in fade-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md shadow-emerald-500/10">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
                  Live in Demo Catalog
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-2">
                  Job Listing Published!
                </h3>
                <p className="text-sm text-slate-600 mt-1 max-w-md mx-auto">
                  Your vacancy for{" "}
                  <strong className="text-slate-900 font-semibold">{createdJob?.title}</strong> at{" "}
                  <strong className="text-slate-900 font-semibold">{createdJob?.company}</strong> is now live in the job directory.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left max-w-md mx-auto text-xs space-y-2">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <span className="text-slate-500">Sector:</span>
                  <span className="font-semibold text-slate-800">{createdJob?.category}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <span className="text-slate-500">Location:</span>
                  <span className="font-semibold text-slate-800">{createdJob?.location}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Compensation:</span>
                  <span className="font-semibold text-emerald-700">{createdJob?.salary}</span>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-center gap-3">
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>View Published Job</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            /* FORM STATE */
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Job Title & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Senior Frontend Engineer"
                    className={`w-full bg-slate-50 border rounded-lg px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                      errors.title
                        ? "border-rose-400 ring-rose-200"
                        : "border-slate-200 focus:ring-emerald-500/20 focus:border-emerald-500"
                    }`}
                  />
                  {errors.title && (
                    <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.title}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Organization / Company Name *
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Ethiopian FinTech Innovations"
                    className={`w-full bg-slate-50 border rounded-lg px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                      errors.company
                        ? "border-rose-400 ring-rose-200"
                        : "border-slate-200 focus:ring-emerald-500/20 focus:border-emerald-500"
                    }`}
                  />
                  {errors.company && (
                    <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.company}
                    </p>
                  )}
                </div>
              </div>

              {/* Category & Employment Type */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Industry Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all cursor-pointer"
                  >
                    {JOB_CATEGORIES.filter((c) => c.id !== "all").map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Employment Type
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all cursor-pointer"
                  >
                    {EMPLOYMENT_TYPES.filter((t) => t !== "All Types").map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Work Arrangement
                  </label>
                  <select
                    value={workplaceType}
                    onChange={(e) => setWorkplaceType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all cursor-pointer"
                  >
                    <option value="On-site">On-site</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>
              </div>

              {/* Location & Salary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Addis Ababa (Kazanchis)"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Compensation / Salary Range
                  </label>
                  <input
                    type="text"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    placeholder="e.g. ETB 45,000 - 70,000 / month"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  />
                </div>
              </div>

              {/* Experience & Deadline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Seniority Level
                  </label>
                  <select
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all cursor-pointer"
                  >
                    {EXPERIENCE_LEVELS.filter((el) => el !== "All Levels").map((el) => (
                      <option key={el} value={el}>
                        {el}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Application Deadline
                  </label>
                  <input
                    type="text"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    placeholder="e.g. Dec 20, 2026"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  />
                </div>
              </div>

              {/* Job Description */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Job Summary & Description *
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide an overview of the role, department goals, and day-to-day workflow..."
                  className={`w-full bg-slate-50 border rounded-lg p-2.5 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 transition-all resize-none ${
                    errors.description
                      ? "border-rose-400 ring-rose-200"
                      : "border-slate-200 focus:ring-emerald-500/20 focus:border-emerald-500"
                  }`}
                />
                {errors.description && (
                  <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Key Requirements */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Key Requirements (One per line)
                </label>
                <textarea
                  rows={2}
                  value={requirementsInput}
                  onChange={(e) => setRequirementsInput(e.target.value)}
                  placeholder="Enter qualifications or requirements..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Skills & Technology Tags (Comma separated)
                </label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="e.g. Next.js, TypeScript, PostgreSQL, FinTech"
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md hover:shadow-emerald-600/20 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Publish Demo Listing</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
