export const services = [
  {
    id: "saas",
    icon: "Layers",
    title: "SaaS Platforms",
    description:
      "End-to-end SaaS products with auth, billing, multi-tenancy, and scalable backends. From idea to production.",
    tags: ["Next.js", "Django", "PostgreSQL"],
  },
  {
    id: "mobile",
    icon: "Smartphone",
    title: "Mobile Apps",
    description:
      "Cross-platform Flutter apps with polished UI, offline support, push notifications, and deep integrations.",
    tags: ["Flutter", "Firebase", "REST APIs"],
  },
  {
    id: "ai",
    icon: "Brain",
    title: "AI & Automation",
    description:
      "AI-powered pipelines, LLM integrations, intelligent scoring systems, and workflow automation tools.",
    tags: ["Python", "LangChain", "OpenAI"],
  },
  {
    id: "crm",
    icon: "Users",
    title: "CRM Systems",
    description:
      "Custom CRM platforms with lead management, sales pipelines, reporting dashboards, and team workflows.",
    tags: ["React", "Django", "PostgreSQL"],
  },
  {
    id: "dashboard",
    icon: "LayoutDashboard",
    title: "Dashboards",
    description:
      "Real-time analytics dashboards with charts, KPIs, data exports, and role-based access control.",
    tags: ["Next.js", "Recharts", "APIs"],
  },
  {
    id: "internal",
    icon: "Wrench",
    title: "Internal Tools",
    description:
      "Custom admin panels, internal operations tools, and automation systems that eliminate manual work.",
    tags: ["Next.js", "Django", "PostgreSQL"],
  },
];

export interface Project {
  id: string;
  slug: string;
  category: string;
  title: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  features: string[];
  stack: string[];
  metrics: { label: string; value: string }[];
  color: string;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    id: "deenroot",
    slug: "deenroot",
    category: "Islamic Tech / Systems & AI",
    title: "DeenRoot",
    tagline: "Free, ad-free Qur'an platform with a scripture-integrity guarantee enforced at the database layer",
    description:
      "A full-stack Islamic learning platform — Qur'an reading, Hadith study, prayer times, and a retrieval-grounded AI assistant — built solo on a Django/DRF backend and a Next.js frontend, where Postgres is the single source of truth and external content providers are never a request-time dependency.",
    problem:
      "Most Qur'an platforms either gate core content behind ads and subscriptions, or treat scripture like any other cached API response — one bad upstream payload away from silently serving corrupted text. Neither is acceptable when the data being served is the Qur'an: it has to stay free, and it has to be provably unable to change once stored.",
    solution:
      "Built a Django/DRF backend where every external read (Quran Foundation, AlQuran Cloud, Sunnah.com, Aladhan) goes through a sync engine, not a direct API call. A Redis-backed distributed lock collapses thundering-herd requests to a single upstream call; a per-provider circuit breaker skips a failing provider for a cooldown window instead of retrying into it; every request carries a hard 2-second ceiling before falling back to whatever Postgres already has, flagged partial, with a Celery task finishing the job in the background. Scripture immutability is enforced twice — once in an application-layer guard, once as a Postgres BEFORE UPDATE trigger that raises on the write even if the ORM guard is bypassed entirely.",
    features: [
      "114 surahs / 6,236 ayahs across 263 translation editions in 86 languages, plus tafsir, word-by-word study, and audio recitation",
      "RAG-grounded AI assistant that answers only from indexed platform content and flags ungrounded claims instead of guessing",
      "Redis-locked, circuit-breaker-guarded sync engine with a hard 2-second foreground timeout and background retry via Celery",
      "Scripture immutability enforced twice — application guard plus a Postgres trigger as backstop",
      "Personal library (bookmarks, notes, highlights, reading progress) and a full learning system (courses, quizzes, badges, certificates)",
      "Prayer times and Qibla direction, with Qibla computed locally — zero external calls",
    ],
    stack: [
      "Django",
      "DRF",
      "PostgreSQL",
      "Redis",
      "Celery",
      "Meilisearch",
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "RAG/LLM",
    ],
    metrics: [
      { label: "Ayahs Served", value: "6,236" },
      { label: "Hydration Ceiling", value: "<2s" },
      { label: "Translations / Languages", value: "263 / 86" },
    ],
    color: "#10B981",
    liveUrl: "https://deenroot.com",
  },
  {
    id: "student-portal",
    slug: "student-portal",
    category: "EdTech SaaS",
    title: "Student Portal System",
    tagline: "End-to-end school management platform",
    description:
      "A comprehensive school management system covering student portals, attendance tracking, assignments, grade reporting, and administrative dashboards for multi-school deployments.",
    problem:
      "Schools running on spreadsheets and paper lose hours each week on manual tracking. Teachers, parents, and admins work in silos with no unified system.",
    solution:
      "A multi-role SaaS platform giving every stakeholder—students, teachers, parents, admins—their own tailored dashboard with real-time data syncing. Attendance captured through biometric integration reflects instantly across every dashboard, while automated notifications and fee management close the loop on the manual work schools used to do by hand.",
    features: [
      "Attendance with biometric integration",
      "Assignment submission & grading",
      "Multi-role dashboards (student/teacher/admin)",
      "Automated notifications & reports",
      "Fee management & billing",
    ],
    stack: ["Flutter", "Django", "PostgreSQL", "Firebase", "REST APIs"],
    metrics: [
      { label: "Active Students", value: "2,000+" },
      { label: "Schools Deployed", value: "3" },
      { label: "Manual Work Reduced", value: "80%" },
    ],
    color: "#6DE7FF",
  },
  {
    id: "karwan-e-falah",
    slug: "karwan-e-falah",
    category: "Healthcare / NGO SaaS",
    title: "Karwan-e-Falah",
    tagline: "Charitable medical inventory and prescription dispatch system",
    description:
      "A centralized inventory database and real-time prescription synchronization network built to serve welfare clinics and charitable pharmacies with auditable ledger tracking.",
    problem:
      "Charitable pharmacy networks struggle with tracking medicine donations, preventing distribution leaks, and verifying patient prescriptions across multiple medical units, leading to high administrative overhead and manual auditing errors.",
    solution:
      "A centralized Django/Daphne platform utilizing WebSockets (Channels) for real-time prescription dispatching to dispensary queues, and a background task worker (Celery) to manage double-entry ledger audits for every tablet dispensed. The result: a 5,000+ SKU medicine catalog synced across nodes in under 100ms, removing roughly 15 hours of manual auditing from staff workload each week.",
    features: [
      "5,000+ SKU medicine database integration",
      "Real-time patient prescription dispatch queues",
      "Celery background workers for inventory audits",
      "Automated PDF reports and ledger exporting via ReportLab",
      "Multi-tenant clinic and pharmacy nodes management",
    ],
    stack: ["Django", "Python", "Channels", "Celery", "PostgreSQL", "Redis", "ReportLab"],
    metrics: [
      { label: "SKUs Managed", value: "5,000+" },
      { label: "Sync Latency", value: "<100ms" },
      { label: "Auditing Hours Saved", value: "15h/wk" },
    ],
    color: "#FF5E5B",
  },
  {
    id: "ble-iot",
    slug: "ble-iot",
    category: "IoT / Mobile",
    title: "BLE IoT Support App",
    tagline: "Flutter app for BLE device authentication and control",
    description:
      "A Flutter mobile application that communicates with ESP32 microcontrollers over Bluetooth Low Energy, handling secure device authentication, real-time status, and remote controls.",
    problem:
      "Field technicians needed a reliable mobile interface to configure and authenticate BLE-connected hardware without complex tooling or physical access ports.",
    solution:
      "A dedicated Flutter app with BLE scanning, device pairing, encrypted authentication tokens, and live control panels — all with offline fallback. In production, it pairs with 15+ device variants at a 99% success rate, with authentication completing in under 200ms per connection.",
    features: [
      "BLE scanning and auto-pairing",
      "ESP32 firmware communication",
      "Encrypted device authentication",
      "Real-time device status & controls",
      "Push notification alerts",
    ],
    stack: ["Flutter", "Dart", "BLE/ESP32", "Firebase", "Python"],
    metrics: [
      { label: "Devices Supported", value: "15+" },
      { label: "Pairing Success Rate", value: "99%" },
      { label: "Auth Latency", value: "<200ms" },
    ],
    color: "#FF6B3D",
  },
  {
    id: "crm-inventory",
    slug: "crm-inventory",
    category: "Business SaaS",
    title: "CRM & Inventory System",
    tagline: "Unified CRM with inventory and sales reporting",
    description:
      "A full-featured CRM platform combining contact management, inventory tracking, sales pipeline, invoicing, and role-based access for SMEs in retail and distribution.",
    problem:
      "Small businesses using separate tools for CRM, inventory, and reporting lost data consistency and wasted time reconciling systems manually.",
    solution:
      "A single integrated platform that unifies customer data, stock levels, sales activity, and financial reporting — accessible from desktop and mobile. Across a 5,000+ SKU catalog and 500+ tracked sales cycles, consolidating reporting into one system cut report-generation time by roughly 70%.",
    features: [
      "Contact & lead management",
      "Inventory tracking with low-stock alerts",
      "Sales pipeline and forecasting",
      "Invoicing and payment tracking",
      "Role-based access (admin/sales/warehouse)",
    ],
    stack: ["Flutter", "Django", "PostgreSQL", "REST APIs", "Celery"],
    metrics: [
      { label: "SKUs Managed", value: "5,000+" },
      { label: "Sales Cycles Tracked", value: "500+" },
      { label: "Reporting Time", value: "-70%" },
    ],
    color: "#a855f7",
  },
  {
    id: "django-upgrade",
    slug: "django-upgrade",
    category: "System Upgrade",
    title: "Django Enterprise Legacy Upgrade",
    tagline: "Upgraded legacy Django 2.x platform to Django 5.x",
    description:
      "A complete modernization of an enterprise application, migrating the entire legacy system from Django 2.x to Django 5.x, updating dependencies, query optimizations, and database structures.",
    problem:
      "A business was locked in Django 2.x, facing security vulnerabilities, deprecated package conflicts, slow query performance, and compatibility blocks with modern Python runtimes.",
    solution:
      "A phased migration strategy that refactored deprecated APIs, upgraded custom database routing, resolved packages compatibility issues, and optimized SQL transactions to work smoothly with Django 5.x. The migration resolved 100% of the flagged security risk and delivered a 35% performance gain on the optimized query paths, with zero downtime.",
    features: [
      "Zero-downtime database migration path",
      "Refactoring deprecated ORM API query layers",
      "Upgrade to Python 3.12 compatibility",
      "Implementation of modern middleware & security headers",
      "CI/CD pipeline upgrade with automated test suites",
    ],
    stack: ["Django 5.x", "Python 3.12", "PostgreSQL", "CI/CD", "Docker"],
    metrics: [
      { label: "Django Version", value: "2.x → 5.x" },
      { label: "Security Risk Resolved", value: "100%" },
      { label: "Performance Gain", value: "+35%" },
    ],
    color: "#6DE7FF",
  },
];

export const techStack = {
  Frontend: [
    { name: "Flutter", years: "5 yrs" },
    { name: "Dart", years: "5 yrs" },
    { name: "Next.js", years: "2 yrs" },
    { name: "React", years: "2 yrs" },
    { name: "TypeScript", years: "2 yrs" },
    { name: "HTML5 & CSS3", years: "5 yrs" },
  ],
  Backend: [
    { name: "Django", years: "5 yrs" },
    { name: "Python", years: "5 yrs" },
    { name: "PostgreSQL", years: "3 yrs" },
    { name: "Firebase", years: "3 yrs" },
    { name: "REST APIs", years: "5 yrs" },
    { name: "Celery & Redis", years: "2 yrs" },
  ],
  Systems: [
    { name: "BLE / IoT", years: "2 yrs" },
    { name: "ESP32 & STM Firmware", years: "2 yrs" },
    { name: "AI / LLM Integrations", years: "1.5 yrs" },
    { name: "Docker", years: "2 yrs" },
    { name: "CI / CD Pipelines", years: "2.5 yrs" },
  ],
};

export const process = [
  {
    step: "01",
    title: "Discovery",
    description:
      "Deep dive into your business goals, users, and technical constraints. Defining the problem before writing a single line of code.",
  },
  {
    step: "02",
    title: "Planning",
    description:
      "Architecture decisions, tech stack selection, feature prioritization, and milestone planning. Aligned on paper before execution.",
  },
  {
    step: "03",
    title: "Development",
    description:
      "Iterative builds with clean, documented code. Regular check-ins and previews so you can see progress in real time.",
  },
  {
    step: "04",
    title: "Testing",
    description:
      "Unit testing, integration testing, and QA across devices and edge cases. No surprises in production.",
  },
  {
    step: "05",
    title: "Deployment",
    description:
      "CI/CD pipelines, cloud infrastructure setup, monitoring configuration, and zero-downtime launches.",
  },
  {
    step: "06",
    title: "Scaling",
    description:
      "Post-launch support, performance optimization, and feature expansion. Building for growth, not just launch.",
  },
];

export const testimonials = [
  {
    name: "Salik Sheraz",
    role: "CTO",
    content:
      "Taimoor doesn't just write code—he thinks like a product engineer. He took our vague school management requirements and turned them into a system our clients genuinely love. Shipped on time, clean architecture.",
    rating: 5,
  },
  {
    name: "Sarah Mitchell",
    role: "Founder",
    content:
      "Working with Taimoor on our automation platform was a great experience. He asked sharp questions up front, built exactly what we needed, and the codebase was clean enough that our team could pick it up immediately.",
    rating: 5,
  },
  {
    name: "Malik",
    role: "Lead Engineer",
    content:
      "The BLE mobile app he built for us handled some tricky edge cases around device pairing that other developers had given up on. Deep technical knowledge combined with clear communication throughout.",
    rating: 5,
  },
];

export const fullServices = [
  {
    id: "mvp",
    title: "MVP Development",
    tagline: "From idea to launch in weeks, not months.",
    description:
      "I help startups validate their core product hypothesis fast. You get a production-ready MVP — not a prototype — with real architecture that can scale when you need it.",
    benefits: [
      "Production-ready from day one",
      "Lean feature set, zero bloat",
      "Architecture that scales post-launch",
      "Fast iteration on feedback",
    ],
    deliverables: [
      "Full web or mobile application",
      "Backend API and database",
      "Authentication and user management",
      "Deployment on your infrastructure",
      "30-day post-launch support",
    ],
    stack: ["Next.js", "Django", "Flutter", "PostgreSQL", "Firebase"],
  },
  {
    id: "saas",
    title: "SaaS Development",
    tagline: "End-to-end SaaS products built to scale.",
    description:
      "Full SaaS platform development covering multi-tenancy, subscription billing, team management, and analytics. Built for growth.",
    benefits: [
      "Multi-tenant architecture",
      "Subscription billing ready",
      "Admin & customer dashboards",
      "Role-based access control",
    ],
    deliverables: [
      "Complete SaaS application",
      "Billing integration (Stripe)",
      "Multi-tenant database design",
      "Analytics dashboard",
      "API documentation",
    ],
    stack: ["Next.js", "Django", "PostgreSQL", "Stripe", "Redis"],
  },
  {
    id: "mobile",
    title: "Mobile App Development",
    tagline: "Cross-platform apps with native-quality UX.",
    description:
      "Flutter-based mobile apps for iOS and Android. Fast, beautiful, and production-ready with all the integrations you need.",
    benefits: [
      "Single codebase, both platforms",
      "Native performance",
      "Offline-first capability",
      "Push notifications & deep linking",
    ],
    deliverables: [
      "Flutter iOS & Android app",
      "Backend API integration",
      "App Store / Play Store submission",
      "Firebase / cloud integration",
      "Source code and documentation",
    ],
    stack: ["Flutter", "Dart", "Firebase", "REST APIs", "Django"],
  },
  {
    id: "ai",
    title: "AI Systems",
    tagline: "Intelligent automation that works in production.",
    description:
      "LLM integrations, AI pipelines, intent detection, content generation, and intelligent automation — built for real business workflows.",
    benefits: [
      "LLM integration (OpenAI, Anthropic)",
      "Custom fine-tuning when needed",
      "Cost-optimized inference",
      "Human-in-the-loop workflows",
    ],
    deliverables: [
      "AI pipeline architecture",
      "LLM integration and prompt engineering",
      "Data ingestion and processing",
      "Monitoring and evaluation",
      "API endpoints for frontend consumption",
    ],
    stack: ["Python", "LangChain", "OpenAI", "PostgreSQL", "Celery"],
  },
  {
    id: "automation",
    title: "Automation Workflows",
    tagline: "Eliminate repetitive work with smart automation.",
    description:
      "Custom automation systems that connect your tools, process data, and trigger actions — without human intervention.",
    benefits: [
      "Tool and API integrations",
      "Scheduled and event-driven tasks",
      "Error handling and notifications",
      "Audit logs and monitoring",
    ],
    deliverables: [
      "Automation workflow design",
      "Integration with existing tools",
      "Background task processing",
      "Notification and alerting system",
      "Documentation and runbooks",
    ],
    stack: ["Python", "Celery", "Redis", "Zapier APIs", "Django"],
  },
  {
    id: "dashboard",
    title: "Dashboards & Analytics",
    tagline: "Turn your data into decisions.",
    description:
      "Real-time dashboards with interactive charts, KPIs, cohort analysis, exports, and role-based access for teams.",
    benefits: [
      "Real-time data visualization",
      "Custom KPIs and metrics",
      "Export to CSV/PDF",
      "Role-based data access",
    ],
    deliverables: [
      "Dashboard UI and components",
      "Data pipeline from source",
      "Chart and visualization library",
      "Report generation",
      "Access control system",
    ],
    stack: ["Next.js", "Recharts", "Django", "PostgreSQL", "REST APIs"],
  },
];
