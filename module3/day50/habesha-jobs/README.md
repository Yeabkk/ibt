# Habesha Jobs

Habesha Jobs is an Ethiopian job portal demo built for exploring vacancies, applying for work, and managing employer listings. This guide describes the application as it is currently implemented; it distinguishes database-backed account activity from browser-only demo activity.

## 1. Project Overview

The project is a responsive job portal that connects job seekers with illustrative Ethiopian job listings. It supports job search and filtering, job details, job applications, saved jobs, employer listings, and an administrator workspace with analytics and moderation controls.

### Technologies

| Area | Technology |
| --- | --- |
| Web framework and routes | Next.js 16.4.2 App Router |
| UI | React 19.3.0, JavaScript, Tailwind CSS 4 |
| Icons | lucide-react |
| Charts | Recharts 3.10.1 |
| Database access | Prisma ORM 6.19 and SQLite |
| Validation | Zod |
| Password hashing | bcryptjs |

### Architecture

- Pages and API endpoints are in `app/`. App Router pages render server-side where they need authentication or database access.
- Interactive forms, navigation, charts, and modals are React client components in `components/`.
- Shared database, authentication, validation, and demo-storage helpers are in `lib/`.
- Prisma models and migrations are in `prisma/`. SQLite stores registered accounts, jobs, applications, saved jobs, and sessions.
- The original job catalogue is a sample dataset in `lib/jobs-data.js`. It is seeded into SQLite for the public job API and is also used by the home page as a fallback.

The UI uses a deep navy, white, and emerald palette with amber accents. The catalogue includes illustrative Technology, Banking & Finance, NGO & Development, Engineering, Healthcare, and Marketing listings. These are sample records, not live vacancies.

## 2. Main User Roles

### Job Seeker

A job seeker can register and sign in, browse, search and filter the public catalogue, inspect job details, apply, save jobs, view submitted applications and their status, and withdraw an application.

**Normal workflow:** Register → Login → Browse Jobs → Open Job → Apply → Application Saved → View Application Status

### Employer

An employer can register and sign in, open the employer workspace, post a listing, view their own listings and applications, edit their listings, and delete them. New listings start as **pending** and are not publicly listed until an administrator approves them.

**Normal workflow:** Register → Login → Employer Dashboard → Post Job → Job Pending → Admin Review → Approved Job Appears Publicly

### Admin

An administrator moderates the platform; an admin account is not a normal company employer account. The admin workspace can display job, user, application, and pending-job totals; render four database-derived analytics charts; review and edit listings; approve or reject listings; and delete listings. It also lists users and applications, and provides controls for supported role and application-status changes.

**Role distinction:** Employer = creates job opportunities · Job Seeker = applies for jobs · Admin = manages and moderates the platform

## 3. How to Create an Account

1. Open [`/register`](http://localhost:3000/register) or choose **Register** in the site navigation.
2. Enter **Full name**, **Account type**, **Email address**, and **Password**.
3. Choose **Job seeker** or **Employer**. Public registration does not offer an Admin role.
4. Use a name of at least 2 characters, a valid email address, and a password of 10–128 characters.
5. Submit the form. The account is saved to SQLite, the password is hashed, and the application starts a signed-in session. You are directed to `/dashboard` (admins created through the seed go to `/admin` when they log in).

An email address already in use cannot be registered again. The registration API validates the submitted values as well as the browser form.

## 4. How to Log In

1. Open [`/login`](http://localhost:3000/login).
2. Enter the **Email address** and **Password** used for the account.
3. After successful authentication, job seekers and employers are directed to `/dashboard`; administrators are directed to `/admin`.

The server checks the password against its bcrypt hash. It creates a random session token, stores only a hash of the token in SQLite, and sends the token in an HTTP-only cookie. The cookie expires after seven days. Choose **Sign out** in the home-page navigation to revoke the session and clear the cookie.

## 5. How to Use the Job Seeker Features

### Browse Jobs

Open the home page at `/`. Public listings are loaded from the jobs API; the bundled sample catalogue is used as a fallback if the API cannot be reached.

### Search Jobs

Use the search field on the home page to find matches in job titles, company names, descriptions, and skill tags.

### Filter Jobs

Use the available category, location, employment type, workplace, experience, remote, and featured controls. The results update to match the selected filters.

### Open Job Details

Select a job card to open its details. A job also has a route at `/jobs/[id]`; unapproved listings are not public, except to the employer who owns the listing or an administrator.

### Apply for a Job

Select **Apply** from an available job. The form presents these fields:

- Full name, email address, and Ethiopian phone number
- Current city and relevant experience
- CV/resume filename and an optional cover note

The interface validates that the name, email, phone, and resume filename are present; the database API also validates the name, email, phone format, location, and experience. For database applications, use an Ethiopian mobile number in the accepted `+251...` or `09...` format. A signed-in job seeker can submit an application only once per job, and the job must be approved. A successful database application receives a reference code and initial status `submitted`.

The resume control does **not** upload or store a file. The application stores only the resume filename; the interface starts with an illustrative filename, which can be replaced by choosing a local file. Do not treat the example filename as an uploaded CV.

If you apply without signing in, the application is a browser-local demo record, not a database application. It has a demo reference and status and is visible only in that browser's local demo dashboard. It does not appear in admin analytics.

### Save a Job

Use the bookmark control on a job. Signed-in job seekers save approved jobs to SQLite. Anonymous saves are kept in the current browser's `localStorage`.

### View Saved Jobs

Open **Saved** from the home-page navigation. Signed-in users can also view saved listings in `/dashboard`. Anonymous saved items remain local to the browser where they were saved.

### View My Applications

Open **Dashboard** or **Applications** in the home navigation. Signed-in job seekers see their database applications, reference codes, dates, and statuses at `/dashboard`; they can withdraw an application there. Anonymous demo applications are shown only in that browser's local dashboard.

### Log Out

Choose **Sign out** in the home-page navigation. The application calls the logout API, revokes the current database session, and returns to the home page.

## 6. How to Use Employer Features

1. Register at `/register` and choose **Employer**.
2. Sign in at `/login`.
3. Open `/dashboard` for the Employer workspace.
4. Choose **Post a Job** in the home-page navigation.
5. Fill out the actual form fields:
   - Job title and organization/company name
   - Industry category, employment type, and work arrangement
   - Location and compensation/salary range
   - Seniority level and application deadline
   - Job summary/description
   - Key requirements (one per line) and skill/technology tags (comma-separated)
6. Submit the listing for review. Job title, company, and description are checked in the form; the API validates the full job record. The description must contain at least 20 characters. Other form values start with examples/default selections and may be changed.
7. The listing is saved with the employer account and a `pending` approval status. It is not available in the public approved-jobs list until approved by an admin. The employer can see its status in `/dashboard`.
8. Use the dashboard controls to edit or delete your own listings, and review or update the status of applications received for them. Editing an approved listing sends it back for review.

The form supplies default responsibilities and benefits; the current form does not provide fields for employers to edit those values.

## 7. How to Use the Admin Dashboard

### Access and authorization

Sign in with an account whose database role is `admin`, then open `/admin`. The page and admin APIs check the authenticated role. A signed-in non-admin is redirected to `/dashboard`; unauthenticated visitors are sent to `/login`.

### Summary cards

| Card | Meaning |
| --- | --- |
| Total jobs | All job rows in SQLite, including pending and rejected listings |
| Registered users | All user rows in SQLite, including the admin account |
| Applications | All application rows in SQLite |
| Pending jobs | Job rows whose approval status is `pending` |

### Analytics charts

1. **Jobs by Category** — bar chart counting actual job records by their stored category.
2. **Applications Over Time** — line chart counting database applications by their recorded creation date.
3. **Jobs by Employment Type** — donut chart showing the stored employment-type distribution, with an in-card legend.
4. **Job Approval Status** — bar chart counting listings by stored approval status (`pending`, `approved`, or `rejected`).

The analytics API computes these values from SQLite each time the dashboard requests or refreshes data. They are not sample chart totals and they do not count browser-local demo activity. With no applications, the timeline shows an empty state; categories and employment types reflect only the existing jobs.

### Review and manage jobs

1. Select **Jobs** in the admin sidebar to view listings and their approval state.
2. Select **Approve** or **Reject** to change a listing's status. An approved job becomes eligible for public browsing; a pending or rejected listing is not public.
3. Select **Edit** to update the fields supported by the admin edit form, then save. Use **Delete** to remove a listing after confirming the action.
4. Return to **Dashboard** or use **Refresh data**. Totals and charts are reloaded from the database, so changes to jobs update the job charts and pending count. Application counts and dates change when database application records change.

The **Users** section lists registered accounts and supports changing non-admin users between Job Seeker and Employer. It does not provide a control for creating or promoting an admin. The **Applications** section lists database applications and lets an admin update supported application statuses.

### Current local database state

At the time this guide was checked, the local SQLite database contained **16 seeded demo jobs, 0 users, 0 applications, and 0 pending jobs**. This describes this local database only, not a newly created database or another user's copy. The demo job seed does not invent users or applications. Registering users, seeding an admin, posting jobs, or submitting authenticated applications changes these counts.

## 8. Admin Account and Demo Admin Setup

Public registration cannot create an administrator. The existing seed script creates or updates an admin only when all three optional variables are set: `SEED_ADMIN_NAME`, `SEED_ADMIN_EMAIL`, and `SEED_ADMIN_PASSWORD`.

1. Copy `.env.example` to `.env` if you have not already done so.
2. In your local `.env`, set all three admin values. For example, choose a local-only email such as `admin@habeshajobs.local` and set your own unique password. **Do not copy a real password into this README or commit `.env`.**
3. Run the seed command:

   ```powershell
   npm.cmd run db:seed
   ```

The seed script hashes the supplied password with bcrypt and upserts that admin by email. When none of the admin variables are set, the seed adds/updates only the demo job catalogue. If only some admin variables are set, seeding reports an error. Re-running the seed with the same admin email updates that account's name, role, and password hash.

## 9. Database

Prisma uses the local SQLite database specified by `DATABASE_URL`. Models are defined in `prisma/schema.prisma`.

| Model | Purpose |
| --- | --- |
| `User` | Account name, unique email, password hash, role, and creation time |
| `Job` | Listing details, employer relationship, approval state, and timestamps |
| `Application` | Applicant/job details, status, unique reference code, and submission date |
| `SavedJob` | Join record linking a user to a saved job |
| `Session` | Hashed session token, owning user, and expiry time |

Relationship overview:

- A `User` can own many jobs, submit many applications, save many jobs, and have sessions.
- A job can belong to an employer (`employerId`); its employer relationship is optional.
- An application belongs to a user and can refer to a job. Deleting a job keeps the application record but clears its job relation.
- `SavedJob` connects users and jobs. A user cannot save the same job twice.
- Deleting a user cascades to that user's applications, saved jobs, and sessions.

Roles and job/application states are stored as strings in this schema; they are not Prisma enum types. Passwords are stored as bcrypt hashes, never as plaintext. SQLite here is intended for local coursework/demo use, not as a hosted production database.

## 10. Database Setup and Seeding

From the project directory, initialize the local database and demo job records:

```powershell
npm.cmd run db:generate
npm.cmd run db:migrate -- --name init
npm.cmd run db:seed
```

The project includes checked-in Prisma migrations. `db:migrate` runs Prisma's development migration command and applies the schema; for subsequent schema changes use a descriptive migration name:

```powershell
npm.cmd run db:migrate -- --name descriptive_name
```

`db:seed` upserts the sample job catalogue and optionally the admin described above. It does not create job seekers or application records.

## 11. Environment Variables

The required variable for the local application and Prisma is:

| Variable | Required? | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | Yes | Prisma SQLite connection, for example `file:./dev.db` |
| `SEED_ADMIN_NAME` | Optional (all admin variables must be set together) | Name for the local seeded administrator |
| `SEED_ADMIN_EMAIL` | Optional (all admin variables must be set together) | Email used to identify the seeded administrator |
| `SEED_ADMIN_PASSWORD` | Optional (all admin variables must be set together) | Password to hash for the seeded administrator |

`.env.example` contains a safe database URL and commented admin placeholders. Copy it to `.env` and set local values there. `.gitignore` ignores `.env*` while explicitly allowing `.env.example`; do not commit `.env` or any real credentials. The current implementation does not require a separate authentication-secret environment variable.

## 12. Installation

Prerequisites: Node.js 20.9 or newer and npm.

1. Clone the repository using the URL supplied by your instructor, then open a terminal in `module3/day50/habesha-jobs`.
2. Install dependencies:

   ```powershell
   npm.cmd install
   ```

3. Create the local environment file (skip this if `.env` already exists):

   ```powershell
   Copy-Item .env.example .env
   ```

4. Set up Prisma and seed the demo catalogue:

   ```powershell
   npm.cmd run db:generate
   npm.cmd run db:migrate -- --name init
   npm.cmd run db:seed
   ```

5. To sign into the admin area, set all three `SEED_ADMIN_*` values in `.env`, then run `npm.cmd run db:seed` again. Choose the password yourself; no shared demo password is included.
6. Start the development server:

   ```powershell
   npm.cmd run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000).

If the project folder is already cloned, start at step 2. Keep `.env` local and private.

## 13. Available Commands

Run these commands from `module3/day50/habesha-jobs`:

| Command | Purpose |
| --- | --- |
| `npm.cmd install` | Install dependencies from the lock file |
| `npm.cmd run dev` | Start the Next.js development server |
| `npm.cmd run build` | Create the production build |
| `npm.cmd run start` | Serve a production build |
| `npm.cmd run lint` | Run ESLint across the project |
| `npm.cmd run db:generate` | Generate Prisma Client |
| `npm.cmd run db:migrate -- --name init` | Create/apply a development migration |
| `npm.cmd run db:seed` | Seed demo jobs and an optional environment-configured admin |

The `npm.cmd` form is used for Windows PowerShell. No automated test script is defined in `package.json`.

## 14. Project Structure and Routes

### Important files and folders

| Path | Purpose |
| --- | --- |
| `app/` | App Router pages and API route handlers |
| `app/api/` | Authentication, jobs, applications, saved jobs, and admin APIs |
| `components/` | Shared page UI, forms, dashboards, charts, and modals |
| `lib/` | Prisma client, authentication, validation, job serialization, and browser demo storage |
| `prisma/schema.prisma` | Database models and relations |
| `prisma/migrations/` | Committed SQLite schema migrations |
| `prisma/seed.mjs` | Demo jobs and optional admin seed |
| `public/` | Public static assets |
| `lib/jobs-data.js` | Illustrative initial job catalogue and filter choices |

### Page routes

| Route | Purpose |
| --- | --- |
| `/` | Job catalogue, search and filters, job/application modals |
| `/register` | Create a Job Seeker or Employer account |
| `/login` | Sign in |
| `/jobs/[id]` | Job details page |
| `/dashboard` | Candidate or Employer workspace; admins are redirected to `/admin` |
| `/admin` | Admin-only dashboard, analytics, and moderation |

### API routes

| Route | Purpose |
| --- | --- |
| `/api/auth/register` | Register a Job Seeker or Employer and create a session |
| `/api/auth/login` | Verify credentials and create a session |
| `/api/auth/logout` | Revoke the current session |
| `/api/auth/me` | Return the current safe user projection |
| `/api/jobs` | List approved jobs; authenticated employers/admins can access their authorized listings; employer POST creates pending jobs |
| `/api/jobs/[id]` | Read, update, approve/reject, or delete an authorized listing |
| `/api/applications` | Create an authenticated application or list records allowed for the current role |
| `/api/applications/[id]` | Withdraw or update an authorized application's status |
| `/api/saved-jobs` | List, add, or remove a job seeker's saved jobs |
| `/api/admin/analytics` | Admin-only platform totals and chart data |
| `/api/admin/users` | Admin-only user list |
| `/api/admin/users/[id]` | Admin changes a non-admin user's role |

## 15. Application Workflow

- **Job Seeker:** Register → Login → Browse → Apply → Application saved to SQLite → View status in `/dashboard`.
- **Anonymous demo visitor:** Browse → Apply/save in the browser demo flow → View local demo activity in the same browser. This activity is not a database record.
- **Employer:** Register → Login → Create job → Pending → Admin review → Approved listing appears publicly.
- **Admin:** Login → `/admin` → Review jobs → Approve, reject, edit, or delete → Dashboard reloads database-derived totals and charts.

## 16. Authentication and Authorization

Authentication establishes who is signed in; authorization checks what that account's role can do. The roles used by the application are Job Seeker, Employer, and Admin. Registration can create only Job Seeker and Employer accounts; an admin is configured through the local seed environment variables.

Protected pages and APIs check the current session and role. Session cookies are HTTP-only, use `SameSite=Lax`, and are marked Secure in production. Password hashes and hashed session tokens are stored in SQLite. This is an educational local implementation, not a claim of production-grade identity or security; review it before any real deployment.

## 17. Troubleshooting

| Problem | Suggested check |
| --- | --- |
| `npm.cmd install` fails | Confirm Node.js 20.9+ and npm are installed, then retry from the project directory. Check network access if packages cannot be downloaded. |
| Prisma cannot find `DATABASE_URL` | Create `.env` from `.env.example` and confirm `DATABASE_URL="file:./dev.db"` is present. Do not include surrounding extra quote characters. |
| Prisma client or database is out of date | Run `npm.cmd run db:generate`, then `npm.cmd run db:migrate -- --name descriptive_name` for schema changes. |
| Login fails | Check the email and password. Newly registered accounts are stored in the configured SQLite database; passwords are case-sensitive. |
| Admin cannot access `/admin` | Confirm the account has role `admin`. Set all three `SEED_ADMIN_*` variables in `.env`, run `npm.cmd run db:seed`, then sign in again. |
| No jobs appear | Run `npm.cmd run db:seed` and check `DATABASE_URL` points to the intended database. The seed contains sample jobs, not live vacancies. |
| Port 3000 is already in use | Stop the other development server or start Next.js on another port, for example `npm.cmd run dev -- --port 3001`. |
| Lint reports errors | Run `npm.cmd run lint` and inspect the reported source paths. At the time this guide was updated, lint is not clean: it reports generated `.next-build-check` declaration files and hook/declaration-order errors in `app/page.js`, `components/AuthProvider.js`, and `components/RoleDashboard.js`, plus warnings in other existing source. |
| Build fails | Read the first reported build error and verify dependencies, `.env`, and database migrations. `npm.cmd run build` completed successfully during this documentation update. |

## 18. Recommended Demo Flow

For a complete role-based presentation, first create an admin using the seed instructions and register an Employer and Job Seeker using separate accounts:

1. Open the home page and show the sample job catalogue.
2. Search and apply a category/location/employment filter.
3. Open a job card and show its details.
4. Register or sign in as a Job Seeker.
5. Submit an application to an approved listing; explain that only the filename is stored for the resume field.
6. Open `/dashboard` to show saved jobs and the submitted application/status.
7. Sign out from the home navigation.
8. Register or sign in as an Employer and open `/dashboard`.
9. Post a job and point out that it starts as pending.
10. Sign out, then sign in as the seeded Admin.
11. Open `/admin` and show the four totals and analytics charts.
12. Open **Jobs**, approve or reject the pending listing, and refresh/return to Dashboard to show the updated figures.

Use fresh local demo accounts and job submissions for a repeatable demonstration. Do not expect browser-local anonymous applications to appear in the database-backed admin analytics.

## 19. Known Limitations

- The initial 16 job listings are illustrative fixtures, not real vacancies.
- SQLite is a local development/demo database. It is not a hosted, multi-user production database.
- Anonymous saved jobs, applications, and posted-job demo data use browser `localStorage` and are not shared across browsers or included in admin analytics.
- Resume selection records a filename only; uploaded file contents are not stored.
- A clean seeded database has demo jobs but no users, applications, or pending employer listings. Analytics show actual zeros/empty states until records exist.
- The project has no automated test script, email delivery, resume storage, account recovery, or admin-settings page.
- `npm.cmd run lint` currently fails on existing lint issues described in Troubleshooting. `npm.cmd run build` passes as tested for this guide update.
- This is a student-project authentication implementation, not a reviewed production identity provider or production security configuration.

## 20. Development Status

- [x] Job browsing and illustrative job catalogue
- [x] Search and filters
- [x] Job details
- [x] Job Seeker and Employer registration/login
- [x] Database-backed authentication and sessions
- [x] Job Seeker applications and saved jobs
- [x] Employer posting and listing management
- [x] Prisma models, SQLite persistence, and migrations
- [x] Admin dashboard and database-derived analytics charts
- [x] Admin job moderation and supported listing management
- [x] Responsive dashboard layout and empty states
- [ ] Admin Settings page
- [ ] Automated test suite
- [ ] Resume file upload/storage
- [ ] Clean full-project lint
