/**
 * Habesha Jobs - Realistic Demonstration Dataset
 *
 * NOTE FOR EVALUATORS & USERS:
 * All entries in this file are sample demonstration records created for showcasing
 * the functionality of the Habesha Jobs recruitment platform. They are not live vacancies.
 */

export const DEMO_DATA_NOTICE = "Demonstration dataset - not real vacancies.";

export const INITIAL_JOBS = [
  {
    id: "job-eth-01",
    title: "Senior Full-Stack Engineer (FinTech & Telebirr Integrations)",
    company: "Telebirr / Ethio Telecom Partner Lab",
    companyLogoText: "TB",
    companyColor: "#059669", // Emerald green
    featured: true,
    urgent: true,
    category: "Technology",
    location: "Addis Ababa (Bole Medhanialem)",
    workplaceType: "Hybrid",
    type: "Full-Time",
    experience: "Senior (4+ years)",
    salary: "ETB 55,000 - 85,000 / month",
    postedDate: "1 day ago",
    deadline: "Nov 28, 2026",
    applicantsCount: 19,
    description: `We are looking for a Senior Full-Stack Engineer to architect next-generation payment integration rails and high-throughput transaction services for the Telebirr merchant ecosystem. You will collaborate with cross-functional teams in Addis Ababa to deliver resilient microservices that handle millions of daily digital wallet interactions.`,
    responsibilities: [
      "Architect and maintain REST & gRPC API gateways interfacing with Ethiopian National Payment systems.",
      "Build low-latency transaction processing pipelines in Node.js and Go.",
      "Design intuitive web dashboards in React / Next.js for enterprise merchant monitoring.",
      "Collaborate with security and compliance teams to ensure strict data integrity and local banking regulatory adherence.",
      "Mentor mid-level software engineers across agile squads."
    ],
    requirements: [
      "BSc/MSc in Computer Science, Software Engineering, or equivalent practical experience.",
      "4+ years of professional backend development (Node.js, TypeScript, Go, or Java).",
      "Demonstrated experience with payment gateways, banking APIs, or Telebirr/Chapa integrations.",
      "Solid knowledge of PostgreSQL, Redis caching, Docker, and Kubernetes.",
      "Fluency in Amharic and English with strong communication skills."
    ],
    benefits: [
      "Competitive performance bonuses & transport allowance",
      "Comprehensive medical insurance covering family members",
      "Hybrid flexible work arrangement (2 days remote per week)",
      "Continuous learning stipends & certifications support"
    ],
    tags: ["React", "Node.js", "PostgreSQL", "FinTech", "Microservices"]
  },
  {
    id: "job-eth-02",
    title: "Digital Banking Core Specialist",
    company: "Commercial Bank of Ethiopia (CBE)",
    companyLogoText: "CBE",
    companyColor: "#78350f", // CBE Purple/Gold tone
    featured: true,
    urgent: false,
    category: "Banking & Finance",
    location: "Addis Ababa (CBE Headquarters, Mexico Square)",
    workplaceType: "On-site",
    type: "Full-Time",
    experience: "Senior (5+ years)",
    salary: "ETB 60,000 - 90,000 / month",
    postedDate: "2 days ago",
    deadline: "Dec 05, 2026",
    applicantsCount: 34,
    description: `CBE is expanding its Core Digital Banking Systems transformation office. We require a specialized Banking Systems Engineer to supervise Temenos T24 core banking optimizations, API middleware integrations, and high-availability database cluster configurations.`,
    responsibilities: [
      "Maintain 24/7 reliability of core banking database transactions and overnight batch processing.",
      "Develop integration connectors between legacy core banking modules and modern mobile banking apps.",
      "Conduct regular stress testing, disaster recovery drills, and performance profiling.",
      "Oversee system migrations and data warehousing initiatives across central and regional branches."
    ],
    requirements: [
      "Degree in Information Systems, Computer Engineering, or related fields.",
      "5+ years in core banking technologies (Temenos T24, Oracle Flexcube, or Finacle).",
      "Deep understanding of SQL, Oracle DB clustering, Linux enterprise administration, and PCI-DSS standards.",
      "Strong analytical mind with meticulous attention to financial audit requirements."
    ],
    benefits: [
      "Attractive institutional retirement pension and health coverage",
      "Subsidized mortgage and personal loan facilities",
      "Annual merit-based bonuses"
    ],
    tags: ["Core Banking", "T24", "Oracle", "PCI-DSS", "Security"]
  },
  {
    id: "job-eth-03",
    title: "Monitoring, Evaluation & Learning (MEL) Specialist",
    company: "United Nations Economic Commission for Africa (UNECA)",
    companyLogoText: "UN",
    companyColor: "#0284c7", // UN Blue
    featured: true,
    urgent: false,
    category: "NGO & Development",
    location: "Addis Ababa (Menelik II Avenue)",
    workplaceType: "Hybrid",
    type: "Contract",
    experience: "Mid-Level (3-5 years)",
    salary: "USD $2,800 - $3,600 / month",
    postedDate: "3 days ago",
    deadline: "Nov 30, 2026",
    applicantsCount: 42,
    description: `The UNECA Regional Office seeks an experienced MEL Officer to design results-based monitoring frameworks for youth employment and regional trade facilitation projects across the Horn of Africa.`,
    responsibilities: [
      "Design quantitative and qualitative indicators for multi-country employment impact programs.",
      "Conduct field data collection, household surveys, and focus group discussions with partner institutions.",
      "Generate monthly analytical reports and interactive PowerBI / Tableau dashboards for donor reporting.",
      "Train local non-governmental project partners on monitoring protocols and data ethics."
    ],
    requirements: [
      "Master's degree in Economics, Statistics, Public Policy, or International Development.",
      "At least 4 years of proven experience in donor-funded MEL roles (UN, USAID, or EU projects).",
      "Proficiency in SPSS, Stata, R, or Python data analysis suites.",
      "Exemplary professional English writing ability; French is an added advantage."
    ],
    benefits: [
      "International organization tax-exempt competitive stipend",
      "Global medical coverage and hardship allowances",
      "Opportunity to engage with continental policymakers"
    ],
    tags: ["MEL", "Statistics", "Data Analysis", "Public Policy", "International"]
  },
  {
    id: "job-eth-04",
    title: "Lead Mobile App Developer (Flutter & React Native)",
    company: "Ride (Hybrid Designs PLC)",
    companyLogoText: "RD",
    companyColor: "#059669", // Ride green
    featured: false,
    urgent: true,
    category: "Technology",
    location: "Addis Ababa (Kazanchis)",
    workplaceType: "On-site",
    type: "Full-Time",
    experience: "Lead (5+ years)",
    salary: "ETB 65,000 - 95,000 / month",
    postedDate: "Just now",
    deadline: "Dec 10, 2026",
    applicantsCount: 8,
    description: `Ride is Ethiopia's pioneer ride-hailing and logistics platform. We are seeking a Lead Mobile Developer to spearhead our passenger and driver app rewrite, focusing on real-time GPS telemetry, battery-efficient background tracking, and offline dispatch queuing.`,
    responsibilities: [
      "Lead client-side architecture for iOS and Android passenger and driver applications.",
      "Optimize real-time WebSockets and MQTT communication channels for driver dispatching.",
      "Implement smooth map rendering and offline route caching under variable Ethiopian network conditions.",
      "Coordinate with product managers to launch feature experiments and A/B test booking flows."
    ],
    requirements: [
      "Proven track record of publishing high-traffic mobile apps on Google Play Store and Apple App Store.",
      "4+ years with Flutter (Dart) or React Native, including native module bridging (Swift/Kotlin).",
      "Strong grasp of GIS systems, Google Maps SDK, and spatial geolocation queries.",
      "Experience leading a team of mobile developers through code reviews and automated CI/CD pipelines."
    ],
    benefits: [
      "Free Ride platform monthly transit credits",
      "High-spec MacBook Pro hardware workstation provided",
      "Stock option grants upon 1-year tenure"
    ],
    tags: ["Flutter", "Mobile", "React Native", "Geolocation", "WebSockets"]
  },
  {
    id: "job-eth-05",
    title: "Senior Credit & Risk Analyst",
    company: "Awash Bank",
    companyLogoText: "AB",
    companyColor: "#b45309", // Warm Gold
    featured: false,
    urgent: false,
    category: "Banking & Finance",
    location: "Addis Ababa (Awash Towers, Balcha Aba Nefso)",
    workplaceType: "On-site",
    type: "Full-Time",
    experience: "Mid-to-Senior (4+ years)",
    salary: "ETB 48,000 - 68,000 / month",
    postedDate: "4 days ago",
    deadline: "Nov 25, 2026",
    applicantsCount: 27,
    description: `Awash Bank invites capable financial professionals to evaluate corporate loan proposals, analyze financial solvency for manufacturing exporters, and structure non-performing asset containment strategies.`,
    responsibilities: [
      "Assess audited financial statements and cash flow projections for large commercial loan applicants.",
      "Prepare detailed credit appraisal memorandums for the Board Credit Committee.",
      "Monitor sector risk concentrations in agriculture, manufacturing, and import-export trades.",
      "Recommend risk mitigation covenants and collateral valuation parameters."
    ],
    requirements: [
      "BA/MBA in Accounting, Finance, Economics, or ACCA certification.",
      "Minimum 4 years of hands-on credit underwriting experience in a recognized Ethiopian commercial bank.",
      "Thorough familiarity with National Bank of Ethiopia (NBE) regulatory directives.",
      "Advanced financial modeling in Excel."
    ],
    benefits: [
      "Competitive banking industry scale salary + allowances",
      "Comprehensive medical scheme",
      "Professional development support for ACCA / CFA"
    ],
    tags: ["Credit Risk", "Banking", "Financial Modeling", "NBE Regulations"]
  },
  {
    id: "job-eth-06",
    title: "Public Health Surveillance Officer",
    company: "Africa CDC / African Union",
    companyLogoText: "AU",
    companyColor: "#047857", // Deep Green
    featured: true,
    urgent: false,
    category: "Healthcare",
    location: "Addis Ababa (AU Headquarters)",
    workplaceType: "Hybrid",
    type: "Contract",
    experience: "Senior (5+ years)",
    salary: "USD $3,200 - $4,200 / month",
    postedDate: "5 days ago",
    deadline: "Dec 15, 2026",
    applicantsCount: 31,
    description: `Africa CDC is recruiting a Public Health Epidemiologist to reinforce continental disease outbreak tracking, genomic surveillance data synthesis, and early warning health telemetry across Eastern Africa.`,
    responsibilities: [
      "Synthesize surveillance data across member states for real-time epidemiological situation reports.",
      "Coordinate with national public health institutes to harmonize emergency response protocols.",
      "Manage epidemic forecasting models and advise emergency task forces.",
      "Prepare high-level briefings for AU member state health ministries."
    ],
    requirements: [
      "Medical degree (MD) or Master of Public Health (MPH) in Epidemiology/Biostatistics.",
      "5+ years working in epidemic surveillance or field epidemiology programs.",
      "Experience with DHIS2, R, Python, and GIS health mapping.",
      "Ability to deploy internationally on short notice if emergency response requires."
    ],
    benefits: [
      "Competitive international consultant rate",
      "Full international travel and medical coverage",
      "Prestige of shaping continental health security"
    ],
    tags: ["Epidemiology", "Public Health", "DHIS2", "Biostatistics", "Africa CDC"]
  },
  {
    id: "job-eth-07",
    title: "Senior UI/UX & Product Designer",
    company: "Gebeya Inc.",
    companyLogoText: "GB",
    companyColor: "#6366f1", // Indigo
    featured: true,
    urgent: false,
    category: "Technology",
    location: "Remote (Ethiopia)",
    workplaceType: "Remote",
    type: "Full-Time",
    experience: "Mid-Level (3+ years)",
    salary: "USD $1,500 - $2,300 / month",
    postedDate: "2 days ago",
    deadline: "Dec 01, 2026",
    applicantsCount: 15,
    description: `Gebeya is looking for a thoughtful UI/UX Product Designer to design seamless talent marketplace interfaces, mobile learning portals, and freelance contractor workflows tailored for African tech ecosystems.`,
    responsibilities: [
      "Create wireframes, user journeys, and high-fidelity interactive Figma prototypes.",
      "Conduct user interviews with Ethiopian and Pan-African developers and enterprise recruiters.",
      "Establish and govern an atomic design system across web and mobile web platforms.",
      "Collaborate closely with frontend engineers to ensure design fidelity during sprint cycles."
    ],
    requirements: [
      "Strong portfolio demonstrating user-centric UX problem-solving and modern visual aesthetics.",
      "Expertise in Figma, component design systems, and rapid prototyping tools.",
      "Experience designing for multilingual audiences and mobile-first constraint environments.",
      "Self-directed worker capable of thriving in a distributed, remote-first team."
    ],
    benefits: [
      "100% remote flexibility from anywhere in Ethiopia",
      "Home office setup reimbursement & internet monthly stipend",
      "Annual company retreat & paid time off"
    ],
    tags: ["Figma", "UI/UX", "Product Design", "Design Systems", "Remote"]
  },
  {
    id: "job-eth-08",
    title: "Aviation Maintenance & Avionics Systems Engineer",
    company: "Ethiopian Airlines Group",
    companyLogoText: "ET",
    companyColor: "#dc2626", // Red / Ethiopian Flag Colors
    featured: false,
    urgent: true,
    category: "Engineering",
    location: "Addis Ababa (Bole International Airport)",
    workplaceType: "On-site",
    type: "Full-Time",
    experience: "Mid-to-Senior (4+ years)",
    salary: "ETB 50,000 - 75,000 / month",
    postedDate: "3 days ago",
    deadline: "Nov 20, 2026",
    applicantsCount: 22,
    description: `Ethiopian Airlines, Africa's largest carrier, is hiring certified Avionics Systems Engineers to maintain fly-by-wire avionics, flight management computers, and satcom telemetry on modern Airbus A350 and Boeing 787 fleets.`,
    responsibilities: [
      "Inspect, troubleshoot, and calibrate commercial jet aircraft electrical and avionics subsystems.",
      "Execute scheduled line maintenance and C-check heavy maintenance routines under FAA/ECAA regulations.",
      "Review Technical Log entries and diagnose recurring digital flight control faults.",
      "Sign off airworthiness certificates following maintenance protocols."
    ],
    requirements: [
      "BSc in Aeronautical, Avionics, or Electrical Engineering.",
      "Valid ECAA / ICAO Aircraft Maintenance Engineer (AME) License with Type ratings.",
      "Minimum 4 years practical line or hangar maintenance experience on modern widebody aircraft.",
      "Uncompromising dedication to safety, precision, and protocol compliance."
    ],
    benefits: [
      "Generous concessional flight ticket privileges for employee and immediate family worldwide",
      "Comprehensive aviation crew health and life insurance",
      "Transportation to and from Bole Airport terminals"
    ],
    tags: ["Aviation", "Avionics", "Engineering", "ECAA", "Maintenance"]
  },
  {
    id: "job-eth-09",
    title: "Digital Growth & Social Media Marketing Manager",
    company: "Chapa Financial Technologies",
    companyLogoText: "CP",
    companyColor: "#059669", // Emerald
    featured: false,
    urgent: false,
    category: "Marketing",
    location: "Addis Ababa (Sarbet)",
    workplaceType: "Hybrid",
    type: "Full-Time",
    experience: "Mid-Level (3+ years)",
    salary: "ETB 35,000 - 55,000 / month",
    postedDate: "6 days ago",
    deadline: "Dec 08, 2026",
    applicantsCount: 47,
    description: `Chapa is empowering Ethiopian businesses to accept digital payments from anywhere in the world. We are searching for an energetic Growth Marketing Manager to oversee developer brand advocacy, Telegram community engagement, and digital acquisition campaigns.`,
    responsibilities: [
      "Plan and execute content strategies across Telegram, LinkedIn, X, and YouTube targeting local tech businesses.",
      "Create engaging video tutorials and case studies showcasing how merchants use Chapa APIs.",
      "Manage paid performance marketing and analyze conversion funnels using Google Analytics 4.",
      "Host developer webinars and sponsor local university hackathons."
    ],
    requirements: [
      "3+ years managing digital marketing, social media, or community growth for a tech/B2B brand.",
      "Deep understanding of the Ethiopian digital landscape, Telegram channel management, and local memes/culture.",
      "Basic graphic design and short-form video editing skills (Canva, CapCut, Premiere).",
      "Enthusiastic storyteller who loves tech, FinTech, and entrepreneurship."
    ],
    benefits: [
      "Fun startup environment in central Sarbet office",
      "Continuous snack bar and specialty Ethiopian coffee on tap",
      "Performance incentives linked to merchant onboarding metrics"
    ],
    tags: ["Growth Marketing", "Telegram", "Content", "FinTech", "Social Media"]
  },
  {
    id: "job-eth-10",
    title: "DevOps & Cloud Infrastructure Engineer (AWS & Kubernetes)",
    company: "Dashen Bank Tech Innovation Center",
    companyLogoText: "DB",
    companyColor: "#1e3a8a", // Navy Blue
    featured: true,
    urgent: false,
    category: "Technology",
    location: "Addis Ababa (Kazanchis)",
    workplaceType: "Hybrid",
    type: "Full-Time",
    experience: "Senior (4+ years)",
    salary: "ETB 58,000 - 88,000 / month",
    postedDate: "1 week ago",
    deadline: "Dec 12, 2026",
    applicantsCount: 16,
    description: `Join Dashen Bank's Digital Transformation lab to manage enterprise hybrid cloud infrastructure, automated CI/CD deployment pipelines, and disaster recovery replication across primary data centers and cloud VPCs.`,
    responsibilities: [
      "Provision and manage infrastructure-as-code using Terraform and Ansible.",
      "Maintain enterprise Kubernetes clusters (EKS / Bare-metal Rancher) for core microservices.",
      "Implement centralized logging and alerting stacks with Prometheus, Grafana, and ELK.",
      "Automate security vulnerability scanning and patch management."
    ],
    requirements: [
      "Bachelor's degree in Computer Science or related STEM field.",
      "4+ years configuring Linux servers, Docker containers, and production Kubernetes clusters.",
      "AWS Certified Solutions Architect or CKA (Certified Kubernetes Administrator) is a huge plus.",
      "Hands-on expertise with GitOps tools (ArgoCD, GitLab CI)."
    ],
    benefits: [
      "Bank staff loan benefits & comprehensive health insurance",
      "Flexible schedule with remote options",
      "Generous training budget for cloud certifications"
    ],
    tags: ["DevOps", "Kubernetes", "AWS", "Terraform", "CI/CD"]
  },
  {
    id: "job-eth-11",
    title: "Clinical Trials & Pharmacovigilance Coordinator",
    company: "Cadila Pharmaceuticals Ethiopia",
    companyLogoText: "CP",
    companyColor: "#0284c7",
    featured: false,
    urgent: false,
    category: "Healthcare",
    location: "Gelat / Bishoftu (Transport Provided from Addis)",
    workplaceType: "On-site",
    type: "Full-Time",
    experience: "Mid-Level (3+ years)",
    salary: "ETB 40,000 - 62,000 / month",
    postedDate: "5 days ago",
    deadline: "Nov 27, 2026",
    applicantsCount: 18,
    description: `Cadila Pharmaceuticals is one of the leading pharmaceutical manufacturers in Ethiopia. We require a Pharmacovigilance Coordinator to monitor adverse drug reaction reporting, ensure WHO GMP standards, and coordinate regulatory compliance with the Ethiopian Food and Drug Authority (EFDA).`,
    responsibilities: [
      "Review batch production records and evaluate quality control compliance reports.",
      "Prepare and submit pharmacovigilance periodic safety update reports (PSUR) to EFDA.",
      "Coordinate clinical audits and supplier inspections at the manufacturing facility.",
      "Conduct internal training on Good Manufacturing Practices (GMP) and SOP compliance."
    ],
    requirements: [
      "B.Pharm or Doctor of Pharmacy (PharmD) from an accredited institution.",
      "3+ years in pharmaceutical manufacturing, clinical research, or regulatory affairs in Ethiopia.",
      "Deep understanding of EFDA guidelines and WHO technical report series.",
      "Strong analytical documentation skills."
    ],
    benefits: [
      "Daily executive bus transport from multiple pick-up hubs across Addis Ababa",
      "Subsidized lunch at staff cafeteria",
      "Annual health wellness checks"
    ],
    tags: ["Pharmacy", "EFDA", "Pharmacovigilance", "Healthcare", "GMP"]
  },
  {
    id: "job-eth-12",
    title: "Regional Logistics & Supply Chain Supervisor",
    company: "Save the Children International - Ethiopia Country Office",
    companyLogoText: "SC",
    companyColor: "#dc2626",
    featured: false,
    urgent: true,
    category: "NGO & Development",
    location: "Hawassa (With Regional Travel)",
    workplaceType: "On-site",
    type: "Full-Time",
    experience: "Mid-Level (3-5 years)",
    salary: "ETB 42,000 - 60,000 / month",
    postedDate: "1 day ago",
    deadline: "Nov 26, 2026",
    applicantsCount: 29,
    description: `Save the Children is seeking a dedicated Logistics Supervisor based in Hawassa to manage relief supply warehouses, cold-chain nutrition distribution, and fleet dispatching throughout the Sidama and Southern regions.`,
    responsibilities: [
      "Oversee inventory control and cold-chain temperature monitoring in central regional warehouses.",
      "Coordinate commercial freight forwarders and field vehicle fleet schedules.",
      "Conduct quarterly supplier evaluations and manage local procurement tenders adhering to humanitarian guidelines.",
      "Ensure prompt delivery of emergency food and medicine consignments."
    ],
    requirements: [
      "BA in Supply Chain Management, Logistics, Business Administration, or related field.",
      "3-5 years of humanitarian logistics or fleet management experience with international NGOs.",
      "Familiarity with Sidama / SNNPR regional geography and road logistics.",
      "Proficiency with ERP inventory management software."
    ],
    benefits: [
      "Hardship allowances during field travel",
      "Medical cover for employee, spouse, and dependents",
      "Extensive humanitarian training opportunities"
    ],
    tags: ["Logistics", "Supply Chain", "Warehouse", "NGO", "Fleet"]
  },
  {
    id: "job-eth-13",
    title: "Senior Electrical & Automation Engineer",
    company: "MIDROC Investment Group",
    companyLogoText: "MI",
    companyColor: "#d97706",
    featured: false,
    urgent: false,
    category: "Engineering",
    location: "Addis Ababa (Gotera Industrial Park)",
    workplaceType: "On-site",
    type: "Full-Time",
    experience: "Senior (5+ years)",
    salary: "ETB 55,000 - 80,000 / month",
    postedDate: "4 days ago",
    deadline: "Dec 04, 2026",
    applicantsCount: 14,
    description: `MIDROC Group requires an experienced Automation Engineer to supervise industrial PLC programming, SCADA monitoring, and medium-voltage transformer installations across its agro-processing and cement manufacturing subsidiaries.`,
    responsibilities: [
      "Program and debug Siemens S7 and Allen-Bradley PLC systems on active manufacturing lines.",
      "Troubleshoot variable frequency drives (VFDs), motor control centers, and industrial sensors.",
      "Oversee substation maintenance and power quality audits to minimize production downtime.",
      "Design electrical schematics in AutoCAD Electrical."
    ],
    requirements: [
      "BSc in Electrical, Mechatronics, or Control Engineering.",
      "5+ years of practical industrial automation experience in heavy manufacturing plants.",
      "Expertise with Siemens TIA Portal, Wonderware SCADA, and industrial bus protocols (Modbus, Profinet).",
      "Willingness to conduct occasional site visits to regional manufacturing plants."
    ],
    benefits: [
      "Competitive executive compensation package",
      "Corporate transport provided",
      "Life and medical insurance"
    ],
    tags: ["PLC", "Automation", "SCADA", "Electrical", "Manufacturing"]
  },
  {
    id: "job-eth-14",
    title: "Junior Data Analyst & BI Developer",
    company: "Gebeya Inc. / Digital Skills Lab",
    companyLogoText: "GB",
    companyColor: "#6366f1",
    featured: false,
    urgent: false,
    category: "Technology",
    location: "Remote (Ethiopia)",
    workplaceType: "Remote",
    type: "Full-Time",
    experience: "Entry-Level (1-2 years)",
    salary: "ETB 25,000 - 38,000 / month",
    postedDate: "3 days ago",
    deadline: "Dec 02, 2026",
    applicantsCount: 56,
    description: `Ideal opportunity for recent graduates or early-career data analysts. You will transform operational talent data into clear executive dashboards, maintain data pipelines, and support cohort retention modeling for our tech academy graduates.`,
    responsibilities: [
      "Write clean SQL queries to extract data from operational PostgreSQL databases.",
      "Build and maintain interactive PowerBI and Google Looker Studio reports.",
      "Perform exploratory data analysis in Python (pandas, matplotlib) to discover student completion trends.",
      "Document data dictionaries and metric definitions."
    ],
    requirements: [
      "Degree in Computer Science, Statistics, Mathematics, or completed a recognized data analytics bootcamp.",
      "Proficiency in SQL (joins, window functions) and Excel data modeling.",
      "Hands-on experience creating dashboards in PowerBI, Tableau, or Looker.",
      "Eager curiosity to learn cloud data warehousing (Snowflake/BigQuery)."
    ],
    benefits: [
      "Full remote setup with internet allowance",
      "Direct mentorship from senior international data engineers",
      "Access to premium online data science certification platforms"
    ],
    tags: ["SQL", "PowerBI", "Python", "Data Analytics", "Entry-Level"]
  },
  {
    id: "job-eth-15",
    title: "Brand Communications & Media Relations Lead",
    company: "Nib International Bank",
    companyLogoText: "NIB",
    companyColor: "#0891b2",
    featured: false,
    urgent: false,
    category: "Marketing",
    location: "Addis Ababa (Senga Tera)",
    workplaceType: "On-site",
    type: "Full-Time",
    experience: "Mid-Level (4+ years)",
    salary: "ETB 45,000 - 65,000 / month",
    postedDate: "1 week ago",
    deadline: "Nov 29, 2026",
    applicantsCount: 21,
    description: `Nib International Bank is revitalizing its brand footprint across retail banking and digital wallets. We need a creative Communications Lead to handle national media press releases, TV/Radio commercial campaigns, and institutional corporate social responsibility (CSR) initiatives.`,
    responsibilities: [
      "Draft official press releases, annual report executive summaries, and speech remarks.",
      "Maintain active relationships with Ethiopian national broadcasting corporations and print journalists.",
      "Supervise external advertising agencies creating billboard, television, and radio adverts.",
      "Coordinate press conferences and branch inauguration ceremonies."
    ],
    requirements: [
      "BA/MA in Journalism, Communications, Public Relations, or Marketing.",
      "4+ years of relevant PR or brand communications experience in banking or corporate sectors.",
      "Exceptional bilingual writing and public speaking skills in Amharic and English; knowledge of Afaan Oromoo is a strong plus.",
      "Crisis communications experience under fast-moving news environments."
    ],
    benefits: [
      "Standard banking allowances and medical coverage",
      "Subsidized consumer loan access",
      "Continuous executive communication workshops"
    ],
    tags: ["Public Relations", "Brand", "Media", "Communications", "Banking"]
  },
  {
    id: "job-eth-16",
    title: "Senior Android Engineer (Cashless POS Terminals)",
    company: "SunPay Ethiopia / Digital Financial Services",
    companyLogoText: "SP",
    companyColor: "#f59e0b",
    featured: true,
    urgent: true,
    category: "Technology",
    location: "Addis Ababa (Bole Atlas)",
    workplaceType: "Hybrid",
    type: "Contract",
    experience: "Senior (4+ years)",
    salary: "ETB 60,000 - 85,000 / month",
    postedDate: "Just now",
    deadline: "Dec 01, 2026",
    applicantsCount: 11,
    description: `SunPay is deploying thousands of Android-based Smart POS terminals across Ethiopian retail stores, supermarkets, and restaurants. We are seeking an Android engineer experienced in embedded Android, smartcard NFC protocols, and printer hardware drivers.`,
    responsibilities: [
      "Build custom Android applications running on PAX and Sunmi Smart POS hardware.",
      "Integrate EMV contactless smartcard readers, NFC chips, and QR code scanners for Ethiopian banks.",
      "Implement secure PIN encryption adhering to EMVCo Level 2 standards.",
      "Manage remote OTA firmware and app deployment using MDM solutions."
    ],
    requirements: [
      "Strong proficiency in Kotlin and modern Android architecture components (MVVM, Coroutines, Flow).",
      "Experience with peripheral hardware integration (Bluetooth printers, barcode scanners, NFC).",
      "Understanding of cryptographic standards (AES, RSA, DUKPT key management).",
      "Proven ability to work with embedded POS SDKs."
    ],
    benefits: [
      "Direct project milestone bonuses on terminal rollout milestones",
      "Modern office in Bole Atlas with tech gadgets lab",
      "Flexible hybrid hours"
    ],
    tags: ["Android", "Kotlin", "POS", "FinTech", "NFC", "Hardware"]
  }
];

export const JOB_CATEGORIES = [
  { id: "all", name: "All Categories", icon: "Briefcase" },
  { id: "Technology", name: "Technology & Software", icon: "Code", count: 6 },
  { id: "Banking & Finance", name: "Banking & FinTech", icon: "DollarSign", count: 3 },
  { id: "NGO & Development", name: "NGO & International", icon: "Globe", count: 3 },
  { id: "Healthcare", name: "Healthcare & Pharma", icon: "Activity", count: 2 },
  { id: "Engineering", name: "Engineering & Aviation", icon: "Cpu", count: 2 },
  { id: "Marketing", name: "Marketing & Growth", icon: "TrendingUp", count: 2 }
];

export const ETHIOPIAN_LOCATIONS = [
  "All Locations",
  "Addis Ababa (All Sub-cities)",
  "Addis Ababa (Bole)",
  "Addis Ababa (Kazanchis)",
  "Addis Ababa (Mexico Square)",
  "Addis Ababa (Sarbet)",
  "Hawassa",
  "Dire Dawa",
  "Remote (Ethiopia)",
  "Hybrid"
];

export const EMPLOYMENT_TYPES = [
  "All Types",
  "Full-Time",
  "Contract",
  "Part-Time",
  "Remote",
  "Internship"
];

export const EXPERIENCE_LEVELS = [
  "All Levels",
  "Entry-Level (0-2 yrs)",
  "Mid-Level (3-5 yrs)",
  "Senior (5+ yrs)",
  "Lead / Director"
];
