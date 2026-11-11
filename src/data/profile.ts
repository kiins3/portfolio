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

/** One tab in a feature showcase, or one screen on the carousel. */
export type Feature = { title: string; desc: string; shot: Shot; group?: string };

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
  /** Phone screens on the turning 3D carousel. */
  carousel?: Feature[];
  /** Address shown in the browser frame around web screenshots. */
  frameUrl?: string;
  /** Heading over the feature tabs when a project has both. */
  featuresLabel?: string;
  features?: Feature[];
};

const phone = (src: string, alt: string): Shot => ({ src, alt, width: 720, height: 1600, kind: "phone" });
const playShot = (src: string, alt: string): Shot => ({ src, alt, width: 720, height: 1561, kind: "phone" });
const web = (src: string, alt: string): Shot => ({ src, alt, width: 1440, height: 900, kind: "browser" });
const admin = (src: string, alt: string): Shot => ({ src, alt, width: 1400, height: 875, kind: "browser" });

const R = "/projects/rosyy";

export const projects: Project[] = [
  {
    name: "Rosyy — coaching platform for mothers",
    kicker: "Internship · ROSYY Inc. (US) · live on Google Play",
    tagline:
      "Mothers and caregivers book paid live sessions with human support partners; the team runs bookings, payments and coaches from an admin portal.",
    facts: ["4 repositories", "150+ commits", "Booking + Stripe", "Coach onboarding"],
    points: [
      "Booking engine: recurring coach schedules that top up 30-minute slots automatically, 24-hour cancellation and free-rebook rules, check-in windows and session reminders.",
      "Payments with Stripe: card checkout, subscriptions, discount codes, refunds, Stripe Connect payouts to coaches, and an admin console with revenue, a credit ledger and the Stripe event log.",
      "Coach onboarding end to end: application, contract and NDA signed in the app with a drawn signature, training modules and scenario questions, admin review with reasons, and an email at every step.",
      "Admin portal (Next.js): user and coach management with search and audit reasons, bookings with reassign, refund and force-cancel, expert schedules.",
      "A separate staging environment with its own accounts; Docker images deployed to Google Cloud Run; coach and client screens in the Flutter app.",
    ],
    stack: ["Node.js", "Express", "TypeScript", "Supabase (Postgres)", "Stripe", "Next.js", "Flutter", "Docker", "Cloud Run"],
    links: [{ label: "Google Play", href: "https://play.google.com/store/apps/details?id=com.rosyy.rosyy_and" }],
    note: "Private company codebase",
    carousel: [
      { group: "Client", title: "Home", desc: "AI companion, booking and wellness content in one place.", shot: phone(`${R}/app-home.png`, "Rosyy app home screen") },
      { group: "Client", title: "Book a session", desc: "Pick a day and a 30-minute slot from the coaches' live availability.", shot: phone(`${R}/app-book.png`, "Booking calendar with open time slots") },
      { group: "Client", title: "Stripe checkout", desc: "The slot is held for 15 minutes while the client pays by card.", shot: phone(`${R}/app-pay.png`, "Stripe payment sheet inside the app") },
      { group: "Client", title: "Booking confirmed", desc: "Paid, confirmed and added to the client's sessions.", shot: phone(`${R}/app-paid.png`, "Payment and session confirmed screen") },
      { group: "Client", title: "My sessions", desc: "Upcoming, completed and cancelled sessions with the cancellation rules applied.", shot: phone(`${R}/app-sessions.png`, "List of booked sessions with statuses") },
      { group: "Client", title: "SOS", desc: "Crisis lines one tap away from every screen.", shot: phone(`${R}/app-sos.png`, "SOS screen with crisis helplines") },
      { group: "Coach", title: "Become a support partner", desc: "Coaches apply from the app or the website.", shot: phone(`${R}/coach-apply.png`, "Support partner application intro") },
      { group: "Coach", title: "Sign the contract", desc: "Contract and NDA signed in the app with a drawn signature.", shot: phone(`${R}/coach-contract.png`, "Signing the coach contract in the app") },
      { group: "Coach", title: "Coach training", desc: "Training modules that unlock the scenario questions.", shot: phone(`${R}/coach-training.png`, "Coach training module") },
      { group: "Coach", title: "Coach hub", desc: "Upcoming sessions, clients, availability and client notes.", shot: phone(`${R}/coach-hub.png`, "Coach hub with sessions and tools") },
      { group: "Coach", title: "Stripe payouts", desc: "Coaches connect a bank through Stripe Connect and follow their earnings.", shot: phone(`${R}/coach-payouts.png`, "Coach payouts page connected to Stripe") },
    ],
    featuresLabel: "Admin portal",
    frameUrl: "admin.rosyy.org",
    features: [
      {
        title: "Revenue",
        desc: "Payments, credit ledger, IAP receipts, coach payouts and the Stripe event log, with filters and CSV export.",
        shot: admin(`${R}/admin-revenue.png`, "Admin revenue console with Stripe payments"),
      },
      {
        title: "Bookings",
        desc: "Every session across coaches: reassign, mark the outcome, force-cancel or refund.",
        shot: admin(`${R}/admin-bookings.png`, "Admin bookings table with actions"),
      },
      {
        title: "Expert schedules",
        desc: "Set a coach's weekly hours once; 30-minute sessions are generated and topped up automatically.",
        shot: admin(`${R}/admin-schedules.png`, "Admin weekly schedule editor for a coach"),
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

/** The AI work at Rosyy, shown in its own section. */
export const aiProject: Project = {
  name: "Rosyy AI — companion chatbot and LLM session grading",
  kicker: "AI features · ROSYY Inc.",
  tagline:
    "The AI side of Rosyy: the companion chatbot mothers talk to every day, and an LLM judge that grades coaching sessions, practice chats and the chatbot itself, then flags risk to the team.",
  facts: ["GPT-4.1 · structured outputs", "LLM-as-judge", "Text · voice · image · video", "Risk alerts by email"],
  points: [
    "Tuned the companion chatbot with the team lead: the clinical team's system prompt shipped as Chatbot Rules that admins edit live, with placeholders for the client's name, memories and crisis resources, and fixes to how replies read.",
    "Session grading with an LLM judge: GPT-4.1 at temperature 0 with a strict JSON schema scores each rubric criterion 5 / 3 / 1 / NR and quotes the messages behind every score.",
    "The model only scores; weights, NR rescaling, safety gates, bands and pass/fail are computed in code, so a grade is reproducible and the rubric can change without touching the prompt.",
    "Reads the whole chat: voice notes are transcribed and images and video are described by a vision model before grading.",
    "Grades a session automatically a few minutes after it ends (or on demand while it runs) and emails the team when it finds risk cues such as coded suicidal language.",
    "Practice chat for coach applicants: the AI plays a client persona for a 30-minute chat, the transcript is graded on both the criteria and the Chatbot Rules, and an admin passes, fails or sends the applicant back to train.",
    "Admins edit the criteria, weights and safety gates from the portal; old grades keep the version they were graded on.",
  ],
  stack: ["OpenAI API", "GPT-4.1", "Structured outputs", "Speech-to-text", "Vision", "Prompt engineering", "Node.js", "TypeScript", "Supabase", "Next.js"],
  links: [],
  note: "Private company codebase",
  frameUrl: "admin.rosyy.org",
  features: [
    {
      title: "Companion chat",
      desc: "The AI companion clients talk to every day; each reply can be rated thumbs up or down.",
      shot: playShot("/projects/rosyy-3.png", "Rosyy app: chat with the AI companion"),
    },
    {
      title: "Personal companion",
      desc: "Clients choose who they talk to; the companion remembers what they share across chats.",
      shot: playShot("/projects/rosyy-2.png", "Rosyy app: choosing an AI companion"),
    },
    {
      title: "Chatbot Rules",
      desc: "The companion's system prompt, edited live by the team; a save applies to the next reply.",
      shot: admin(`${R}/ai-rules.png`, "Admin page for editing the chatbot's system prompt"),
    },
    {
      title: "Session grades",
      desc: "Every coaching session graded a few minutes after it ends, with risk cues flagged and emailed.",
      shot: admin(`${R}/ai-grades.png`, "List of AI-graded sessions with scores and risk flags"),
    },
    {
      title: "Grade report",
      desc: "Score, band, safety gate, the risk cues found and a summary, next to the chat it was graded on.",
      shot: admin(`${R}/ai-grade-detail.png`, "AI grade report for one coaching session"),
    },
    {
      title: "Practice chat",
      desc: "Applicants chat with an AI that plays a mother in a hard moment, as they would in a real session.",
      shot: admin(`${R}/ai-practice.png`, "Practice chat where an AI plays a client"),
    },
    {
      title: "Practice review",
      desc: "The AI's grade is advice: an admin reads it and passes, fails or sends the applicant back to train.",
      shot: admin(`${R}/ai-practice-review.png`, "Admin review of a graded practice chat"),
    },
    {
      title: "Criteria editor",
      desc: "Admins edit criteria, weights and safety gates; each grade keeps the version it used.",
      shot: admin(`${R}/ai-criteria.png`, "Editor for the grading criteria and weights"),
    },
  ],
};

/** How a session grade is made, shown as a pipeline in the AI section. */
export const gradingPipeline: { title: string; desc: string }[] = [
  { title: "Session ends", desc: "A job picks it up a few minutes later, or an admin grades it live." },
  { title: "Transcript", desc: "Text as is; voice transcribed; images and video described." },
  { title: "LLM judge", desc: "GPT-4.1, temperature 0, JSON schema: a score and quotes per criterion." },
  { title: "Score in code", desc: "Weights, NR rescaling, safety gates, band and pass/fail." },
  { title: "Report + alert", desc: "Grade report in the admin portal; risk cues emailed to the team." },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["Java", "TypeScript", "Python", "SQL", "C/C++"] },
  { group: "Backend", items: ["Spring Boot", "Spring Security", "Spring Data JPA", "Node.js / Express", "FastAPI"] },
  { group: "Data", items: ["MySQL", "PostgreSQL", "SQL Server", "Redis", "Supabase"] },
  { group: "Infrastructure", items: ["Docker", "RabbitMQ", "Git", "Maven", "Google Cloud Run"] },
  { group: "Practices", items: ["REST API design", "RBAC / JWT", "Async processing", "Code review", "Testing (pytest)"] },
  { group: "AI", items: ["LLM integration", "LLM-as-judge", "Structured outputs", "Prompt engineering"] },
];

export const education = {
  school: "University of Transport and Communications",
  degree: "Information Technology",
  period: "2022 – 2026",
};
