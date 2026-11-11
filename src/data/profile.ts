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

/** A screenshot in public/projects. */
export type Shot = { src: string; alt: string; width: number; height: number; kind?: "browser" | "phone" };

/** One tab in a project's feature showcase. */
export type Feature = { title: string; desc: string; shot: Shot };

export type Project = {
  name: string;
  /** Short label above the name. */
  kicker: string;
  tagline: string;
  points: string[];
  stack: string[];
  links: { label: string; href: string }[];
  facts: string[];
  /** Shown next to the links when the code can't be shared. */
  note?: string;
  /** Address shown in the browser frame around web screenshots. */
  frameUrl?: string;
  features?: Feature[];
};

const phone = (src: string, alt: string): Shot => ({ src, alt, width: 720, height: 1561, kind: "phone" });
const web = (src: string, alt: string): Shot => ({ src, alt, width: 1440, height: 900, kind: "browser" });

export const projects: Project[] = [
  {
    name: "Rosyy — coaching platform for mothers",
    kicker: "Internship · ROSYY Inc. (US) · live on Google Play",
    tagline:
      "Mothers and caregivers book paid live sessions with human coaches; the team runs bookings, payments and coaches from an admin portal.",
    facts: ["4 repositories", "150+ commits", "Backend + admin web + mobile"],
    points: [
      "Booking engine: recurring coach schedules, per-coach pricing, 24-hour cancellation and free-rebook rules, check-in windows and three-step session reminders.",
      "Payments with Stripe: card bookings, subscriptions, discount codes, refunds, Stripe Connect payouts to coaches, and an admin console with revenue charts and a Stripe event log.",
      "Coach onboarding end to end: application form, email verification, a contract and NDA signed with a drawn signature, training modules and scenario questions, admin review with reasons, and switches to skip steps.",
      "Admin portal (Next.js, React Query): user and coach management with search, audit reasons and account recovery; coach approvals; schedules; chat and support rooms.",
      "Separate staging environment, Docker images deployed to Google Cloud Run; coach-side screens in the Flutter app.",
    ],
    stack: ["Node.js", "Express", "TypeScript", "Supabase (Postgres)", "Stripe", "Next.js", "React", "Flutter", "Docker", "Cloud Run"],
    links: [{ label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.rosyy.rosyy_and" }],
    note: "Private company codebase",
    features: [
      {
        title: "Mobile app",
        desc: "Flutter app for mothers and caregivers, live on Google Play.",
        shot: phone("/projects/rosyy-1.png", "Rosyy app: welcome screen"),
      },
      {
        title: "Personal companion",
        desc: "Clients pick the companion they talk to and can change it at any time.",
        shot: phone("/projects/rosyy-2.png", "Rosyy app: choosing an AI companion"),
      },
    ],
  },
  {
    name: "Rosyy AI — companion chatbot and session grading",
    kicker: "AI features · ROSYY Inc.",
    tagline:
      "The AI side of Rosyy: the companion chatbot clients talk to every day, and an LLM grader that reviews live coaching sessions and flags risk.",
    facts: ["OpenAI API", "Text · voice · image · video", "Risk alerts by email"],
    points: [
      "Worked with the team lead on training and tuning the AI companion that clients chat with in the app.",
      "AI session grading with the OpenAI API: grades a session's chat (text, voice, image and video messages) against the team's coaching rubric, during or after the session.",
      "Emails the team when the grader spots risk cues, so a person can step in quickly.",
      "Grade reports in the admin portal for reviewing coaches over time.",
    ],
    stack: ["OpenAI API", "Prompt engineering", "Node.js", "TypeScript", "Supabase (Postgres)", "Next.js"],
    links: [],
    note: "Private company codebase",
    features: [
      {
        title: "Companion chat",
        desc: "Everyday conversations with the AI companion; every reply can be rated thumbs up or down.",
        shot: phone("/projects/rosyy-3.png", "Rosyy app: chat with the AI companion"),
      },
    ],
  },
  {
    name: "Blood Bank Management System",
    kicker: "Personal project · open source · live demo",
    tagline: "Blood donation and blood bank platform with separate portals for donors, hospitals, staff and admins.",
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
      { label: "Live demo", href: "https://bloodbank-vn.vercel.app" },
      { label: "Backend", href: "https://github.com/kiins3/BloodBankManager" },
      { label: "Frontend", href: "https://github.com/kiins3/bloodbank-web" },
    ],
    frameUrl: "bloodbank-vn.vercel.app",
    features: [
      {
        title: "Public site",
        desc: "Upcoming donation campaigns; donors sign up and register for an event.",
        shot: web("/projects/bloodbank-landing.png", "Public landing page with upcoming donation campaigns"),
      },
      {
        title: "Admin dashboard",
        desc: "Stock by blood group, campaign results and pending hospital requests at a glance.",
        shot: web("/projects/bloodbank-admin.png", "Admin dashboard: stock by blood group, campaigns and pending requests"),
      },
      {
        title: "Campaign desk",
        desc: "Check-in, screening and collection queues for technical staff, updated live over WebSocket.",
        shot: web("/projects/bloodbank-desk.png", "Campaign desk for technical staff: check-in, screening and collection queues with live updates"),
      },
      {
        title: "Hospital requests",
        desc: "Hospitals follow a request from approval to delivery, then confirm or return bags.",
        shot: web("/projects/bloodbank-request.png", "Hospital view of a delivered blood request with progress and exported bags"),
      },
    ],
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
