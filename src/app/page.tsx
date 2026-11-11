import { CommandPalette, type PaletteLink } from "../components/command-palette";
import { CopyButton, CountUp, HanoiClock, Spotlight, Toaster, Typewriter } from "../components/effects";
import { Nav } from "../components/nav";
import { Showcase } from "../components/showcase";
import { Terminal } from "../components/terminal";
import { education, experience, profile, projects, skills } from "../data/profile";

const nav = [
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

const paletteLinks: PaletteLink[] = [
  ...nav.map((n) => ({ ...n, group: "Go to" as const })),
  { label: "BloodBank live demo", href: "https://bloodbank-vn.vercel.app", group: "Open" },
  { label: "BloodBank backend on GitHub", href: "https://github.com/kiins3/BloodBankManager", group: "Open" },
  { label: "Rosyy on Google Play", href: "https://play.google.com/store/apps/details?id=com.rosyy.rosyy_and", group: "Open" },
  { label: "GitHub profile", href: profile.github, group: "Open" },
  { label: "Source of this site", href: "https://github.com/kiins3/portfolio", group: "Open" },
];

const roles = ["Backend Developer", "Java · Spring Boot", "REST APIs · Redis · RabbitMQ", "Node.js · FastAPI · LLMs"];

const stats = [
  { value: "3", label: "internships" },
  { value: "150+", label: "commits at ROSYY" },
  { value: "100+", label: "reviewed tasks at SmartInvest" },
  { value: "~95", label: "endpoints in BloodBank" },
];

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <li className="rounded-full border border-border bg-surface px-2.5 py-0.5 font-mono text-xs text-muted transition-colors hover:border-accent hover:text-accent">
      {children}
    </li>
  );
}

function SectionTitle({ id, index, children }: { id: string; index: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="mb-10 flex scroll-mt-28 items-center gap-4">
      <span className="font-mono text-sm text-accent">{index}</span>
      <span className="text-2xl font-bold tracking-tight sm:text-3xl">{children}</span>
      <span className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
    </h2>
  );
}

export default function Home() {
  const allSkills = skills.flatMap((g) => g.items);
  const current = experience.filter((e) => e.period.includes("now"));

  return (
    <>
      <div className="page-grid" aria-hidden />
      <div className="cursor-glow" aria-hidden />
      <div className="scroll-progress" aria-hidden />
      <Spotlight />
      <Toaster />
      <CommandPalette links={paletteLinks} email={profile.email} />
      <Nav items={nav} name={profile.name} />

      <main id="top" className="overflow-x-clip">
        {/* Hero */}
        <section className="relative isolate">
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
            <span className="blob blob-1" />
            <span className="blob blob-2" />
            <span className="blob blob-3" />
          </div>
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-32 sm:px-6 sm:pt-40 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
            <div>
              <p className="rise inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1 text-xs text-muted backdrop-blur">
                <span className="pulse-dot" /> Open to Junior Backend roles
              </p>
              <p className="rise mt-6 font-mono text-sm text-accent" style={delay(80)}>
                Hi, I&apos;m
              </p>
              <h1 className="rise gradient-text mt-2 text-5xl font-bold tracking-tight sm:text-7xl" style={delay(160)}>
                {profile.name}
              </h1>
              <p className="rise mt-4 min-h-[3.5rem] text-xl text-muted sm:min-h-0 sm:text-2xl" style={delay(240)}>
                <Typewriter words={roles} />
              </p>
              <p className="rise mt-5 max-w-xl leading-relaxed text-muted" style={delay(320)}>
                {profile.summary}
              </p>
              <div className="rise mt-8 flex flex-wrap gap-3" style={delay(400)}>
                <a
                  href="#projects"
                  className="group rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                >
                  See my work <span className="inline-block transition-transform group-hover:translate-y-0.5">↓</span>
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-border bg-surface/60 px-5 py-2.5 text-sm font-medium backdrop-blur transition hover:-translate-y-0.5 hover:border-accent"
                >
                  GitHub ↗
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  className="rounded-full border border-border bg-surface/60 px-5 py-2.5 text-sm font-medium backdrop-blur transition hover:-translate-y-0.5 hover:border-accent"
                >
                  Email me
                </a>
              </div>
            </div>
            <div className="rise" style={delay(500)}>
              <Terminal demoUrl="https://bloodbank-vn.vercel.app" docsUrl="https://bloodbank-api-i4a4.onrender.com/swagger-ui.html" />
            </div>
          </div>

          {/* At a glance */}
          <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              <div className="reveal spotlight col-span-2 row-span-2 flex flex-col rounded-2xl border border-border bg-surface/70 p-5 backdrop-blur sm:p-6">
                <p className="font-mono text-xs uppercase tracking-wider text-muted">Right now</p>
                <ul className="mt-4 space-y-4">
                  {current.map((e) => (
                    <li key={e.title + e.company} className="flex gap-3">
                      <span className="pulse-dot mt-1.5" />
                      <span>
                        <span className="block font-medium">{e.title}</span>
                        <span className="text-sm text-muted">
                          {e.company} · {e.place}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex items-end justify-between gap-4 pt-6">
                  <div>
                    <p className="text-sm text-muted">{profile.location}</p>
                    <p className="font-mono text-2xl font-semibold">
                      <HanoiClock /> <span className="text-sm font-normal text-muted">UTC+7</span>
                    </p>
                  </div>
                  <p className="text-right text-xs text-muted">
                    {education.degree}
                    <br />
                    {education.school.replace("University of ", "Univ. of ")}
                  </p>
                </div>
              </div>
              {stats.map((s) => (
                <div key={s.label} className="reveal spotlight lift rounded-2xl border border-border bg-surface/70 p-5 backdrop-blur">
                  <p className="bg-gradient-to-br from-accent to-accent-2 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
                    <CountUp value={s.value} />
                  </p>
                  <p className="mt-2 text-sm text-muted">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills strip */}
        <div className="marquee border-y border-border bg-surface/40 py-4 backdrop-blur" aria-hidden>
          <ul className="marquee-track">
            {[...allSkills, ...allSkills].map((s, i) => (
              <li key={i} className="whitespace-nowrap font-mono text-sm text-muted">
                <span className="mr-2 text-accent">✦</span>
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* Projects */}
          <section className="py-24">
            <SectionTitle id="projects" index="01">
              Selected work
            </SectionTitle>
            <div className="grid gap-8">
              {projects.map((p) => (
                <article key={p.name} className="reveal spotlight rounded-3xl border border-border bg-surface/80 p-5 backdrop-blur sm:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="max-w-2xl">
                      <p className="font-mono text-xs text-accent">{p.kicker}</p>
                      <h3 className="mt-2 text-2xl font-bold tracking-tight">{p.name}</h3>
                      <p className="mt-2 leading-relaxed text-muted">{p.tagline}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {p.links.map((l, i) => (
                        <a
                          key={l.href}
                          href={l.href}
                          target="_blank"
                          rel="noreferrer"
                          className={`group rounded-full px-3.5 py-1.5 text-sm font-medium transition hover:-translate-y-0.5 ${
                            i === 0
                              ? "bg-accent text-background shadow-md shadow-accent/20"
                              : "border border-border hover:border-accent hover:text-accent"
                          }`}
                        >
                          {l.label}{" "}
                          <span className="inline-block transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                        </a>
                      ))}
                      {p.note && (
                        <span className="rounded-full border border-dashed border-border px-3.5 py-1.5 text-sm text-muted">{p.note}</span>
                      )}
                    </div>
                  </div>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {p.facts.map((f) => (
                      <li key={f} className="rounded-md bg-accent-soft px-2 py-0.5 text-xs font-medium text-accent">
                        {f}
                      </li>
                    ))}
                  </ul>

                  {p.features && <Showcase features={p.features} frameUrl={p.frameUrl} />}

                  <div className="mt-8 grid gap-6 border-t border-border pt-6 lg:grid-cols-[1fr_16rem]">
                    <ul className="space-y-2.5 text-sm leading-relaxed text-muted">
                      {p.points.map((pt) => (
                        <li key={pt} className="flex gap-3">
                          <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                    <div>
                      <p className="font-mono text-xs uppercase tracking-wider text-muted">Stack</p>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {p.stack.map((s) => (
                          <Tag key={s}>{s}</Tag>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Experience */}
          <section className="py-16">
            <SectionTitle id="experience" index="02">
              Experience
            </SectionTitle>
            <ol className="relative space-y-6 pl-8 sm:pl-10">
              <span className="absolute bottom-3 left-[7px] top-3 w-px bg-border sm:left-[11px]" aria-hidden />
              <span className="timeline-fill absolute bottom-3 left-[7px] top-3 w-px origin-top bg-gradient-to-b from-accent via-accent-2 to-transparent sm:left-[11px]" aria-hidden />
              {experience.map((e) => (
                <li key={e.title + e.period} className="reveal relative">
                  <span className="absolute -left-8 top-6 flex h-[15px] w-[15px] items-center justify-center sm:-left-10 sm:h-[23px] sm:w-[23px]">
                    {e.period.includes("now") && <span className="absolute inset-0 animate-ping rounded-full bg-accent/30" />}
                    <span className="relative h-3 w-3 rounded-full border-2 border-accent bg-background" />
                  </span>
                  <div className="spotlight rounded-2xl border border-border bg-surface/80 p-5 backdrop-blur sm:p-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="font-semibold">
                        {e.title} <span className="text-muted">· {e.company}</span>
                      </h3>
                      <span className="rounded-full bg-surface-2 px-2.5 py-0.5 font-mono text-xs text-muted">{e.period}</span>
                    </div>
                    <p className="text-sm text-muted">{e.place}</p>
                    <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-muted">
                      {e.points.map((pt) => (
                        <li key={pt} className="flex gap-3">
                          <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {e.stack.map((s) => (
                        <Tag key={s}>{s}</Tag>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Skills */}
          <section className="py-16">
            <SectionTitle id="skills" index="03">
              Skills
            </SectionTitle>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {skills.map((g, i) => (
                <div key={g.group} className="reveal spotlight lift rounded-2xl border border-border bg-surface/80 p-5 backdrop-blur">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{g.group}</h3>
                    <span className="font-mono text-xs text-muted/70">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {g.items.map((s) => (
                      <Tag key={s}>{s}</Tag>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section className="py-24">
            <SectionTitle id="contact" index="04">
              Contact
            </SectionTitle>
            <div className="reveal spotlight relative overflow-hidden rounded-3xl border border-border bg-surface/80 p-8 backdrop-blur sm:p-12">
              <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl" aria-hidden />
              <p className="max-w-2xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                Looking for a Junior Backend role.{" "}
                <span className="text-muted">Happy to talk about Java, Spring Boot and backend systems.</span>
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background shadow-lg transition hover:-translate-y-0.5"
                >
                  {profile.email}
                </a>
                <CopyButton
                  text={profile.email}
                  label="Copy email"
                  className="rounded-full border border-border px-5 py-2.5 text-sm font-medium transition hover:-translate-y-0.5 hover:border-accent"
                />
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-border px-5 py-2.5 text-sm font-medium transition hover:-translate-y-0.5 hover:border-accent"
                >
                  github.com/kiins3 ↗
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-6 text-xs text-muted sm:px-6">
          <p>
            © 2026 {profile.name} · Designed and built with Next.js and Tailwind CSS ·{" "}
            <a href="https://github.com/kiins3/portfolio" target="_blank" rel="noreferrer" className="underline-offset-4 hover:text-accent hover:underline">
              source
            </a>
          </p>
          <p>
            Press <span className="kbd">Ctrl K</span> to jump anywhere
          </p>
        </div>
      </footer>
    </>
  );
}
