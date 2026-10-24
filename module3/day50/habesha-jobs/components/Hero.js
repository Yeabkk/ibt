"use client";

import { Search, MapPin, Briefcase, Sparkles, Building2, TrendingUp, Users, ShieldCheck } from "lucide-react";
import { ETHIOPIAN_LOCATIONS, JOB_CATEGORIES } from "@/lib/jobs-data";

export default function Hero({
  searchQuery,
  setSearchQuery,
  selectedLocation,
  setSelectedLocation,
  selectedCategory,
  setSelectedCategory,
  onSearchSubmit,
}) {
  return (
    <section className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden py-16 md:py-24 border-b border-slate-800">
      {/* Decorative Glow Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-medium shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Over 1,450+ Verified Positions across Ethiopia & Remote</span>
            <span className="text-slate-500">•</span>
            <span className="text-amber-400 font-semibold">Q4 2026 Season</span>
          </div>
        </div>

        {/* Headline */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight sm:leading-none">
            Empowering Ethiopia’s <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200">
              Top Talent & Employers
            </span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Discover premier roles in FinTech, Commercial Banking, UN Agencies,
            Aviation, and Global Remote teams across Addis Ababa and beyond.
          </p>
        </div>

        {/* Hero Search Box */}
        <div className="mt-10 max-w-4xl mx-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (onSearchSubmit) onSearchSubmit();
            }}
            className="bg-white/10 backdrop-blur-xl p-2 sm:p-3 rounded-2xl border border-white/15 shadow-2xl shadow-black/40 flex flex-col md:flex-row items-stretch gap-2"
          >
            {/* Keyword Input */}
            <div className="flex-1 flex items-center gap-3 bg-white px-4 py-3 rounded-xl text-slate-900 shadow-sm">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Job title, tech stack, or employer (e.g. Telebirr, React, CBE)..."
                className="w-full text-sm font-medium bg-transparent focus:outline-none placeholder:text-slate-400"
              />
            </div>

            {/* Location Selector */}
            <div className="md:w-56 flex items-center gap-2.5 bg-white px-3.5 py-3 rounded-xl text-slate-900 shadow-sm">
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full text-sm font-medium bg-transparent focus:outline-none text-slate-800 cursor-pointer"
              >
                {ETHIOPIAN_LOCATIONS.map((loc) => (
                  <option key={loc} value={loc} className="text-slate-900">
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Selector */}
            <div className="md:w-52 flex items-center gap-2.5 bg-white px-3.5 py-3 rounded-xl text-slate-900 shadow-sm">
              <Briefcase className="w-4 h-4 text-emerald-600 shrink-0" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full text-sm font-medium bg-transparent focus:outline-none text-slate-800 cursor-pointer"
              >
                {JOB_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id} className="text-slate-900">
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Submit Button */}
            <button
              type="submit"
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold px-6 py-3.5 rounded-xl transition-all shadow-md hover:shadow-emerald-500/25 flex items-center justify-center gap-2 shrink-0 cursor-pointer text-sm"
            >
              <Search className="w-4 h-4" />
              <span>Search Jobs</span>
            </button>
          </form>

          {/* Quick Search Tags */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400">
            <span className="font-medium text-slate-500">Popular Searches:</span>
            {["Telebirr", "Flutter", "Commercial Bank", "DevOps", "UNECA", "Remote", "FinTech"].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  setSearchQuery(tag);
                  if (onSearchSubmit) onSearchSubmit();
                }}
                className="hover:text-emerald-300 hover:underline transition-colors cursor-pointer bg-white/5 px-2 py-0.5 rounded border border-white/5"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Impact Statistics */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 border-t border-slate-800/80 pt-10">
          <div className="flex items-center gap-3.5 bg-slate-900/40 p-4 rounded-xl border border-slate-800/60">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-white">1,450+</div>
              <div className="text-xs text-slate-400 font-medium">Active Vacancies</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-slate-900/40 p-4 rounded-xl border border-slate-800/60">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-white">380+</div>
              <div className="text-xs text-slate-400 font-medium">Verified Employers</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-slate-900/40 p-4 rounded-xl border border-slate-800/60">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-white">85,000+</div>
              <div className="text-xs text-slate-400 font-medium">Ethiopian Candidates</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-slate-900/40 p-4 rounded-xl border border-slate-800/60">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-white">100%</div>
              <div className="text-xs text-slate-400 font-medium">Scam-Free Guaranteed</div>
            </div>
          </div>
        </div>

        {/* Featured Organization Monograms */}
        <div className="mt-10 pt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-semibold uppercase tracking-wider text-slate-500">
          <span>Trusted by teams at:</span>
          <span className="text-slate-400 font-bold hover:text-slate-200 transition-colors">Telebirr</span>
          <span className="text-slate-400 font-bold hover:text-slate-200 transition-colors">Commercial Bank of Ethiopia</span>
          <span className="text-slate-400 font-bold hover:text-slate-200 transition-colors">Ethiopian Airlines</span>
          <span className="text-slate-400 font-bold hover:text-slate-200 transition-colors">UNECA</span>
          <span className="text-slate-400 font-bold hover:text-slate-200 transition-colors">Ride</span>
          <span className="text-slate-400 font-bold hover:text-slate-200 transition-colors">Chapa</span>
        </div>
      </div>
    </section>
  );
}
