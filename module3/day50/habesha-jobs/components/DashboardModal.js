"use client";

import { useState, useEffect } from "react";
import {
  X,
  Bookmark,
  Send,
  PlusCircle,
  Briefcase,
  Calendar,
  Clock,
  Trash2,
  FileText,
  CheckCircle2,
  AlertCircle,
  Building,
  MapPin,
  ExternalLink,
  ArrowRight,
  Shield,
} from "lucide-react";
import { withdrawApplication, deleteUserPostedJob } from "@/lib/storage";

export default function DashboardModal({
  isOpen,
  onClose,
  initialTab = "saved",
  savedJobs = [],
  applications = [],
  userPostedJobs = [],
  onRemoveSavedJob,
  onApplicationWithdrawn,
  onUserJobDeleted,
  onViewJobDetails,
  onApplyJob,
}) {
  const [activeTab, setActiveTab] = useState("saved");

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

  if (!isOpen) return null;

  const currentTab = activeTab || initialTab || "saved";

  const handleWithdraw = (appId) => {
    const updated = withdrawApplication(appId);
    if (onApplicationWithdrawn) onApplicationWithdrawn(updated);
  };

  const handleDeleteJob = (jobId) => {
    const updated = deleteUserPostedJob(jobId);
    if (onUserJobDeleted) onUserJobDeleted(updated);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div>
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
              User Activity Hub
            </span>
            <h2 className="text-lg font-bold text-white">
              Habesha Jobs Demo Dashboard
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab("saved")}
            className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              currentTab === "saved"
                ? "border-emerald-600 text-emerald-700 bg-white shadow-sm"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <Bookmark className="w-4 h-4 text-emerald-600" />
            <span>Saved Jobs</span>
            <span className="bg-slate-200 text-slate-700 text-[10px] px-1.5 py-0.2 rounded-full font-bold">
              {savedJobs.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("applications")}
            className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              currentTab === "applications"
                ? "border-emerald-600 text-emerald-700 bg-white shadow-sm"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <Send className="w-4 h-4 text-emerald-600" />
            <span>My Applications</span>
            <span className="bg-slate-200 text-slate-700 text-[10px] px-1.5 py-0.2 rounded-full font-bold">
              {applications.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("posted")}
            className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              currentTab === "posted"
                ? "border-emerald-600 text-emerald-700 bg-white shadow-sm"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <PlusCircle className="w-4 h-4 text-emerald-600" />
            <span>My Posted Listings</span>
            <span className="bg-slate-200 text-slate-700 text-[10px] px-1.5 py-0.2 rounded-full font-bold">
              {userPostedJobs.length}
            </span>
          </button>
        </div>

        {/* Tab Body Content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {/* TAB 1: SAVED JOBS */}
          {currentTab === "saved" && (
            <div>
              {savedJobs.length === 0 ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                    <Bookmark className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-800">
                    No Saved Vacancies Yet
                  </h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    When you bookmark jobs using the bookmark icon on any card, they will be saved here in your browser for quick access.
                  </p>
                  <button
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 pt-2 cursor-pointer"
                  >
                    <span>Browse All Jobs Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs text-slate-500 pb-1">
                    <span>{savedJobs.length} positions bookmarked</span>
                    <span className="text-[11px] text-slate-400">
                      Saved locally in browser storage
                    </span>
                  </div>

                  {savedJobs.map((job) => (
                    <div
                      key={job.id}
                      className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-slate-300 transition-all shadow-sm"
                    >
                      <div className="flex items-center gap-3.5">
                        <div
                          style={{ backgroundColor: job.companyColor || "#059669" }}
                          className="w-11 h-11 rounded-lg text-white font-bold text-xs flex items-center justify-center shrink-0 uppercase select-none"
                        >
                          {job.companyLogoText || job.company?.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-500 uppercase">
                              {job.company}
                            </span>
                            <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded">
                              {job.type}
                            </span>
                          </div>
                          <h4
                            onClick={() => {
                              onClose();
                              onViewJobDetails(job);
                            }}
                            className="text-sm font-bold text-slate-900 hover:text-emerald-700 transition-colors cursor-pointer"
                          >
                            {job.title}
                          </h4>
                          <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-slate-400" />
                              {job.location}
                            </span>
                            {job.salary && (
                              <span className="font-semibold text-emerald-700">
                                {job.salary}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                        <button
                          onClick={() => {
                            onClose();
                            onApplyJob(job);
                          }}
                          className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-sm transition-all cursor-pointer flex items-center gap-1"
                        >
                          <Send className="w-3 h-3" />
                          <span>Apply</span>
                        </button>
                        <button
                          onClick={() => onRemoveSavedJob(job.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Remove from saved"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: APPLICATIONS */}
          {currentTab === "applications" && (
            <div>
              {applications.length === 0 ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                    <Send className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-800">
                    No Demo Applications Yet
                  </h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    When you click &quot;Apply&quot; on any job and submit the form, your application demo record will appear here.
                  </p>
                  <button
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 pt-2 cursor-pointer"
                  >
                    <span>Browse Positions to Apply</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs text-slate-500 pb-1">
                    <span>{applications.length} submitted applications</span>
                    <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Demo Candidate Profile
                    </span>
                  </div>

                  {applications.map((app) => (
                    <div
                      key={app.id}
                      className="bg-white border border-slate-200 rounded-xl p-4 space-y-3 hover:border-slate-300 transition-all shadow-sm"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-500 uppercase">
                              {app.company}
                            </span>
                            <span className="text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Clock className="w-3 h-3 text-amber-600" />
                              {app.status || "Submitted"}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                            {app.jobTitle}
                          </h4>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-mono font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded">
                            {app.referenceCode || "#HAB-DEMO"}
                          </span>
                          <button
                            onClick={() => handleWithdraw(app.id)}
                            className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors cursor-pointer"
                            title="Withdraw demo application"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-600">
                        <div>
                          <span className="text-slate-400 block text-[10px]">
                            Applicant
                          </span>
                          <span className="font-semibold text-slate-800">
                            {app.applicantName}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">
                            Contact
                          </span>
                          <span className="font-semibold text-slate-800 truncate block">
                            {app.applicantEmail}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">
                            Resume Attached
                          </span>
                          <span className="font-semibold text-emerald-700 flex items-center gap-1 truncate">
                            <FileText className="w-3 h-3 shrink-0" />
                            <span className="truncate">{app.resumeFileName}</span>
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">
                            Submission Date
                          </span>
                          <span className="font-semibold text-slate-800">
                            {new Date(app.appliedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      {app.coverNote && (
                        <div className="bg-slate-50 rounded-lg p-2.5 text-xs text-slate-600 border border-slate-100">
                          <span className="font-bold text-slate-700 mr-1">
                            Pitch:
                          </span>
                          &quot;{app.coverNote}&quot;
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: USER POSTED JOBS */}
          {currentTab === "posted" && (
            <div>
              {userPostedJobs.length === 0 ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                    <PlusCircle className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-800">
                    No Posted Job Listings Yet
                  </h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    You haven&apos;t posted any jobs during this demo session. Click &quot;Post a Job&quot; in the header to create an employer listing.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs text-slate-500 pb-1">
                    <span>{userPostedJobs.length} custom demo listings created</span>
                  </div>

                  {userPostedJobs.map((job) => (
                    <div
                      key={job.id}
                      className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-slate-300 transition-all shadow-sm"
                    >
                      <div className="flex items-center gap-3.5">
                        <div
                          style={{ backgroundColor: job.companyColor || "#059669" }}
                          className="w-11 h-11 rounded-lg text-white font-bold text-xs flex items-center justify-center shrink-0 uppercase select-none"
                        >
                          {job.companyLogoText || job.company?.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-500 uppercase">
                              {job.company}
                            </span>
                            <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-1.5 py-0.2 rounded border border-emerald-200">
                              Active Listing
                            </span>
                          </div>
                          <h4
                            onClick={() => {
                              onClose();
                              onViewJobDetails(job);
                            }}
                            className="text-sm font-bold text-slate-900 hover:text-emerald-700 transition-colors cursor-pointer"
                          >
                            {job.title}
                          </h4>
                          <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-slate-400" />
                              {job.location}
                            </span>
                            {job.salary && (
                              <span className="font-semibold text-emerald-700">
                                {job.salary}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                        <button
                          onClick={() => {
                            onClose();
                            onViewJobDetails(job);
                          }}
                          className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                        >
                          <ExternalLink className="w-3 h-3 text-slate-500" />
                          <span>View</span>
                        </button>
                        <button
                          onClick={() => handleDeleteJob(job.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Delete user listing"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-emerald-600" />
            <span>Client-side persistent demo storage</span>
          </span>
          <button
            onClick={onClose}
            className="font-bold text-slate-700 hover:text-slate-900 cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
