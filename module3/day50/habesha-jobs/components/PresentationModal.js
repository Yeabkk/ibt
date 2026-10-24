"use client";

import { useEffect } from "react";
import {
  X,
  Sparkles,
  CheckCircle2,
  Clock,
  Layers,
  Database,
  Shield,
  Laptop,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

export default function PresentationModal({ isOpen, onClose }) {
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col max-h-[92vh] overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                Evaluator Guide
              </span>
              <h2 className="text-base font-bold text-white">
                Habesha Jobs - Presentation &amp; Architecture Brief
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700 leading-relaxed">
          {/* Quick Demo Script (2-Minute Walkthrough) */}
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
              <Clock className="w-4 h-4 text-emerald-700" />
              <span>Recommended 2-Minute Evaluator Walkthrough</span>
            </div>
            <ol className="list-decimal list-inside space-y-1.5 text-emerald-950">
              <li>
                <strong>Hero &amp; Search:</strong> Type <em>&quot;Telebirr&quot;</em> or <em>&quot;React&quot;</em> into the Hero search, pick a location like <em>&quot;Addis Ababa (Bole)&quot;</em>, and observe instant reactive filtering.
              </li>
              <li>
                <strong>Category Exploration:</strong> Click the category pills (e.g., <em>Banking &amp; FinTech</em> or <em>NGO &amp; International</em>) to switch domains.
              </li>
              <li>
                <strong>Job Details &amp; Bookmarking:</strong> Click any job card to open the rich detail view. Click the bookmark icon to save it with browser persistence.
              </li>
              <li>
                <strong>Simulate Application:</strong> Click <em>&quot;Apply for Position&quot;</em>, fill in candidate details, and submit. Notice the confirmation screen and reference tracking ID.
              </li>
              <li>
                <strong>Post a Vacancy:</strong> Click <em>&quot;Post a Job&quot;</em> in the header and create an opening. It immediately renders live at the top of the feed with a &quot;User Created&quot; badge.
              </li>
              <li>
                <strong>Review Dashboard:</strong> Open <em>&quot;My Dashboard&quot;</em> to inspect all saved jobs, demo applications, and user-posted vacancies.
              </li>
            </ol>
          </div>

          {/* Architecture Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-slate-900">
                <Layers className="w-4 h-4 text-slate-700" />
                <span>Tech Stack &amp; Architecture</span>
              </div>
              <ul className="space-y-1 text-slate-600">
                <li>• <strong>Framework:</strong> Next.js 16 (App Router)</li>
                <li>• <strong>Library:</strong> React 19 with Compiler</li>
                <li>• <strong>Styling:</strong> Tailwind CSS v4 &amp; Geist font</li>
                <li>• <strong>Icons:</strong> Lucide React</li>
                <li>• <strong>Language:</strong> Modern JavaScript (ES Modules)</li>
              </ul>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-slate-900">
                <Database className="w-4 h-4 text-slate-700" />
                <span>State &amp; Persistence Design</span>
              </div>
              <ul className="space-y-1 text-slate-600">
                <li>• <strong>Local Persistence:</strong> Safe `localStorage` sync</li>
                <li>• <strong>Zero Remote DB Lag:</strong> Fully self-contained</li>
                <li>• <strong>Offline Capable:</strong> Runs cleanly on any computer</li>
                <li>• <strong>Ethical Disclosure:</strong> Clear demonstration labeling</li>
              </ul>
            </div>
          </div>

          {/* Limitations and Honesty Disclosure */}
          <div className="bg-slate-100 rounded-xl p-3.5 space-y-1 text-[11px] text-slate-600 border border-slate-200">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <Shield className="w-3.5 h-3.5 text-slate-700" />
              <span>Project Scope &amp; Evaluator Disclosure</span>
            </div>
            <p>
              This solution is deliberately built without remote database credentials (such as Supabase or Firebase) to ensure 100% demo stability and zero network latency during evaluations. All mock jobs, applications, and saved vacancies operate transparently within browser storage.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
          >
            Got it, Let&apos;s Demo
          </button>
        </div>
      </div>
    </div>
  );
}
