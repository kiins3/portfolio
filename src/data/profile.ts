export const profile = {
  name: "Tran Hai Dang",
  role: "Backend Developer",
  location: "Hanoi, Vietnam",
  email: "tranhaidang1128@gmail.com",
  github: "https://github.com/kiins3",
  summary:
    "Backend developer working mostly in Java and Spring Boot, with internship experience across Node.js and Python/FastAPI. I like turning business rules into clear, well-tested APIs: authentication and access control, relational data, caching, queues and background jobs.",
};

export type Experience = {
  company: string;
  place: string;
  title: string;
  period: string;
  points: string[];
  stack: string[];
};

export const experience: Experience[] = [
  {
    company: "SmartInvest Securities",
    place: "Hanoi",
    title: "Data and AI Applications Trainee",
    period: "07/2026 – now",
    points: [
      "Contributed to an AI financial research platform that ingests PDF reports and uses LLMs to generate and review analyses.",
      "Shipped features on the company's Next.js/TypeScript web app: a research report library, Market Insights data stamps and a role-gated client cleanup tool.",
      "Completed 100+ FastAPI/PostgreSQL tasks through GitLab code review: pagination, job queues, row-level security, triggers, logging and pytest suites.",
    ],
    stack: ["Python", "FastAPI", "PostgreSQL", "Next.js", "TypeScript", "LLM"],
  },
  {
    company: "ROSYY Inc.",
    place: "United States · Remote",
    title: "Fullstack Developer Intern",
    period: "06/2026 – now",
    points: [
      "Built backend features for an AI mental-health coaching app: booking, coach onboarding, chat and admin tools.",
      "Integrated Stripe payments and coach payouts; built OpenAI-based session grading that alerts the team to risk cues.",
      "Built matching screens in Next.js, React and Flutter; deployed to Google Cloud Run with Docker. 150+ commits across 4 repositories.",
    ],
    stack: ["Node.js", "Express", "TypeScript", "Supabase", "Stripe", "Cloud Run"],
  },
  {
    company: "SmartInvest Securities",
    place: "Hanoi",
    title: "Backend Developer Intern",
    period: "09/2025 – 03/2026",
    points: [
      "Worked with the R&D team to turn financial business requirements into backend services.",
      "Designed and maintained 50+ REST endpoints in Java and Spring Boot for internal core systems.",
      "Optimized database access and built state-tracking logic for core business workflows.",
    ],
    stack: ["Java", "Spring Boot", "SQL"],
  },
];

export type Project = {
  name: string;
  tagline: string;
  points: string[];
  stack: string[];
  links: { label: string; href: string }[];
  facts: string[];
  /** Shown instead of links when the code can't be shared. */
  note?: string;
};

export const projects: Project[] = [
  {
    name: "Rosyy — AI mental-health coaching platform",
    tagline:
      "Internship at ROSYY Inc. (US). Clients chat with an AI companion and book paid live sessions with human coaches; the team runs everything from an admin portal.",
    facts: ["4 repositories", "150+ commits", "Backend + admin web + mobile"],
    points: [
      "Booking engine: recurring coach schedules, per-coach pricing, 24-hour cancellation and free-rebook rules, check-in windows and three-step session reminders.",
      "Payments with Stripe: card bookings, subscriptions, discount codes, refunds, Stripe Connect payouts to coaches, and an admin console with revenue charts and a Stripe event log.",
      "AI session grading with the OpenAI API: grades a session's chat (text, voice, image and video messages) against the team's coaching rubric, during or after the session, and emails the team when it spots risk cues.",
      "Coach onboarding end to end: application form, email verification, a contract and NDA signed with a drawn signature, training modules and scenario questions, admin review with reasons, and switches to skip steps.",
      "Admin portal (Next.js, React Query): user and coach management with search, audit reasons and account recovery; coach approvals; schedules; chat and support rooms; AI grade reports.",
      "Separate staging environment, Docker images deployed to Google Cloud Run; coach-side screens in the Flutter app.",
    ],
    stack: ["Node.js", "Express", "TypeScript", "Supabase (Postgres)", "Stripe", "OpenAI", "Next.js", "React", "Flutter", "Docker", "Cloud Run"],
    links: [],
    note: "Private company codebase",
  },
  {
    name: "Blood Bank Management System",
    tagline:
      "Blood donation and blood bank platform with separate portals for donors, hospitals, staff and admins.",
    facts: ["~95 endpoints", "16 entities", "5 roles"],
    points: [
      "JWT authentication with role-based access control for five roles: admin, technical staff, inventory staff, hospital and donor.",
      "Password reset by email OTP stored in Redis with a 5-minute expiry and a 60-second resend cooldown.",
      "Bulk email notifications go through a RabbitMQ queue with listener retry, so API requests never wait on SMTP.",
      "Live staff updates over WebSocket (STOMP); scheduled jobs flag expiring blood bags and update inventory.",
      "QR-code donation tickets, Excel reports and an audit log of staff actions.",
      "One-command local setup with Docker Compose (MySQL, Redis, RabbitMQ) and Swagger API docs.",
    ],
    stack: ["Java 17", "Spring Boot 3", "Spring Security", "MySQL", "Redis", "RabbitMQ", "WebSocket", "Docker"],
    links: [
      { label: "Backend", href: "https://github.com/kiins3/BloodBankManager" },
      { label: "Frontend", href: "https://github.com/kiins3/bloodbank-web" },
    ],
  },
  {
    name: "Library Management System",
    tagline: "REST API for a library: catalogue, physical copies, readers and the borrow → return → compensation flow.",
    facts: ["~30 endpoints", "6 tables", "3 roles"],
    points: [
      "Borrowing picks a copy under a pessimistic write lock, so two readers can't take the last copy at the same time.",
      "The JWT carries role and account status; only active readers can borrow, and three violations ban an account automatically.",
      "Tracks each copy (available, unavailable, damaged, lost) and each loan (borrowing, overdue, returned, needs compensation).",
      "Accent-insensitive search for Vietnamese titles and names.",
    ],
    stack: ["Java 17", "Spring Boot 3", "OAuth2 Resource Server", "SQL Server", "MapStruct", "Docker"],
    links: [{ label: "Source", href: "https://github.com/kiins3/BookManager" }],
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["Java", "TypeScript", "Python", "SQL", "C/C++"] },
  { group: "Backend", items: ["Spring Boot", "Spring Security", "Spring Data JPA", "Node.js / Express", "FastAPI"] },
  { group: "Data", items: ["MySQL", "PostgreSQL", "SQL Server", "Redis", "Supabase"] },
  { group: "Infrastructure", items: ["Docker", "RabbitMQ", "Git", "Maven", "Google Cloud Run"] },
  { group: "Practices", items: ["REST API design", "RBAC / JWT", "Async processing", "Code review", "Testing (pytest)"] },
  { group: "AI", items: ["LLM integration", "Prompt engineering", "AI review loops"] },
];

export const education = {
  school: "University of Transport and Communications",
  degree: "Information Technology",
  period: "2022 – 2026",
};
