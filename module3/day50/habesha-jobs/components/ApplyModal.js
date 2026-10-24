"use client";

import { useState, useEffect, useCallback } from "react";
import {
  X,
  Upload,
  CheckCircle2,
  FileText,
  AlertCircle,
  Briefcase,
  Building,
  User,
  Mail,
  Phone,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { saveApplication } from "@/lib/storage";

export default function ApplyModal({
  job,
  isOpen,
  onClose,
  onApplicationSuccess,
  onOpenDashboard,
}) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+251 9");
  const [currentLocation, setCurrentLocation] = useState("Addis Ababa");
  const [experienceYears, setExperienceYears] = useState("3-5 years");
  const [resumeName, setResumeName] = useState("Abebe_Bikila_Resume_2026.pdf");
  const [coverNote, setCoverNote] = useState("");

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedApp, setSubmittedApp] = useState(null);

  const handleClose = useCallback(() => {
    setSubmittedApp(null);
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

  if (!isOpen || !job) return null;

  const validate = () => {
    const errs = {};
    if (!fullName.trim()) errs.fullName = "Please enter your full name";
    if (!email.trim() || !email.includes("@") || !email.includes(".")) {
      errs.email = "Please enter a valid email address";
    }
    if (!phone.trim() || phone.length < 8) {
      errs.phone = "Please enter a valid phone number (e.g. +251 91 123 4567)";
    }
    if (!resumeName) {
      errs.resume = "Please attach or select a resume file";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate realistic 450ms network submission
    setTimeout(() => {
      const applicationRecord = {
        jobId: job.id,
        jobTitle: job.title,
        company: job.company,
        companyColor: job.companyColor,
        applicantName: fullName.trim(),
        applicantEmail: email.trim(),
        applicantPhone: phone.trim(),
        applicantLocation: currentLocation.trim(),
        experienceYears,
        resumeFileName: resumeName,
        coverNote: coverNote.trim(),
        referenceCode:
          "HAB-" +
          Math.floor(1000 + Math.random() * 9000) +
          "-" +
          new Date().getFullYear(),
      };

      const saved = saveApplication(applicationRecord);
      setIsSubmitting(false);
      setSubmittedApp(saved || applicationRecord);

      if (onApplicationSuccess) {
        onApplicationSuccess(job.id, saved || applicationRecord);
      }
    }, 450);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeName(file.name);
      if (errors.resume) {
        setErrors((prev) => ({ ...prev, resume: null }));
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col max-h-[92vh] overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-sm">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                Official Application
              </span>
              <h2 className="text-base font-bold text-white leading-tight truncate max-w-sm">
                Apply to {job.company}
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
        <div className="p-6 overflow-y-auto space-y-5">
          {submittedApp ? (
            /* SUCCESS STATE */
            <div className="py-6 text-center space-y-4 animate-in fade-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md shadow-emerald-500/10">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
                  Application Demo Recorded
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-2">
                  Application Submitted!
                </h3>
                <p className="text-sm text-slate-600 mt-1 max-w-md mx-auto">
                  Your demonstration application for{" "}
                  <strong className="text-slate-900 font-semibold">{job.title}</strong> at{" "}
                  <strong className="text-slate-900 font-semibold">{job.company}</strong> has been logged.
                </p>
              </div>

              {/* Reference Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left max-w-md mx-auto text-xs space-y-2">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <span className="text-slate-500">Tracking Reference:</span>
                  <span className="font-mono font-bold text-emerald-700">
                    {submittedApp.referenceCode || "#HAB-DEMO-2026"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Applicant:</span>
                  <span className="font-semibold text-slate-800">
                    {submittedApp.applicantName}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Contact Email:</span>
                  <span className="font-semibold text-slate-800">
                    {submittedApp.applicantEmail}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Resume Attached:</span>
                  <span className="font-semibold text-slate-800 flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-emerald-600" />
                    {submittedApp.resumeFileName}
                  </span>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-3 text-xs text-amber-900 text-left">
                <span className="font-bold">Presentation Note:</span> This application has been stored locally in your browser’s localStorage. You can review and manage all your submissions anytime in the <strong>My Dashboard</strong> section.
              </div>

              {/* Success Actions */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => {
                    handleClose();
                    if (onOpenDashboard) onOpenDashboard("applications");
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>View in My Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleClose}
                  className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Close & Continue Browsing
                </button>
              </div>
            </div>
          ) : (
            /* FORM STATE */
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Job mini summary card */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 flex items-center gap-3">
                <div
                  style={{ backgroundColor: job.companyColor }}
                  className="w-9 h-9 rounded-lg text-white font-bold text-xs flex items-center justify-center shrink-0 uppercase"
                >
                  {job.companyLogoText || job.company?.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    {job.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 truncate">
                    {job.company} • {job.location}
                  </p>
                </div>
              </div>

              {/* Full Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>Full Name *</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Abebe Bikila"
                    className={`w-full text-xs bg-slate-50 border rounded-lg px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                      errors.fullName
                        ? "border-rose-400 ring-rose-200"
                        : "border-slate-200 focus:ring-emerald-500/20 focus:border-emerald-500"
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>Email Address *</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. abebe.b@example.com"
                    className={`w-full text-xs bg-slate-50 border rounded-lg px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                      errors.email
                        ? "border-rose-400 ring-rose-200"
                        : "border-slate-200 focus:ring-emerald-500/20 focus:border-emerald-500"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone & Current City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>Ethiopian Phone Number *</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+251 91 123 4567"
                    className={`w-full text-xs bg-slate-50 border rounded-lg px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                      errors.phone
                        ? "border-rose-400 ring-rose-200"
                        : "border-slate-200 focus:ring-emerald-500/20 focus:border-emerald-500"
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>Current City</span>
                  </label>
                  <input
                    type="text"
                    value={currentLocation}
                    onChange={(e) => setCurrentLocation(e.target.value)}
                    placeholder="Addis Ababa"
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  />
                </div>
              </div>

              {/* Years of Experience */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Years of Relevant Experience</span>
                </label>
                <select
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all cursor-pointer"
                >
                  <option value="0-1 years">0-1 years (Entry level)</option>
                  <option value="1-3 years">1-3 years (Junior)</option>
                  <option value="3-5 years">3-5 years (Mid-Level)</option>
                  <option value="5-8 years">5-8 years (Senior)</option>
                  <option value="8+ years">8+ years (Lead / Principal)</option>
                </select>
              </div>

              {/* Resume Upload / Mockup */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                    <span>Curriculum Vitae (CV / Resume) *</span>
                  </span>
                  <span className="text-[11px] text-slate-400 font-normal">
                    PDF, DOCX up to 5MB
                  </span>
                </label>

                <div className="border-2 border-dashed border-slate-200 rounded-xl p-3.5 bg-slate-50 hover:bg-slate-100/60 transition-colors flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800 truncate max-w-xs">
                        {resumeName}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Demo document attached & verified
                      </div>
                    </div>
                  </div>

                  <label className="px-3 py-1.5 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 text-xs font-semibold rounded-lg shadow-sm cursor-pointer transition-all flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5 text-slate-500" />
                    <span>Choose File</span>
                    <input
                      type="file"
                      accept=".pdf,.docx,.doc"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Cover Note */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Brief Introduction or Cover Note (Optional)
                </label>
                <textarea
                  rows={2}
                  value={coverNote}
                  onChange={(e) => setCoverNote(e.target.value)}
                  placeholder="Share a short summary of why your skills match this role..."
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none"
                />
              </div>

              {/* Demo Notice */}
              <div className="text-[11px] text-slate-500 bg-slate-100 rounded-lg p-2.5">
                Note: This is a showcase application flow. Your application will be stored in your browser session for demo evaluation.
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md hover:shadow-emerald-600/20 transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting Application...</span>
                  ) : (
                    <>
                      <span>Submit Application</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
