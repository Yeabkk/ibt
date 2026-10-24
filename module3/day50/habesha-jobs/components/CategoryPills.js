"use client";

import {
  Briefcase,
  Code2,
  Landmark,
  Globe2,
  Stethoscope,
  Wrench,
  Megaphone,
} from "lucide-react";
import { JOB_CATEGORIES } from "@/lib/jobs-data";

// Helper for category icons
const CATEGORY_ICONS = {
  all: Briefcase,
  Technology: Code2,
  "Banking & Finance": Landmark,
  "NGO & Development": Globe2,
  Healthcare: Stethoscope,
  Engineering: Wrench,
  Marketing: Megaphone,
};

export default function CategoryPills({
  selectedCategory,
  onSelectCategory,
  totalJobsCount = 0,
}) {
  return (
    <section className="py-6 border-b border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
            <span>Explore by Industry Domain</span>
          </h2>
          <span className="text-xs text-slate-400 font-medium hidden sm:inline">
            Click to filter positions instantly
          </span>
        </div>

        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
          {JOB_CATEGORIES.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.id] || Briefcase;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all cursor-pointer border ${
                  isSelected
                    ? "bg-slate-950 text-white border-slate-950 shadow-md shadow-slate-900/10 scale-[1.02]"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    isSelected ? "text-emerald-400" : "text-slate-500"
                  }`}
                />
                <span>{cat.name}</span>
                {cat.id === "all" ? (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-slate-200/80 text-slate-700"
                    }`}
                  >
                    {totalJobsCount}
                  </span>
                ) : (
                  cat.count && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                        isSelected
                          ? "bg-emerald-500/20 text-emerald-300"
                          : "bg-slate-200/70 text-slate-600"
                      }`}
                    >
                      {cat.count}
                    </span>
                  )
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
