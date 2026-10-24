"use client";

import { Sparkles, Info } from "lucide-react";

export default function DemoBanner({ onOpenPresentationHelp }) {
  return (
    <div className="bg-slate-900 border-b border-slate-800 text-slate-300 text-xs px-4 py-2">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-400 font-semibold px-2 py-0.5 rounded-full text-[11px] border border-emerald-500/30">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            PRESENTATION READY DEMO
          </span>
          <span className="hidden md:inline text-slate-400">
            Showcase mode: Search, filters, applications, saved jobs, and job posting are fully interactive with local browser persistence.
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-slate-400">
            All sample vacancies are labeled demonstration data.
          </span>
          {onOpenPresentationHelp && (
            <button
              onClick={onOpenPresentationHelp}
              className="text-emerald-400 hover:text-emerald-300 font-medium underline underline-offset-2 flex items-center gap-1 cursor-pointer"
            >
              <Info className="w-3 h-3" />
              Demo Guide
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
