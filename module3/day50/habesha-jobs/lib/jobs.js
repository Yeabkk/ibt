export function serializeJob(job) {
  if (!job) return null;

  const parseList = (value) => {
    try {
      const parsed = JSON.parse(value ?? "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  return {
    ...job,
    responsibilities: parseList(job.responsibilities),
    requirements: parseList(job.requirements),
    benefits: parseList(job.benefits),
    tags: parseList(job.tags),
    type: job.employmentType,
    employer: job.employer
      ? { id: job.employer.id, name: job.employer.name }
      : null,
  };
}
