"use client";

import { useEffect, useState } from "react";
import {
  X,
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  Bookmark,
  Share2,
  CheckCircle2,
  Check,
  Send,
  Building,
  Calendar,
  Users,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";

export default function JobDetailModal({
  job,
  isOpen,
  onClose,
  isSaved,
  hasApplied,
  onToggleSave,
  onApply,
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !job) return null;

  const {
    id,
    title,
    company,
    companyLogoText,
    companyColor = "#059669",
    category,
    location,
    workplaceType,
    type,
    experience,
    salary,
    postedDate,
    deadline,
    applicantsCount = 12,
    description,
    responsibilities = [],
    requirements = [],
    benefits = [],
    tags = [],
    featured,
    urgent,
    isUserPosted,
  } = job;

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(
        window.location.origin + "?jobId=" + encodeURIComponent(id)
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Header Bar */}
        <div className="bg-slate-900 text-white px-6 py-5 flex items-start justify-between gap-4 border-b border-slate-800">
          <div className="flex items-center gap-4">
            <div
              style={{ backgroundColor: companyColor }}
              className="w-14 h-14 rounded-xl text-white font-black text-base flex items-center justify-center shrink-0 shadow-md uppercase select-none"
            >
              {companyLogoText || company?.slice(0, 2).toUpperCase() || "HJ"}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  {company}
                </span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                {featured && (
                  <span className="text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    Featured Role
                  </span>
                )}
                {urgent && (
                  <span className="text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Zap className="w-3 h-3 text-rose-400 fill-rose-400" />
                    Urgent Vacancy
                  </span>
                )}
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-white mt-0.5">
                {title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Highlights Strip */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <span className="text-slate-400 block font-medium">Location</span>
            <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5 truncate">
              <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="truncate">{location}</span>
            </span>
          </div>

          <div>
            <span className="text-slate-400 block font-medium">Job Type</span>
            <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
              <Briefcase className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{type} ({workplaceType || "On-site"})</span>
            </span>
          </div>

          <div>
            <span className="text-slate-400 block font-medium">Compensation</span>
            <span className="font-semibold text-emerald-700 flex items-center gap-1 mt-0.5 truncate">
              <DollarSign className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="truncate">{salary || "Negotiable"}</span>
            </span>
          </div>

          <div>
            <span className="text-slate-400 block font-medium">Application Deadline</span>
            <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
              <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span>{deadline || "Open until filled"}</span>
            </span>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-700 text-sm leading-relaxed">
          {/* Demo notice alert */}
          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3 flex items-start gap-2.5 text-xs text-emerald-900">
            <Shield className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Demonstration Opportunity:</span> This listing is a realistic sample representation. You can test submitting an application below, which will be saved directly into your browser&apos;s local state.
            </div>
          </div>

          {/* Overview */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              Role Overview
            </h3>
            <p className="text-slate-600">{description}</p>
          </div>

          {/* Responsibilities */}
          {responsibilities.length > 0 && (
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-2.5">
                Key Responsibilities & Deliverables
              </h3>
              <ul className="space-y-2">
                {responsibilities.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Requirements */}
          {requirements.length > 0 && (
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-2.5">
                Qualifications & Technical Requirements
              </h3>
              <ul className="space-y-2">
                {requirements.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-600">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Benefits */}
          {benefits.length > 0 && (
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-2.5">
                Benefits & Perks
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {benefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-50 border border-slate-200/70 rounded-lg p-2.5 text-xs text-slate-700 flex items-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-teal-500 shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack Tags */}
          {tags.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Skills & Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-medium bg-slate-100 text-slate-700 px-3 py-1 rounded-full border border-slate-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => onToggleSave(id)}
              className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                isSaved
                  ? "bg-emerald-50 text-emerald-700 border-emerald-300 shadow-inner"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
              }`}
            >
              <Bookmark
                className={`w-4 h-4 ${isSaved ? "fill-emerald-600" : ""}`}
              />
              <span>{isSaved ? "Saved" : "Save Job"}</span>
            </button>

            <button
              onClick={handleShare}
              className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              title="Copy share link"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4 text-slate-500" />
                  <span className="hidden sm:inline">Share</span>
                </>
              )}
            </button>
          </div>

          <div className="w-full sm:w-auto">
            {hasApplied ? (
              <div className="px-6 py-2.5 bg-emerald-100 text-emerald-800 rounded-xl font-bold text-xs flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>You have applied for this position</span>
              </div>
            ) : (
              <button
                onClick={() => {
                  onClose();
                  onApply(job);
                }}
                className="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-md hover:shadow-emerald-600/20 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Apply for this Position</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
