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

export const projects = [
  {
    id: "leadsignal",
    slug: "leadsignal",
    category: "AI Platform",
    title: "LeadSignal",
    tagline: "AI-powered intent lead detection platform",
    description:
      "Built an intelligent lead generation platform that monitors Reddit and Twitter for buyer intent signals, scores leads using AI, and surfaces the best opportunities in real time.",
    problem:
      "Startups waste hours manually scanning social media for potential customers. Most leads are missed because the signal-to-noise ratio is too high for humans to filter effectively.",
    solution:
      "An automated pipeline that ingests thousands of posts, runs NLP-based intent scoring, and surfaces only high-intent leads with full context in a clean dashboard.",
    features: [
      "Reddit & Twitter real-time ingestion",
      "AI intent scoring (0–100)",
      "Lead filtering and categorization",
      "Dashboard with pipeline analytics",
      "Webhook & CRM export integrations",
    ],
    stack: ["Python", "Django", "Next.js", "PostgreSQL", "Redis", "OpenAI"],
    metrics: [
      { label: "Leads Processed", value: "50k+" },
      { label: "Avg Score Accuracy", value: "91%" },
      { label: "Time Saved / Week", value: "20h" },
    ],
    color: "#C6F432",
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
      "A multi-role SaaS platform giving every stakeholder—students, teachers, parents, admins—their own tailored dashboard with real-time data syncing.",
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
      "A dedicated Flutter app with BLE scanning, device pairing, encrypted authentication tokens, and live control panels — all with offline fallback.",
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
      "A single integrated platform that unifies customer data, stock levels, sales activity, and financial reporting — accessible from desktop and mobile.",
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
];

export const techStack = {
  Frontend: [
    { name: "Flutter", years: "4.5 yrs" },
    { name: "Next.js", years: "2 yrs" },
    { name: "React", years: "2 yrs" },
    { name: "TypeScript", years: "2 yrs" },
    { name: "TailwindCSS", years: "2 yrs" },
  ],
  Backend: [
    { name: "Django", years: "4 yrs" },
    { name: "Python", years: "4.5 yrs" },
    { name: "PostgreSQL", years: "3 yrs" },
    { name: "Firebase", years: "3 yrs" },
    { name: "REST APIs", years: "4 yrs" },
  ],
  Systems: [
    { name: "BLE / IoT", years: "2 yrs" },
    { name: "AI / LLMs", years: "1.5 yrs" },
    { name: "Automation", years: "2 yrs" },
    { name: "Celery / Redis", years: "2 yrs" },
    { name: "Docker", years: "2 yrs" },
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
    name: "Ahmed Raza",
    role: "CTO, Wi3bit",
    content:
      "Taimoor doesn't just write code—he thinks like a product engineer. He took our vague school management requirements and turned them into a system our clients genuinely love. Shipped on time, clean architecture.",
    rating: 5,
  },
  {
    name: "Sarah Mitchell",
    role: "Founder, TechOps SaaS",
    content:
      "Working with Taimoor on our automation platform was a great experience. He asked sharp questions up front, built exactly what we needed, and the codebase was clean enough that our team could pick it up immediately.",
    rating: 5,
  },
  {
    name: "James Park",
    role: "Lead Engineer, IoT Startup",
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
