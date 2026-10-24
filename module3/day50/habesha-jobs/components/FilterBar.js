"use client";

import {
  Filter,
  X,
  RotateCcw,
  MapPin,
  Briefcase,
  SlidersHorizontal,
  Clock,
  Sparkles,
} from "lucide-react";
import {
  ETHIOPIAN_LOCATIONS,
  EMPLOYMENT_TYPES,
  EXPERIENCE_LEVELS,
} from "@/lib/jobs-data";

export default function FilterBar({
  searchQuery,
  setSearchQuery,
  selectedLocation,
  setSelectedLocation,
  selectedType,
  setSelectedType,
  selectedExperience,
  setSelectedExperience,
  onlyRemote,
  setOnlyRemote,
  onlyFeatured,
  setOnlyFeatured,
  onResetFilters,
  totalResults = 0,
}) {
  const hasActiveFilters =
    Boolean(searchQuery) ||
    selectedLocation !== "All Locations" ||
    selectedType !== "All Types" ||
    selectedExperience !== "All Levels" ||
    onlyRemote ||
    onlyFeatured;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-emerald-600" />
          <h3 className="font-bold text-slate-900 text-base">Filter Opportunities</h3>
          <span className="text-xs bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
            {totalResults} {totalResults === 1 ? "Role" : "Roles"} Available
          </span>
        </div>

        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 transition-colors cursor-pointer self-start lg:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        )}
      </div>

      {/* Filter Row Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-4">
        {/* Location Dropdown */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>Location / Region</span>
          </label>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all cursor-pointer"
          >
            {ETHIOPIAN_LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Employment Type */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5 flex items-center gap-1">
            <Briefcase className="w-3.5 h-3.5 text-slate-400" />
            <span>Employment Type</span>
          </label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all cursor-pointer"
          >
            {EMPLOYMENT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Experience Level */}
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1.5 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>Seniority / Experience</span>
          </label>
          <select
            value={selectedExperience}
            onChange={(e) => setSelectedExperience(e.target.value)}
            className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all cursor-pointer"
          >
            {EXPERIENCE_LEVELS.map((exp) => (
              <option key={exp} value={exp}>
                {exp}
              </option>
            ))}
          </select>
        </div>

        {/* Quick Toggles */}
        <div className="flex flex-col justify-end gap-2">
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyRemote}
                onChange={(e) => setOnlyRemote(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 rounded cursor-pointer accent-emerald-600"
              />
              <span>Remote / Hybrid Only</span>
            </label>
          </div>

          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyFeatured}
                onChange={(e) => setOnlyFeatured(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 rounded cursor-pointer accent-emerald-600"
              />
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                Featured Listings Only
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
