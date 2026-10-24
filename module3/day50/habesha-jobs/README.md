# Habesha Jobs 🇪🇹

**Ethiopia's Premier Career & Opportunity Platform**

Habesha Jobs is a modern, responsive web application connecting Ethiopian professionals with leading technology companies, commercial financial institutions, international NGOs, and global remote opportunities.

> **Demonstration Environment Notice:**  
> This project is designed as an interactive portfolio and presentation showcase. All vacancies and employer profiles in the default catalog are realistic sample demonstration data created for evaluation purposes. Candidate applications and newly posted jobs are persisted locally in the browser (`localStorage`) without requiring external database credentials.

---

## 🌟 Key Features

### 1. Modern Ethiopian Brand & UI Identity
* **Visual Palette:** Built with a professional deep navy (`#0B192C` / `#0F172A`), crisp white, and vibrant Ethiopian emerald green (`#059669` / `#10B981`) with amber accents.
* **Responsive Architecture:** Fully optimized for mobile, tablet, and desktop screens with custom navigation drawers and fluid cards.
* **Live Market Metrics:** Displays real-time statistics (active vacancies, verified employers, candidate network, placement rates).

### 2. Realistic Demonstration Job Catalog (`lib/jobs-data.js`)
* 16 detailed, realistic vacancies across prominent Ethiopian sectors:
  * **Technology & FinTech:** Telebirr / Ethio Telecom, Ride (Hybrid Designs), Gebeya, Chapa Financial Technologies, SunPay.
  * **Commercial Banking:** Commercial Bank of Ethiopia (CBE), Awash Bank, Dashen Bank Tech Lab, Nib International Bank.
  * **NGOs & International Development:** United Nations Economic Commission for Africa (UNECA), Save the Children, Africa CDC / African Union.
  * **Engineering & Aviation:** Ethiopian Airlines Group, MIDROC Investment Group.
  * **Healthcare:** Cadila Pharmaceuticals, Public Health initiatives.
* Realistic salary benchmarks in ETB and USD, verified employer badges, application deadlines, and technical skill tags.

### 3. Real-Time Search & Multi-Faceted Filters
* **Instant Keyword Search:** Searches across job titles, company names, descriptions, and technology tags simultaneously.
* **Region & Location Filtering:** Addis Ababa (Bole, Kazanchis, Mexico Square, Sarbet), Hawassa, Dire Dawa, and Remote Ethiopia.
* **Industry Domain Tabs:** Single-click category filters with live job counters.
* **Workplace & Seniority Filters:** Full-Time, Contract, Remote/Hybrid, and Entry/Mid/Senior experience levels.

### 4. Interactive Job Details Modal
* Rich modal dialog featuring complete role descriptions, deliverables, required qualifications, and company perks.
* One-click job link sharing (copies direct link to clipboard).
* Bookmark toggle button with immediate visual feedback.

### 5. Candidate Application Flow (`ApplyModal.js`)
* Form with input validation (Full Name, valid Email, Ethiopian Phone `+251...`, Location, Experience).
* Interactive resume upload simulator with document preview.
* Instant submission state generating an official application tracking reference (e.g., `#HAB-2026-4891`).
* Automatically logs applications into browser storage for review in the Candidate Dashboard.

### 6. Employer "Post a Job" Workflow (`PostJobModal.js`)
* Interactive creation form allowing evaluators to publish new openings directly.
* Validates title, organization, description, salary, category, and requirements.
* Prepends new listings to the active feed with a distinctive **"User Created"** badge.

### 7. User Activity Hub & Dashboard (`DashboardModal.js`)
* **Saved Jobs Tab:** Manage bookmarked roles with quick apply or remove options.
* **My Applications Tab:** Track submitted demo applications with timestamps, status ("Submitted / Demo Review"), and withdrawal options.
* **My Posted Listings Tab:** Inspect and manage employer openings created during the session.

---

## 🛠️ Architecture & Tech Stack

* **Framework:** Next.js `16.4.2` (App Router)
* **Frontend Library:** React `19.3.0` (with React Compiler)
* **Styling:** Tailwind CSS `v4` (`@tailwindcss/turbopack`)
* **Typography:** Next.js Google Fonts (`Geist` & `Geist Mono`)
* **Icons:** `lucide-react`
* **State & Persistence:** React hooks with lazy initialization synchronized to browser `localStorage` via a dedicated utility layer (`lib/storage.js`).
* **Language:** JavaScript (ES Modules, configured with `jsconfig.json`).

---

## 🚀 Getting Started

### Prerequisites
* **Node.js:** `v20+` or `v24+` installed (tested on Node `v24.12.0`).
* **npm:** `v10+` or `v11+` (tested on npm `v11.6.2`).

### Installation
Dependencies are already configured. If reinstalling:
```powershell
# On Windows PowerShell, use npm.cmd to avoid script execution policy restrictions:
npm.cmd install
```

### Running the Development Server
```powershell
npm.cmd run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Running Lint Checks
```powershell
npm.cmd run lint
```
*Note: ESLint passes with 0 errors and 0 warnings.*

### Production Build
```powershell
npm.cmd run build
```
Creates an optimized production bundle with Turbopack and Cache Components enabled.

---

## 🔒 Limitations & Transparency

1. **No External Database:** By design, this showcase does not connect to an external SQL/NoSQL database (e.g. Supabase, PostgreSQL) to guarantee 100% demo uptime and eliminate credential dependencies or network latency during evaluations.
2. **Client-Side Persistence:** All actions (applications, bookmarks, posted jobs) persist reliably in your browser's `localStorage`. Clearing browser cache will reset data to initial demo state.
3. **Demo Security:** There is no remote authentication or real employer notification dispatch; all workflows are self-contained client-side simulations.
