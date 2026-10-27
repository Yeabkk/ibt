"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  Bookmark,
  PlusCircle,
  LayoutDashboard,
  Menu,
  X,
  Search,
  Sparkles,
} from "lucide-react";

export default function Navbar({
  savedCount = 0,
  applicationCount = 0,
  onOpenPostJob,
  onOpenDashboard,
  onSelectCategory,
  onScrollToJobs,
  user = null,
  authLoading = false,
  onSignOut,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => {
                if (onSelectCategory) onSelectCategory("all");
                if (onScrollToJobs) onScrollToJobs();
              }}
              className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center text-white shadow-md shadow-emerald-950/10 border border-slate-700/40 group-hover:scale-105 transition-transform">
                <div className="relative">
                  <Briefcase className="w-6 h-6 text-emerald-400" />
                  <span className="absolute -bottom-1 -right-1.5 w-3 h-3 bg-amber-400 rounded-full border-2 border-slate-900" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-2xl font-black tracking-tight text-slate-950">
                    Habesha
                  </span>
                  <span className="text-2xl font-black tracking-tight text-emerald-600">
                    Jobs
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded ml-1">
                    ET
                  </span>
                </div>
                <span className="text-[11px] font-medium text-slate-500 tracking-wide">
                  Ethiopian Career & Tech Network
                </span>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
              <button
                onClick={onScrollToJobs}
                className="hover:text-emerald-600 transition-colors cursor-pointer flex items-center gap-1.5 py-1"
              >
                <Search className="w-4 h-4 text-slate-400" />
                Explore Vacancies
              </button>
              <button
                onClick={() => onSelectCategory && onSelectCategory("Technology")}
                className="hover:text-emerald-600 transition-colors cursor-pointer py-1"
              >
                Tech & FinTech
              </button>
              <button
                onClick={() => onSelectCategory && onSelectCategory("Banking & Finance")}
                className="hover:text-emerald-600 transition-colors cursor-pointer py-1"
              >
                Banking
              </button>
              <button
                onClick={() => onSelectCategory && onSelectCategory("NGO & Development")}
                className="hover:text-emerald-600 transition-colors cursor-pointer py-1"
              >
                NGOs
              </button>
            </nav>
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Saved Jobs Trigger */}
            <button
              onClick={() => onOpenDashboard && onOpenDashboard("saved")}
              className="relative p-2.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-emerald-600 hover:border-emerald-200 transition-all cursor-pointer flex items-center gap-2 text-sm font-medium"
              title="View Saved Jobs"
            >
              <Bookmark className="w-4 h-4" />
              <span className="hidden md:inline">Saved</span>
              {savedCount > 0 && (
                <span className="bg-emerald-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Candidate Dashboard Trigger */}
            <button
              onClick={() => onOpenDashboard && onOpenDashboard("applications")}
              className="relative p-2.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-emerald-600 hover:border-emerald-200 transition-all cursor-pointer flex items-center gap-2 text-sm font-medium"
              title="Dashboard & Applications"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden md:inline">Dashboard</span>
              {applicationCount > 0 && (
                <span className="bg-slate-900 text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                  {applicationCount}
                </span>
              )}
            </button>

            {/* Post Job CTA */}
            <button
              onClick={onOpenPostJob}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white text-sm font-semibold px-4 py-2.5 rounded-lg shadow-sm hover:shadow transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post a Job</span>
            </button>
            {authLoading ? (
              <span className="text-xs text-slate-400">Checking account...</span>
            ) : user ? (
              <div className="flex items-center gap-2">
                <span className="hidden xl:inline max-w-32 truncate text-xs text-slate-500">{user.name}</span>
                <button
                  onClick={onSignOut}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login" className="rounded-lg px-2 py-2 text-xs font-semibold text-slate-600 hover:text-emerald-700">Sign in</Link>
                <Link href="/register" className="rounded-lg border border-emerald-200 px-3 py-2 text-xs font-bold text-emerald-700 hover:bg-emerald-50">Register</Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => onOpenDashboard && onOpenDashboard("saved")}
              className="relative p-2 rounded-lg border border-slate-200 text-slate-700"
            >
              <Bookmark className="w-5 h-5" />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-slate-200 py-4 space-y-3">
            <div className="grid grid-cols-2 gap-2 pb-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenDashboard) onOpenDashboard("saved");
                }}
                className="flex items-center justify-center gap-2 p-2.5 bg-slate-100 rounded-lg text-sm font-medium text-slate-700"
              >
                <Bookmark className="w-4 h-4 text-emerald-600" />
                Saved ({savedCount})
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenDashboard) onOpenDashboard("applications");
                }}
                className="flex items-center justify-center gap-2 p-2.5 bg-slate-100 rounded-lg text-sm font-medium text-slate-700"
              >
                <LayoutDashboard className="w-4 h-4 text-emerald-600" />
                Applications ({applicationCount})
              </button>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onScrollToJobs) onScrollToJobs();
              }}
              className="w-full text-left py-2 px-3 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded"
            >
              Browse All Jobs
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onSelectCategory) onSelectCategory("Technology");
              }}
              className="w-full text-left py-2 px-3 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded"
            >
              Technology & FinTech
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onSelectCategory) onSelectCategory("Banking & Finance");
              }}
              className="w-full text-left py-2 px-3 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded"
            >
              Commercial Banking
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onSelectCategory) onSelectCategory("NGO & Development");
              }}
              className="w-full text-left py-2 px-3 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded"
            >
              NGOs & International
            </button>

            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenPostJob) onOpenPostJob();
                }}
                className="w-full py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                Post a Job Listing
              </button>
              {user ? (
                <button
                  onClick={onSignOut}
                  className="w-full py-2.5 text-sm font-semibold text-slate-700"
                >
                  Sign out {user.name}
                </button>
              ) : (
                <div className="flex gap-2 pt-2">
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="flex-1 rounded-lg border border-slate-200 py-2 text-center text-sm font-semibold text-slate-700">Sign in</Link>
                  <Link href="/register" onClick={() => setMobileMenuOpen(false)} className="flex-1 rounded-lg bg-slate-950 py-2 text-center text-sm font-semibold text-white">Register</Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
