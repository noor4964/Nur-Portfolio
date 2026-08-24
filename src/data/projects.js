/* ─────────────────────────────────────────────
   PROJECTS — the single source of truth for the
   Projects page, Home "selected work" section and
   each case-study page (/projects/<slug>).

   HOW TO ADD / EDIT A PROJECT
   ────────────────────────────────────────────
   1. Copy the TEMPLATE block at the bottom of this file.
   2. Fill in every field (fields marked optional can be
      deleted or left as empty strings/arrays).
   3. `slug` becomes the URL: slug "deepdetect" → /projects/deepdetect
      Use lowercase-with-dashes, keep it unique.
   4. `category` drives the filter chips on the Projects page.
      Reuse an existing category name OR invent a new one —
      new categories appear automatically in the filter row.
   5. `role` is your part in the project (shown under the
      title in grids and on the case-study page).
   6. `image` (optional) — path to a cover shot in /public,
      e.g. image: "/projects/deepdetect.jpg". Leave it out and
      a clean numbered placeholder block is shown instead.
   7. `context`, `outcome`, `learnings` (optional) — short
      case-study paragraphs. Only write what is true for the
      project; sections are hidden when a field is missing.
   8. `featured: true` shows the project large at the top of
      the Work page and in the Home "selected work" strip.
   ───────────────────────────────────────────── */

export const PROJECTS = [
  {
    slug: "deepdetect",
    title: "DeepDetect",
    tagline: "Deepfake Detection System",
    role: "ML Engineer & Researcher",
    category: "AI / ML",
    year: "2025",
    status: "Ongoing · Thesis work",
    summary:
      "Hybrid EfficientNet + Vision Transformer pipeline with progressive layer unfreezing for binary deepfake classification.",
    problem:
      "Synthetic media is becoming increasingly difficult to distinguish from authentic content. Models trained on a single architecture or dataset can easily learn compression artifacts rather than meaningful manipulation patterns, limiting their ability to generalise to unseen data.",
    approach:
      "I combined an EfficientNet convolutional backbone with a Vision Transformer to capture both local texture patterns and global relationships across facial regions. Progressive layer unfreezing and staged fine-tuning were used to keep transfer learning stable, while single-backbone models provided controlled baselines for comparison.",
    context:
      "Developed as my B.Sc. thesis project at AIUB using a large-scale deepfake dataset and university GPU resources.",
    outcome:
      "The hybrid architecture became the foundation of my thesis work, with related research manuscripts progressing through peer review.",
    learnings:
      "The strongest gains came from disciplined training schedules and dataset auditing rather than simply increasing model complexity. Progressive unfreezing played a particularly important role in maintaining stable transfer learning.",
    features: [
      "Hybrid CNN + Vision Transformer architecture",
      "Progressive layer unfreezing",
      "Staged transfer learning and fine-tuning",
      "Benchmarking against single-backbone models",
      "Large-scale deepfake dataset evaluation",
      "Built as a B.Sc. thesis project",
    ],
    stack: [
      "Python",
      "PyTorch",
      "EfficientNet",
      "Vision Transformer",
      "OpenCV",
    ],
    metrics: [
      { label: "Backbones compared", value: "3+" },
      { label: "Training strategy", value: "Staged" },
    ],
    links: {
      repo: "https://github.com/noor4964",
      demo: "",
    },
    image: "/projects/deepfake.jpg",
    featured: true,
  },
  {
    slug: "universal-shop-management-system",
    title: "Universal Shop Management System",
    tagline: "Multi-Warehouse Retail Management Platform",
    role: "Full-Stack Engineer",
    category: "Full-Stack / Enterprise Software",
    year: "2026",
    status: "Completed",
    summary:
      "A full-stack back-office platform for retail businesses covering inventory, warehouses, purchasing, sales, payments, installments, expenses, and financial reporting.",
    problem:
      "Retail businesses often manage inventory, sales, supplier balances, customer dues, and expenses through disconnected tools or spreadsheets. This makes it difficult to maintain accurate stock and understand the financial state of the business from a single source of truth.",
    approach:
      "I built a modular full-stack system with a NestJS API, Next.js dashboard, PostgreSQL database, and Prisma ORM. The domain model connects products, warehouse stock, purchases, sales, payments, installment contracts, expenses, and reporting into a unified operational workflow.",
    context:
      "Designed for electronics, furniture, hardware, appliance, and general retail businesses that need centralized management across multiple warehouses.",
    outcome:
      "The platform brings day-to-day retail operations into a single system, with role-based access, warehouse-level inventory tracking, financial reporting, audit logging, and automated low-stock and overdue checks.",
    learnings:
      "The main engineering challenge was maintaining consistency between inventory and financial operations. Treating stock movements, purchases, invoices, payments, dues, and installments as connected domain workflows made the system considerably more reliable than implementing them as isolated CRUD features.",
    features: [
      "Owner and Manager role-based authentication",
      "Multi-warehouse inventory management",
      "Product variants, categories, and brands",
      "Supplier purchasing and supplier dues",
      "Sales invoices and customer payments",
      "Warehouse-to-warehouse stock transfers",
      "Installment and EMI payment schedules",
      "Expense management and categorisation",
      "Sales, cash flow, profit & loss, and stock reports",
      "Customer and supplier ledger reports",
      "Audit logging and soft deletion",
      "Automated low-stock and overdue checks",
    ],
    stack: [
      "TypeScript",
      "NestJS",
      "Next.js",
      "PostgreSQL",
      "Prisma",
      "Docker",
      "JWT",
      "Nginx",
    ],
    metrics: [
      { label: "Business modules", value: "10+" },
      { label: "Warehousing", value: "Multi-site" },
    ],
    links: {
      repo: "https://github.com/noor4964/universal-shop-management-system",
      demo: "",
    },
    image: "/projects/universalshop.jpg",
    featured: true,
  },
  {
    slug: "saas-billing-engine",
    title: "SaaS Billing Engine",
    tagline: "Multi-Tenant Usage-Based Billing Infrastructure",
    role: "Backend Engineer",
    category: "Backend / SaaS Infrastructure",
    year: "2026",
    status: "MVP",
    summary:
      "Secure multi-tenant billing infrastructure that ingests usage events, prevents double billing, aggregates spend, and generates invoice previews.",
    problem:
      "Usage-based SaaS products need to process potentially repeated events while maintaining accurate tenant isolation and billing calculations. A retry, duplicate request, or incorrect tenant context can result in incorrect charges and serious data-isolation problems.",
    approach:
      "I designed a service architecture around NestJS, PostgreSQL, Redis, BullMQ, Prisma, and a Next.js dashboard. Usage events pass through JWT-based tenant authentication, Redis idempotency checks, and durable PostgreSQL uniqueness constraints before being aggregated into usage and spend views.",
    context:
      "Built as a backend-focused SaaS infrastructure project exploring multi-tenancy, usage metering, billing logic, background processing, and database-level security.",
    outcome:
      "The system provides a working foundation for tenant provisioning, subscriptions, metered usage ingestion, spend calculation, and invoice previews while establishing a clear path toward higher-throughput event processing and production billing workflows.",
    learnings:
      "Reliable billing requires defense in depth. Redis provides a fast idempotency layer, but correctness ultimately comes from a durable database constraint. PostgreSQL Row-Level Security also provides an important second line of defense for tenant isolation.",
    features: [
      "Multi-tenant architecture",
      "Usage-based pricing and metering",
      "Subscription and pricing plan management",
      "Redis-backed idempotency",
      "PostgreSQL Row-Level Security",
      "Tenant-aware database transactions",
      "BullMQ background workers",
      "Usage and spend aggregation",
      "Invoice preview generation",
      "Next.js analytics dashboard",
    ],
    stack: [
      "TypeScript",
      "NestJS",
      "PostgreSQL",
      "Redis",
      "BullMQ",
      "Prisma",
      "Next.js",
      "Docker",
      "JWT",
    ],
    metrics: [
      { label: "Tenant isolation", value: "RLS" },
      { label: "Event protection", value: "2-layer" },
    ],
    links: {
      repo: "https://github.com/noor4964/saas-billing-engine",
      demo: "",
    },
    image: "/projects/saasbill.jpg",
    featured: true,
  },
  {
    slug: "flutter-chat-app",
    title: "Flutter Chat App",
    tagline: "Cross-Platform Real-Time Communication Platform",
    role: "Flutter Developer",
    category: "Mobile / Real-Time Systems",
    year: "2025",
    status: "Completed",
    summary:
      "A cross-platform communication application combining real-time messaging, voice and video calling, media sharing, social features, and Firebase-backed authentication.",
    problem:
      "Modern communication apps need to combine instant messaging, media, calling, notifications, identity, and privacy features without sacrificing usability across different devices and screen sizes.",
    approach:
      "I built the application around Flutter with Provider-based state management and Firebase services for authentication, Firestore messaging, cloud storage, notifications, and backend functionality. Agora handles voice and video calling, while the interface adapts across mobile and desktop environments.",
    context:
      "Developed as a multi-platform communication product targeting Android, iOS, web, Windows, Linux, and macOS from a shared Flutter codebase.",
    outcome:
      "The resulting application combines messaging, group conversations, media sharing, calling, social feeds, connection management, notifications, and privacy controls in one cross-platform experience.",
    learnings:
      "Real-time applications require more than simply delivering messages. State synchronization, message status, offline behaviour, notification handling, media management, and responsive layouts all need to work together to make communication feel instantaneous and dependable.",
    features: [
      "Real-time Firebase Firestore messaging",
      "Voice and video calling with Agora",
      "Group conversations",
      "Image, video, and file sharing",
      "Push notifications",
      "Social feed",
      "Firebase authentication",
      "Connection and contact management",
      "Typing and message status indicators",
      "Offline support",
      "Light and dark themes",
      "Privacy and notification controls",
      "Cross-platform responsive interface",
    ],
    stack: [
      "Flutter",
      "Dart",
      "Firebase",
      "Cloud Firestore",
      "Firebase Authentication",
      "Firebase Cloud Messaging",
      "Firebase Storage",
      "Agora",
      "Provider",
    ],
    metrics: [
      { label: "Target platforms", value: "6+" },
      { label: "Communication modes", value: "3" },
    ],
    links: {
      repo: "https://github.com/noor4964/Flutter-Chat-App",
      demo: "https://flutter-chat-app-e52b5.web.app/",
    },
    image: "/projects/chatify.jpg",
    featured: true,
  },
  {
    slug: "gym-management-system",
    title: "Gym Management System",
    tagline: "Role-Based Gym Operations Platform",
    role: "Full-Stack / Desktop Developer",
    category: "Desktop Application",
    year: "2024",
    status: "Completed",
    summary:
      "A Windows desktop management system for coordinating gym members, trainers, nutritionists, service staff, memberships, attendance, fitness plans, and billing.",
    problem:
      "Gym operations involve several different user roles and interconnected workflows. Members need access to their schedules and progress, while staff need tools for managing accounts, attendance, training plans, nutrition, and payments.",
    approach:
      "I developed a Windows Forms application with role-specific interfaces backed by Microsoft SQL Server. The system separates functionality by user role while keeping member profiles, attendance, fitness plans, nutrition guidance, and operational data connected through a central database.",
    context:
      "Built as a desktop-based gym management solution supporting members, managers, trainers, nutritionists, and service staff.",
    outcome:
      "The system provides a unified operational environment where different gym roles can manage their responsibilities while members can access personalized fitness and profile information.",
    learnings:
      "Designing role-specific workflows taught me how important it is to keep complex operational systems simple for each type of user. The same underlying data can require very different interfaces depending on the user's responsibilities.",
    features: [
      "Multi-role authentication and dashboards",
      "Member profile management",
      "BMI tracking",
      "Attendance monitoring",
      "Personalized workout routines",
      "Personalized diet plans",
      "Trainer and nutritionist workflows",
      "Service staff management",
      "Manager-level account management",
      "Billing and Bkash payment workflows",
      "Member profile picture upload",
      "Dynamic MSSQL-backed data management",
    ],
    stack: [
      "C#",
      ".NET",
      "Windows Forms",
      "Microsoft SQL Server",
      "MSSQL",
    ],
    metrics: [
      { label: "User roles", value: "5" },
      { label: "Core domains", value: "6+" },
    ],
    links: {
      repo: "https://github.com/noor4964/GymManagementSystem_C_Sharp",
      demo: "",
    },
    image: "/projects/gymmanage.jpg",
    featured: false,
  },
  {
    slug: "library-management-system",
    title: "Library Management System",
    tagline: "Full-Stack Library Operations Platform",
    role: "Full-Stack Engineer",
    category: "Full-Stack / Web Application",
    year: "2026",
    status: "Completed",
    summary:
      "A full-stack library management application with a NestJS API and Next.js frontend for managing users, books, and borrowing workflows.",
    problem:
      "Library operations require reliable coordination between users, book records, and borrowing transactions. A centralized web application can reduce manual tracking while giving staff a consistent interface for managing the collection and circulation process.",
    approach:
      "I structured the application as separate API and frontend applications. The backend uses NestJS with TypeORM and PostgreSQL, JWT-based authentication, validation, Swagger documentation, and email capabilities. The frontend is built with Next.js and React with Axios-based API communication and responsive styling.",
    context:
      "Built as a full-stack web application with a dedicated NestJS backend and Next.js frontend, providing a foundation for library administration and book circulation.",
    outcome:
      "The project establishes a clean separation between the API and user interface while covering the core library domains of authentication, users, books, and borrowing.",
    learnings:
      "Separating the frontend from the backend made the application easier to reason about and provides a stronger foundation for evolving the system. Explicit API boundaries also make authentication, validation, and business workflows easier to maintain.",
    features: [
      "JWT-based authentication",
      "User management",
      "Book management",
      "Book borrowing workflows",
      "REST API architecture",
      "API validation",
      "Swagger API documentation",
      "Email integration",
      "Dedicated frontend and backend applications",
      "End-to-end testing structure",
    ],
    stack: [
      "TypeScript",
      "NestJS",
      "Next.js",
      "React",
      "PostgreSQL",
      "TypeORM",
      "JWT",
      "Axios",
      "Tailwind CSS",
    ],
    metrics: [
      { label: "Core domains", value: "4+" },
      { label: "Architecture", value: "Full-stack" },
    ],
    links: {
      repo: "https://github.com/noor4964/Library-Management-System",
      demo: "",
    },
    image: "/projects/library.jpg",
    featured: false,
  },
  {
    slug: "online-classroom-management",
    title: "Online Classroom Management",
    tagline: "Web-Based Classroom Management System",
    role: "Web Developer",
    category: "Web Application",
    year: "2025",
    status: "Completed",
    summary:
      "A PHP-based web application structured around an application layer, public assets, and upload management for online classroom workflows.",
    problem:
      "Online classroom systems need a straightforward way to organize learning-related workflows and digital resources while keeping the interface and server-side application logic easy to maintain.",
    approach:
      "I built the project as a PHP web application with a clear separation between application logic, public assets, and uploaded content. The repository is intentionally lightweight, focusing on the core application structure rather than a large frontend framework.",
    context:
      "Developed as a web-based classroom management project, with the application organized around PHP server-side functionality and web assets.",
    outcome:
      "The project provides a compact foundation for classroom-oriented web workflows and demonstrates experience building server-rendered PHP applications and organizing application resources.",
    learnings:
      "Working with a lightweight PHP architecture reinforced the value of keeping application responsibilities separated and maintaining a simple project structure when a large frontend stack is unnecessary.",
    features: [
      "PHP-based web application",
      "Structured application layer",
      "Public web assets",
      "File upload handling",
      "Server-side application architecture",
    ],
    stack: [
      "PHP",
      "HTML",
      "CSS",
      "JavaScript",
    ],
    metrics: [
      { label: "Architecture", value: "Server-side" },
      { label: "Primary stack", value: "PHP" },
    ],
    links: {
      repo: "https://github.com/noor4964/online-classroom-management",
      demo: "",
    },
    image: "/projects/classroom.jpg",
    featured: false,
  },
];

/* ═══════════ TEMPLATE — copy me! ═══════════
{
  slug: "my-project",
  title: "My Project",
  tagline: "One-line what it is",
  role: "Lead Developer",          // your part in the project
  category: "Full-Stack",         // any label; new labels auto-create filters
  year: "2026",
  status: "Completed",            // e.g. Completed | Ongoing | MVP
  summary: "1–2 sentences shown on cards.",
  problem: "What problem did it solve?",
  approach: "How did you solve it? Tech decisions, architecture…",
  context: "When/why/for whom it was built.",   // optional
  outcome: "What exists because of the work.",  // optional
  learnings: "What you took away from it.",     // optional
  features: ["Highlight 1", "Highlight 2"],
  stack: ["React", "Node.js"],
  metrics: [{ label: "Users", value: "500+" }],   // optional — delete if none
  links: { repo: "https://github.com/…", demo: "" }, // either can be ""
  image: "/projects/my-project.jpg",              // optional cover shot in /public
  featured: false,                // true → large layout on Work + Home strip
},
═══════════════════════════════════════════ */

export const getProjectBySlug = (slug) =>
  PROJECTS.find((p) => p.slug === slug);

export const getFeaturedProjects = () =>
  PROJECTS.filter((p) => p.featured);

export const getProjectCategories = () => {
  const counts = new Map();
  PROJECTS.forEach((p) =>
    counts.set(p.category, (counts.get(p.category) || 0) + 1)
  );
  return Array.from(counts.entries()).map(([name, count]) => ({
    name,
    count,
  }));
};

export const getAdjacentProjects = (slug) => {
  const idx = PROJECTS.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? PROJECTS[idx - 1] : null,
    next: idx < PROJECTS.length - 1 ? PROJECTS[idx + 1] : null,
  };
};
