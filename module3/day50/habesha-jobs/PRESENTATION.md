# Habesha Jobs — Presentation & Demonstration Guide 🇪🇹

This guide provides an executive summary, architectural defense, and a step-by-step live demo script tailored for evaluators, judges, and stakeholders.

---

## 🎯 30-Second Elevator Pitch

> *"Habesha Jobs is a Next.js job portal with an Ethiopian sample catalog, SQLite-backed accounts and workflows, server-validated APIs, and role-aware candidate, employer, and administrator workspaces. The original visual design and interactive job search remain in place."*

---

## ⏱️ 2-Minute Live Demonstration Script

Follow this script during your presentation for maximum impact:

### Step 1: Homepage & Value Proposition (0:00 - 0:25)
1. Open the homepage at `http://localhost:3000`.
2. **Point out the Branding:** Highlight the modern Ethiopian color identity (Deep Navy, Emerald Green, and Amber accents) and the platform statistics (*1,450+ Active Vacancies, 380+ Verified Employers*).
3. **Show Demo Transparency:** Note the top announcement banner clarifying that this is an evaluation environment with realistic Ethiopian market data.

### Step 2: Search & Multi-Faceted Filtering (0:25 - 0:50)
1. In the Hero search bar, type `Telebirr` or `React`. Observe the job feed react instantly.
2. Select **"Addis Ababa (Bole)"** from the location dropdown and watch the catalog narrow down.
3. Click on the **"Banking & FinTech"** or **"NGO & International"** category pills to demonstrate one-click sector switching.
4. Toggle the **"Remote / Hybrid Only"** checkbox to filter for modern work arrangements.
5. Click **"Reset All Filters"** to restore the full directory.

### Step 3: Job Details & Bookmarking (0:50 - 1:15)
1. Click the **"Details"** button on the *Senior Full-Stack Engineer (Telebirr)* or *Commercial Bank of Ethiopia* card.
2. Walk through the modal highlights: Key deliverables, technical requirements, benefits, and the shareable link button.
3. Click the **"Save Job"** bookmark icon. Point out the instant visual badge feedback and the counter updating in the top navbar.

### Step 4: Candidate Application Flow (1:15 - 1:40)
1. Register or sign in as a job seeker.
2. Click **"Apply for this Position"** and submit valid contact details.
3. Explain that the browser sends JSON to `POST /api/applications`; the server validates it and stores the application with the signed-in user and job.
4. Open the dashboard and show the database-generated ID, reference code, and application status.

### Step 5: Employer "Post a Job" & Dashboard (1:40 - 2:00)
1. Register or sign in as an employer and submit a listing.
2. Explain that the API assigns ownership from the session and saves the listing as pending.
3. Sign in with the locally configured admin and approve the listing in `/admin`.
4. Show the role-specific dashboard and analytics. Explain that each management API checks permissions on the server.

---

## 🏗️ Architectural Decisions & Justifications

### 1. Why Next.js 16 App Router & React 19?
* **Modern Standard:** Uses React 19 compiler optimizations and App Router structure for efficient component modularity.
* **Instant Transitions:** Client-side reactive filtering provides instant search feedback without server roundtrip latency.

### 2. Why Tailwind CSS v4?
* **Streamlined Styling:** Leverages the latest `@tailwindcss/turbopack` integration for high visual polish without bloated legacy CSS files.
* **Unified Design Tokens:** Customized variables for deep navy, Ethiopian emerald green, and amber badges.

### 3. Why Local SQLite and Prisma?
* **Easy local setup:** SQLite stores project data in a file and does not need a separate database server.
* **Relational records:** Prisma connects users, employer-owned jobs, applications, saved jobs, and sessions through database relationships.
* **Clear boundary:** Signed-in writes go through server Route Handlers. Anonymous demo bookmarks/applications may still use browser storage and are not shared across accounts.

---

## 📋 Evaluation Checklist & Deliverables

| Requirement | Implementation Details | Status |
| :--- | :--- | :---: |
| **Responsive Ethiopian Portal** | Modern responsive layout, logo, hero, statistics, footer | ✅ Complete |
| **Realistic Sample Listings** | 16 realistic Ethiopian vacancies in `lib/jobs-data.js` | ✅ Complete |
| **Search & Filtering** | Keywords, location, category, employment type, remote, featured | ✅ Complete |
| **Interactive Job Details** | Full description, responsibilities, requirements modal | ✅ Complete |
| **Application Flow** | Form validation, resume upload simulator, success code | ✅ Complete |
| **Saved Jobs Persistence** | Instant bookmarking persisted in `localStorage` | ✅ Complete |
| **Post a Job Form** | Interactive employer posting with live catalog updates | ✅ Complete |
| **Role Dashboards** | Candidate and employer workspaces plus admin management | ✅ Added |
| **Database** | Prisma + SQLite with seeded fixture jobs | ✅ Added |
| **Authentication** | bcrypt password hashes and opaque HTTP-only cookie sessions | ✅ Added |
| **Dynamic Job Pages** | `/jobs/[id]` page and working share links | ✅ Added |
| **Admin Analytics** | Database-backed totals and four Recharts charts | ✅ Added |
| **Color & Visual Polish** | Deep navy, crisp white, and emerald green accents | ✅ Complete |
| **Workspace Fix** | `turbopack.root: path.resolve(".")` safely configured | ✅ Complete |
| **Lint Verification** | `npm.cmd run lint` | ✅ Passed |
| **Production Build** | `npm.cmd run build` | Pending final verification |

---

## 💡 Potential Future Enhancements (Post-Deadline Roadmap)
1. **Hosted deployment database:** Move from local SQLite to managed PostgreSQL before deploying for multiple users.
2. **Operational security:** Add rate limiting, password reset, email verification, and a security review.
3. **Resume upload:** Add validated private file storage and access control rather than storing only a filename.
4. **Multilingual Support:** Full bilingual interface supporting Amharic and English.

## Full-Stack Concepts for Presentation

### Why Next.js and the App Router?
Next.js combines React UI with server rendering and backend features in one project. The App Router maps folders under `app/` to pages and API endpoints, and supports layouts and dynamic route segments.

### What is a dynamic route?
`app/jobs/[id]/page.js` matches URLs such as `/jobs/job-eth-01`. The page reads the route ID on the server, loads the matching listing from SQLite, and renders the job page.

### What is a Route Handler/API?
A file named `route.js` under `app/api/` handles HTTP requests. For example, the application form sends JSON to `POST /api/applications`; that server handler checks the session, validates the body with Zod, verifies the job is approved, and writes the record with Prisma.

### How do registration and login work?
Registration validates name, email, password, and an allowed role on the server. It hashes the password with bcrypt before storing the user. Login compares the submitted password with the stored hash; the hash is never returned to the browser.

### How does the server know who is logged in?
After login, the server creates a random session token and stores only its SHA-256 hash in the Session table. The original token is sent in an HTTP-only cookie, which browser JavaScript cannot read. Protected requests hash the cookie and look up the session and user in SQLite.

### How do roles and ownership work?
Public registration permits `jobSeeker` and `employer`; only the seed setup creates an `admin`. The API reads roles from the server session, not a value supplied by the UI. Each employer job stores `employerId`; edit/delete handlers compare it to the authenticated user. Admin endpoints check the role in the handler.

### How does applying work?
The form submits to `POST /api/applications`. The server validates fields, gets the applicant from the session, checks the job is approved, and writes an Application record with a database ID and user-friendly reference. Job seekers can view or withdraw only their own applications; employers can see applications for their own jobs; admins can see all.

### Where does data live?
Prisma models and migrations are in `prisma/`. Local development uses SQLite at `prisma/dev.db` by default. The 16 original fixture jobs remain in `lib/jobs-data.js` and are copied into SQLite by the seed command. Signed-in activity persists in the database; anonymous demo activity can remain in browser localStorage.

### What CRUD operations exist?
Employers create, read, update, and delete their own job listings. Administrators read/manage listings and approve or reject them. Job seekers create applications, read their own applications, and withdraw them. Saved jobs can be added, listed, and removed. User role changes are admin-only.

### Current boundaries to disclose
SQLite is local, the initial jobs are sample data, and the resume input stores a filename only (no upload). There is no email delivery, password recovery, rate limiting, or hosted production database. Admin setup uses environment variables documented in `README.md`; this student-project authentication has not been production security reviewed.

## Suggested Full-Stack Demo

1. Browse and filter seeded vacancies while signed out.
2. Register as a job seeker, submit an application, then show its reference and status in the candidate dashboard.
3. Register a second account as an employer. Create a listing and show that it starts as pending.
4. Sign in with the locally configured admin account, approve the listing, and open the admin charts.
5. Return as the employer and show that edits/deletes are restricted to that account's listings.
