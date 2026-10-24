"use client";

import { useState } from "react";
import {
  Briefcase,
  Mail,
  CheckCircle2,
  MapPin,
  Heart,
  Globe2,
  ShieldCheck,
  Send,
} from "lucide-react";

export default function Footer({
  onSelectCategory,
  onOpenPostJob,
  onOpenDashboard,
  onScrollToTop,
}) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() && email.includes("@")) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail("");
      }, 3000);
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Brand Info (2 spans) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white shadow-md">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-white">
                  Habesha
                </span>
                <span className="text-2xl font-black tracking-tight text-emerald-400">
                  Jobs
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.5 rounded ml-1">
                  ET
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Ethiopia&apos;s premier career ecosystem bridging skilled Ethiopian professionals with top-tier technology startups, commercial financial institutions, and global development agencies.
            </p>

            <div className="flex items-center gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Addis Ababa, Ethiopia</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verified Platform</span>
              </div>
            </div>
          </div>

          {/* Column 2: Industry Domains */}
          <div className="space-y-3 text-xs">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Sectors
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectCategory && onSelectCategory("Technology")}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-slate-400"
                >
                  Technology & Software
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory && onSelectCategory("Banking & Finance")}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-slate-400"
                >
                  Banking & FinTech
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory && onSelectCategory("NGO & Development")}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-slate-400"
                >
                  NGO & International
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory && onSelectCategory("Engineering")}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-slate-400"
                >
                  Aviation & Engineering
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory && onSelectCategory("Healthcare")}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-slate-400"
                >
                  Healthcare & Pharma
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Platform Links */}
          <div className="space-y-3 text-xs">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Platform
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onScrollToTop}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-slate-400"
                >
                  Browse Vacancies
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenPostJob}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-slate-400"
                >
                  Post a Job Listing
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenDashboard && onOpenDashboard("saved")}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-slate-400"
                >
                  Saved Positions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenDashboard && onOpenDashboard("applications")}
                  className="hover:text-emerald-400 transition-colors cursor-pointer text-slate-400"
                >
                  Candidate Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-3 text-xs">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Stay Informed
            </h4>
            <p className="text-slate-400 text-xs">
              Subscribe to the weekly Ethiopian career digest for trending vacancies.
            </p>

            {subscribed ? (
              <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>Subscribed! Check your inbox weekly.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    required
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Join Career Alert</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar & Academic/Demo Disclaimer */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 Habesha Jobs. Academic & Professional Portfolio Demonstration.
          </div>
          <div className="bg-slate-900 px-3 py-1 rounded-md text-[11px] text-slate-400 border border-slate-800 text-center">
            Demo Environment • Local Browser Persistence • Designed for Evaluation
          </div>
        </div>
      </div>
    </footer>
  );
}
