import { prisma } from "@/lib/prisma";
import { requireRole, requireUser } from "@/lib/authorization";
import { internalError, jsonError, readJson, validationError } from "@/lib/http";
import { serializeJob } from "@/lib/jobs";
import { jobSchema } from "@/lib/validation";

export async function GET(request) {
  const search = new URL(request.url).searchParams;
  const mine = search.get("mine") === "true";
  const includeAll = search.get("includeAll") === "true";
  let user = null;

  if (mine || includeAll) {
    const auth = await requireUser();
    if (auth.response) return auth.response;
    user = auth.user;
    const denied = requireRole(user, mine ? ["employer", "admin"] : ["admin"]);
    if (denied) return denied;
  }

  const where = {};
  const andFilters = [];
  if (mine && user.role === "employer") where.employerId = user.id;
  if (!mine && !includeAll) where.approvalStatus = "approved";

  const query = search.get("q")?.trim();
  const category = search.get("category");
  const location = search.get("location");
  const employmentType = search.get("employmentType");
  const workplaceType = search.get("workplaceType");
  const experience = search.get("experience");
  if (query) {
    andFilters.push({ OR: [
      { title: { contains: query } },
      { company: { contains: query } },
      { description: { contains: query } },
      { tags: { contains: query } },
    ] });
  }
  if (category && category !== "all") where.category = category;
  if (location && location !== "All Locations") {
    if (location === "Addis Ababa (All Sub-cities)") {
      where.location = { contains: "Addis Ababa" };
    } else if (location === "Hybrid") {
      where.workplaceType = "Hybrid";
    } else {
      const locationSearch = location.startsWith("Addis Ababa (")
        ? location.slice("Addis Ababa (".length, -1)
        : location;
      where.location = { contains: locationSearch };
    }
  }
  if (employmentType && employmentType !== "All Types") {
    if (["Remote", "Hybrid"].includes(employmentType)) {
      andFilters.push({
        OR: [
          { employmentType },
          { workplaceType: employmentType },
        ],
      });
    } else {
      where.employmentType = employmentType;
    }
  }
  if (workplaceType) where.workplaceType = workplaceType;
  if (experience && experience !== "All Levels") where.experience = { contains: experience.split(" ")[0] };
  if (search.get("featured") === "true") where.featured = true;
  if (search.get("remote") === "true") {
    andFilters.push({ OR: [
      { workplaceType: { in: ["Remote", "Hybrid"] } },
      { location: { contains: "Remote" } },
    ] });
  }
  if (andFilters.length) where.AND = andFilters;

  const page = Math.max(1, Number(search.get("page")) || 1);
  const pageSize = Math.min(100, Math.max(1, Number(search.get("pageSize")) || 100));

  try {
    const [records, total] = await Promise.all([
      prisma.job.findMany({
        where,
        include: { employer: { select: { id: true, name: true } } },
        orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.job.count({ where }),
    ]);

    return Response.json({
      jobs: records.map(serializeJob),
      total,
      page,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch {
    return internalError();
  }
}

export async function POST(request) {
  const auth = await requireUser();
  if (auth.response) return auth.response;
  const denied = requireRole(auth.user, ["employer"]);
  if (denied) return denied;

  const { data: body, response } = await readJson(request);
  if (response) return response;
  const parsed = jobSchema.safeParse(body);
  if (!parsed.success) return validationError(parsed.error);

  const { responsibilities, requirements, benefits, tags, ...fields } = parsed.data;
  try {
    const job = await prisma.job.create({
      data: {
        ...fields,
        companyLogoText: fields.company.slice(0, 3).toUpperCase(),
        responsibilities: JSON.stringify(responsibilities),
        requirements: JSON.stringify(requirements),
        benefits: JSON.stringify(benefits),
        tags: JSON.stringify(tags),
        featured: false,
        urgent: false,
        approvalStatus: "pending",
        employerId: auth.user.id,
      },
      include: { employer: { select: { id: true, name: true } } },
    });
    return Response.json({ job: serializeJob(job) }, { status: 201 });
  } catch {
    return internalError();
  }
}
