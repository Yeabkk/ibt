"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import DemoBanner from "@/components/DemoBanner";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoryPills from "@/components/CategoryPills";
import FilterBar from "@/components/FilterBar";
import JobCard from "@/components/JobCard";
import JobDetailModal from "@/components/JobDetailModal";
import ApplyModal from "@/components/ApplyModal";
import PostJobModal from "@/components/PostJobModal";
import DashboardModal from "@/components/DashboardModal";
import PresentationModal from "@/components/PresentationModal";
import Footer from "@/components/Footer";
import { useAuth } from "@/components/AuthProvider";

import { INITIAL_JOBS } from "@/lib/jobs-data";
import {
  getSavedJobIds,
  toggleSavedJobId,
  getApplications,
  getUserPostedJobs,
} from "@/lib/storage";
import {
  RotateCcw,
  Inbox,
  CheckCircle2,
} from "lucide-react";

export default function Home() {
  const { user, loading: authLoading, setUser } = useAuth();
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [savedJobIds, setSavedJobIds] = useState([]);
  const [applications, setApplications] = useState([]);
  const [userPostedJobs, setUserPostedJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(true);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedExperience, setSelectedExperience] = useState("All Levels");
  const [onlyRemote, setOnlyRemote] = useState(false);
  const [onlyFeatured, setOnlyFeatured] = useState(false);

  // Modals state
  const [selectedJobForDetails, setSelectedJobForDetails] = useState(null);
  const [selectedJobForApply, setSelectedJobForApply] = useState(null);
  const [isPostJobOpen, setIsPostJobOpen] = useState(false);
  const [dashboardConfig, setDashboardConfig] = useState({
    isOpen: false,
    tab: "saved",
  });
  const [isPresentationModalOpen, setIsPresentationModalOpen] = useState(false);

  // Toast / notification feedback
  const [toastMessage, setToastMessage] = useState(null);

  const jobsSectionRef = useRef(null);

  useEffect(() => {
    let active = true;

    async function loadJobs() {
      try {
        const response = await fetch("/api/jobs", { cache: "no-store" });
        if (!response.ok) return;
        const data = await response.json();
        if (active) setJobs(data.jobs ?? []);
      } catch {
        if (active) setJobs(INITIAL_JOBS);
      } finally {
        if (active) setJobsLoading(false);
      }
    }

    loadJobs();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (authLoading) return;
    let active = true;

    async function loadAccountData() {
      if (!user) {
        setSavedJobIds(getSavedJobIds());
        setApplications(getApplications());
        setUserPostedJobs(getUserPostedJobs());
        return;
      }

      setSavedJobIds([]);
      setApplications([]);
      setUserPostedJobs([]);

      try {
        if (user.role === "jobSeeker") {
          const [savedResponse, applicationResponse] = await Promise.all([
            fetch("/api/saved-jobs", { cache: "no-store" }),
            fetch("/api/applications", { cache: "no-store" }),
          ]);
          if (!active) return;
          if (savedResponse.ok) {
            const data = await savedResponse.json();
            setSavedJobIds(data.savedJobs.map((saved) => saved.jobId));
          }
          if (applicationResponse.ok) {
            const data = await applicationResponse.json();
            setApplications(data.applications);
          }
        }

        if (user.role === "employer") {
          const response = await fetch("/api/jobs?mine=true", { cache: "no-store" });
          if (response.ok && active) {
            const data = await response.json();
            setUserPostedJobs(data.jobs);
          }
        }
      } catch {
        if (active) showToast("Could not load your account data.");
      }
    }

    loadAccountData();
    return () => {
      active = false;
    };
  }, [authLoading, user]);

  // Show temporary toast notification
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Combine initial demo jobs and user-created demo jobs
  const allJobs = useMemo(() => {
    return [...new Map([...userPostedJobs, ...jobs].map((job) => [job.id, job])).values()];
  }, [jobs, userPostedJobs]);

  // Reactive filtering logic
  const filteredJobs = useMemo(() => {
    return allJobs.filter((job) => {
      // 1. Keyword search (title, company, description, tags)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const titleMatch = job.title?.toLowerCase().includes(q);
        const compMatch = job.company?.toLowerCase().includes(q);
        const descMatch = job.description?.toLowerCase().includes(q);
        const tagMatch = job.tags?.some((t) => t.toLowerCase().includes(q));
        if (!titleMatch && !compMatch && !descMatch && !tagMatch) {
          return false;
        }
      }

      // 2. Category
      if (selectedCategory !== "all" && job.category !== selectedCategory) {
        return false;
      }

      // 3. Location
      if (selectedLocation !== "All Locations") {
        if (selectedLocation === "Addis Ababa (All Sub-cities)") {
          if (!job.location?.toLowerCase().includes("addis ababa")) return false;
        } else if (!job.location?.toLowerCase().includes(selectedLocation.toLowerCase())) {
          return false;
        }
      }

      // 4. Employment Type
      if (selectedType !== "All Types") {
        if (job.type !== selectedType && job.workplaceType !== selectedType) {
          return false;
        }
      }

      // 5. Experience
      if (selectedExperience !== "All Levels") {
        const expPrefix = selectedExperience.split(" ")[0].toLowerCase();
        if (!job.experience?.toLowerCase().includes(expPrefix)) {
          return false;
        }
      }

      // 6. Only Remote / Hybrid
      if (onlyRemote) {
        const isRemoteOrHybrid =
          job.workplaceType === "Remote" ||
          job.workplaceType === "Hybrid" ||
          job.type === "Remote" ||
          job.location?.toLowerCase().includes("remote");
        if (!isRemoteOrHybrid) return false;
      }

      // 7. Only Featured
      if (onlyFeatured && !job.featured) {
        return false;
      }

      return true;
    });
  }, [
    allJobs,
    searchQuery,
    selectedCategory,
    selectedLocation,
    selectedType,
    selectedExperience,
    onlyRemote,
    onlyFeatured,
  ]);

  // Reset filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedLocation("All Locations");
    setSelectedCategory("all");
    setSelectedType("All Types");
    setSelectedExperience("All Levels");
    setOnlyRemote(false);
    setOnlyFeatured(false);
  };

  // Toggle saved job with feedback
  const handleToggleSave = async (jobId) => {
    if (user?.role === "jobSeeker") {
      const isSaved = savedJobIds.includes(jobId);
      const response = await fetch(
        isSaved ? `/api/saved-jobs?jobId=${encodeURIComponent(jobId)}` : "/api/saved-jobs",
        {
          method: isSaved ? "DELETE" : "POST",
          headers: isSaved ? undefined : { "Content-Type": "application/json" },
          body: isSaved ? undefined : JSON.stringify({ jobId }),
        },
      );
      if (!response.ok) {
        showToast("Sign in as a job seeker to save jobs.");
        return;
      }
      setSavedJobIds((current) =>
        isSaved ? current.filter((id) => id !== jobId) : [...current, jobId],
      );
      showToast(isSaved ? "Job removed from saved jobs." : "Job saved to your account.");
      return;
    }

    if (user) {
      showToast("Saved jobs are available to job seekers.");
      return;
    }

    const result = toggleSavedJobId(jobId);
    setSavedJobIds(result.list);
    showToast(result.isSaved ? "Job saved in this browser." : "Job removed from saved jobs.");
  };

  async function handleApplicationSuccess() {
    if (user?.role !== "jobSeeker") {
      setApplications(getApplications());
      showToast("Demo application saved in this browser.");
      return;
    }
    const response = await fetch("/api/applications", { cache: "no-store" });
    if (response.ok) {
      const data = await response.json();
      setApplications(data.applications);
    }
    showToast("Application submitted successfully!");
  }

  const handleJobPosted = (newJob) => {
    setUserPostedJobs((current) => [newJob, ...current.filter((job) => job.id !== newJob.id)]);
    showToast("Your listing was submitted for administrator review.");
    scrollToJobs();
  };

  const handleOpenPostJob = () => {
    if (!user) {
      window.location.href = "/register?role=employer";
      return;
    }
    if (user.role !== "employer") {
      showToast("Only employer accounts can post jobs.");
      return;
    }
    setIsPostJobOpen(true);
  };

  const handleOpenDashboard = (tab = "saved") => {
    if (user) {
      window.location.href = user.role === "admin" ? "/admin" : "/dashboard";
      return;
    }
    setDashboardConfig({ isOpen: true, tab });
  };

  async function handleSignOut() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    window.location.href = "/";
  }

  const scrollToJobs = () => {
    if (jobsSectionRef.current) {
      jobsSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Saved jobs list populated with full job objects
  const savedJobsObjects = useMemo(() => {
    return allJobs.filter((job) => savedJobIds.includes(job.id));
  }, [allJobs, savedJobIds]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-emerald-500 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-200">
          <div className="bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-xl border border-slate-700 flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Top Demo Banner */}
      <DemoBanner
        onOpenPresentationHelp={() => setIsPresentationModalOpen(true)}
      />

      {/* Main Navigation */}
      <Navbar
        savedCount={savedJobIds.length}
        applicationCount={applications.length}
        onOpenPostJob={handleOpenPostJob}
        onOpenDashboard={handleOpenDashboard}
        onSelectCategory={(catId) => {
          setSelectedCategory(catId);
          scrollToJobs();
        }}
        onScrollToJobs={scrollToJobs}
        user={user}
        authLoading={authLoading}
        onSignOut={handleSignOut}
      />

      {/* Hero Section */}
      <Hero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onSearchSubmit={scrollToJobs}
      />

      {/* Industry Category Selector */}
      <CategoryPills
        selectedCategory={selectedCategory}
        onSelectCategory={(catId) => {
          setSelectedCategory(catId);
          scrollToJobs();
        }}
        totalJobsCount={allJobs.length}
      />

      {/* Main Listings Section */}
      <main
        ref={jobsSectionRef}
        className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full"
      >
        {/* Filter Controls Bar */}
        <FilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          selectedExperience={selectedExperience}
          setSelectedExperience={setSelectedExperience}
          onlyRemote={onlyRemote}
          setOnlyRemote={setOnlyRemote}
          onlyFeatured={onlyFeatured}
          setOnlyFeatured={setOnlyFeatured}
          onResetFilters={handleResetFilters}
          totalResults={filteredJobs.length}
        />

        {/* Listings Grid or Empty State */}
        {filteredJobs.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center max-w-lg mx-auto shadow-sm my-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Inbox className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                No Vacancies Match Your Filters
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Try widening your search terms, choosing &quot;All Locations&quot;, or resetting your filters to view all Ethiopian openings.
              </p>
            </div>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                isSaved={savedJobIds.includes(job.id)}
                hasApplied={applications.some((a) => a.jobId === job.id)}
                onToggleSave={handleToggleSave}
                onViewDetails={() => setSelectedJobForDetails(job)}
                onApply={() => setSelectedJobForApply(job)}
              />
            ))}
          </div>
        )}
        {jobsLoading && <p className="mt-4 text-center text-xs text-slate-500">Loading current listings...</p>}
      </main>

      {/* Detail Modal */}
      <JobDetailModal
        job={selectedJobForDetails}
        isOpen={Boolean(selectedJobForDetails)}
        onClose={() => setSelectedJobForDetails(null)}
        isSaved={selectedJobForDetails ? savedJobIds.includes(selectedJobForDetails.id) : false}
        hasApplied={
          selectedJobForDetails
            ? applications.some((a) => a.jobId === selectedJobForDetails.id)
            : false
        }
        onToggleSave={handleToggleSave}
        onApply={(job) => setSelectedJobForApply(job)}
      />

      {/* Application Modal */}
      <ApplyModal
        job={selectedJobForApply}
        isOpen={Boolean(selectedJobForApply)}
        onClose={() => setSelectedJobForApply(null)}
        onApplicationSuccess={handleApplicationSuccess}
        user={user}
        onOpenDashboard={(tab) => setDashboardConfig({ isOpen: true, tab })}
      />

      {/* Post a Job Modal */}
      <PostJobModal
        isOpen={isPostJobOpen}
        onClose={() => setIsPostJobOpen(false)}
        onJobPosted={handleJobPosted}
        user={user}
      />

      {/* Dashboard Modal */}
      <DashboardModal
        isOpen={dashboardConfig.isOpen}
        initialTab={dashboardConfig.tab}
        onClose={() => setDashboardConfig((prev) => ({ ...prev, isOpen: false }))}
        savedJobs={savedJobsObjects}
        applications={applications}
        userPostedJobs={userPostedJobs}
        onRemoveSavedJob={(id) => handleToggleSave(id)}
        onApplicationWithdrawn={(updated) => {
          setApplications(updated);
          showToast("Application withdrawn.");
        }}
        onUserJobDeleted={(updated) => {
          setUserPostedJobs(updated);
          showToast("Posted listing removed.");
        }}
        onViewJobDetails={(job) => setSelectedJobForDetails(job)}
        onApplyJob={(job) => setSelectedJobForApply(job)}
      />

      {/* Presentation Helper Modal */}
      <PresentationModal
        isOpen={isPresentationModalOpen}
        onClose={() => setIsPresentationModalOpen(false)}
      />

      {/* Footer */}
      <Footer
        onSelectCategory={(catId) => {
          setSelectedCategory(catId);
          scrollToJobs();
        }}
        onOpenPostJob={handleOpenPostJob}
        onOpenDashboard={handleOpenDashboard}
        onScrollToTop={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      />
    </div>
  );
}
