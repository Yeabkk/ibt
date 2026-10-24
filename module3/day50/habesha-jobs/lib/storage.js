/**
 * Habesha Jobs - Local Persistence Helper
 * 
 * Manages client-side storage for saved jobs, demo applications, and user-posted jobs.
 * All data is stored in the browser's localStorage for demonstration purposes.
 */

const STORAGE_KEYS = {
  SAVED_JOBS: "habesha_saved_jobs_v1",
  APPLICATIONS: "habesha_applications_v1",
  POSTED_JOBS: "habesha_posted_jobs_v1",
};

// Safe access to window.localStorage
const isClient = typeof window !== "undefined";

export function getSavedJobIds() {
  if (!isClient) return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SAVED_JOBS);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("Error reading saved jobs:", err);
    return [];
  }
}

export function saveJobId(jobId) {
  if (!isClient) return [];
  try {
    const current = getSavedJobIds();
    if (!current.includes(jobId)) {
      const updated = [...current, jobId];
      localStorage.setItem(STORAGE_KEYS.SAVED_JOBS, JSON.stringify(updated));
      return updated;
    }
    return current;
  } catch (err) {
    console.error("Error saving job:", err);
    return [];
  }
}

export function removeJobId(jobId) {
  if (!isClient) return [];
  try {
    const current = getSavedJobIds();
    const updated = current.filter((id) => id !== jobId);
    localStorage.setItem(STORAGE_KEYS.SAVED_JOBS, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error("Error removing saved job:", err);
    return [];
  }
}

export function toggleSavedJobId(jobId) {
  const current = getSavedJobIds();
  if (current.includes(jobId)) {
    return { list: removeJobId(jobId), isSaved: false };
  } else {
    return { list: saveJobId(jobId), isSaved: true };
  }
}

export function getApplications() {
  if (!isClient) return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("Error reading applications:", err);
    return [];
  }
}

export function saveApplication(applicationData) {
  if (!isClient) return null;
  try {
    const current = getApplications();
    const newApp = {
      id: "app-" + Date.now(),
      status: "Submitted (Demo Review)",
      appliedAt: new Date().toISOString(),
      ...applicationData,
    };
    const updated = [newApp, ...current];
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(updated));
    return newApp;
  } catch (err) {
    console.error("Error saving application:", err);
    return null;
  }
}

export function withdrawApplication(appId) {
  if (!isClient) return [];
  try {
    const current = getApplications();
    const updated = current.filter((a) => a.id !== appId);
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error("Error withdrawing application:", err);
    return [];
  }
}

export function getUserPostedJobs() {
  if (!isClient) return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.POSTED_JOBS);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("Error reading posted jobs:", err);
    return [];
  }
}

export function saveUserPostedJob(jobData) {
  if (!isClient) return null;
  try {
    const current = getUserPostedJobs();
    const newJob = {
      id: "user-job-" + Date.now(),
      isUserPosted: true,
      postedDate: "Just now",
      applicantsCount: 0,
      featured: false,
      urgent: false,
      companyLogoText: (jobData.company || "ET").slice(0, 2).toUpperCase(),
      companyColor: "#059669",
      ...jobData,
    };
    const updated = [newJob, ...current];
    localStorage.setItem(STORAGE_KEYS.POSTED_JOBS, JSON.stringify(updated));
    return newJob;
  } catch (err) {
    console.error("Error saving posted job:", err);
    return null;
  }
}

export function deleteUserPostedJob(jobId) {
  if (!isClient) return [];
  try {
    const current = getUserPostedJobs();
    const updated = current.filter((j) => j.id !== jobId);
    localStorage.setItem(STORAGE_KEYS.POSTED_JOBS, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error("Error deleting posted job:", err);
    return [];
  }
}
