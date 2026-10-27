-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Job" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "companyLogoText" TEXT NOT NULL DEFAULT '',
    "companyColor" TEXT NOT NULL DEFAULT '#059669',
    "category" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "workplaceType" TEXT NOT NULL,
    "employmentType" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "salary" TEXT NOT NULL,
    "deadline" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "postedDate" TEXT NOT NULL DEFAULT 'Just now',
    "applicantsCount" INTEGER NOT NULL DEFAULT 0,
    "responsibilities" TEXT NOT NULL DEFAULT '[]',
    "requirements" TEXT NOT NULL DEFAULT '[]',
    "benefits" TEXT NOT NULL DEFAULT '[]',
    "tags" TEXT NOT NULL DEFAULT '[]',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "urgent" BOOLEAN NOT NULL DEFAULT false,
    "approvalStatus" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "employerId" TEXT,
    CONSTRAINT "Job_employerId_fkey" FOREIGN KEY ("employerId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Job" ("approvalStatus", "benefits", "category", "company", "createdAt", "deadline", "description", "employerId", "employmentType", "experience", "featured", "id", "location", "requirements", "responsibilities", "salary", "tags", "title", "updatedAt", "urgent", "workplaceType") SELECT "approvalStatus", "benefits", "category", "company", "createdAt", "deadline", "description", "employerId", "employmentType", "experience", "featured", "id", "location", "requirements", "responsibilities", "salary", "tags", "title", "updatedAt", "urgent", "workplaceType" FROM "Job";
DROP TABLE "Job";
ALTER TABLE "new_Job" RENAME TO "Job";
CREATE INDEX "Job_approvalStatus_idx" ON "Job"("approvalStatus");
CREATE INDEX "Job_category_idx" ON "Job"("category");
CREATE INDEX "Job_location_idx" ON "Job"("location");
CREATE INDEX "Job_employerId_idx" ON "Job"("employerId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
