"use client";

import {
  MapPin,
  Briefcase,
  Clock,
  Bookmark,
  CheckCircle2,
  Sparkles,
  Zap,
  ArrowUpRight,
  Send,
  Building,
} from "lucide-react";

export default function JobCard({
  job,
  isSaved = false,
  hasApplied = false,
  onToggleSave,
  onViewDetails,
  onApply,
}) {
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
    featured,
    urgent,
    tags = [],
    isUserPosted,
  } = job;

  return (
    <div
      className={`group relative bg-white rounded-2xl border transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 flex flex-col justify-between overflow-hidden ${
        featured
          ? "border-emerald-300/80 shadow-sm shadow-emerald-500/5 ring-1 ring-emerald-400/20"
          : "border-slate-200 hover:border-slate-300"
      }`}
    >
      {/* Top Accent Strip for Featured or Urgent */}
      {featured && (
        <div className="h-1 w-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600" />
      )}
      {urgent && !featured && (
        <div className="h-1 w-full bg-gradient-to-r from-amber-500 to-rose-500" />
      )}

      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        {/* Header: Company Avatar & Badges & Bookmark */}
        <div>
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-3.5">
              {/* Company Logo Monogram */}
              <div
                style={{ backgroundColor: companyColor }}
                className="w-12 h-12 rounded-xl text-white font-black text-sm flex items-center justify-center shrink-0 shadow-sm shadow-black/10 select-none uppercase tracking-wider"
              >
                {companyLogoText || company?.slice(0, 2).toUpperCase() || "HJ"}
              </div>

              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h4 className="text-xs font-bold text-slate-800 tracking-wide uppercase">
                    {company}
                  </h4>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  {isUserPosted && (
                    <span className="text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 px-1.5 py-0.2 rounded">
                      User Created
                    </span>
                  )}
                </div>
                <h3
                  onClick={onViewDetails}
                  className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors cursor-pointer mt-0.5 line-clamp-2 leading-snug"
                >
                  {title}
                </h3>
              </div>
            </div>

            {/* Bookmark button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleSave(id);
              }}
              className={`p-2 rounded-lg border transition-all cursor-pointer shrink-0 ${
                isSaved
                  ? "bg-emerald-50 text-emerald-600 border-emerald-300 shadow-inner"
                  : "bg-white text-slate-400 hover:text-slate-700 border-slate-200 hover:bg-slate-50"
              }`}
              title={isSaved ? "Remove from saved jobs" : "Save this job"}
              aria-label={isSaved ? "Saved job" : "Save job"}
            >
              <Bookmark
                className={`w-4 h-4 ${isSaved ? "fill-emerald-600" : ""}`}
              />
            </button>
          </div>

          {/* Badges / Meta tags row */}
          <div className="flex flex-wrap items-center gap-2 mb-3.5">
            {featured && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200/80 px-2 py-0.5 rounded-md">
                <Sparkles className="w-3 h-3 text-amber-500" />
                Featured
              </span>
            )}
            {urgent && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200/80 px-2 py-0.5 rounded-md">
                <Zap className="w-3 h-3 text-rose-500 fill-rose-500" />
                Urgent Hire
              </span>
            )}
            <span className="text-[11px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
              {category}
            </span>
          </div>

          {/* Key Attributes: Location, Type, Workplace */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 mb-4">
            <div className="flex items-center gap-1.5 truncate">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>
                {type} {workplaceType ? `• ${workplaceType}` : ""}
              </span>
            </div>
          </div>

          {/* Salary Highlight Badge */}
          {salary && (
            <div className="mb-4 inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200/70 text-xs font-bold px-2.5 py-1 rounded-lg">
              <span>{salary}</span>
            </div>
          )}

          {/* Skill / Technology Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {tags.slice(0, 4).map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded hover:bg-slate-200 transition-colors"
                >
                  {tag}
                </span>
              ))}
              {tags.length > 4 && (
                <span className="text-[11px] font-medium text-slate-400 py-0.5 px-1">
                  +{tags.length - 4} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* Footer info & Action Buttons */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Posted {postedDate}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onViewDetails}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>Details</span>
              <ArrowUpRight className="w-3 h-3 text-slate-500" />
            </button>

            {hasApplied ? (
              <span className="px-3 py-1.5 text-xs font-bold text-emerald-700 bg-emerald-100 rounded-lg flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                Applied
              </span>
            ) : (
              <button
                onClick={onApply}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-all cursor-pointer flex items-center gap-1"
              >
                <Send className="w-3 h-3" />
                <span>Apply</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
