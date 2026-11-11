import { Gallery } from "../components/gallery";
import { Nav, Spotlight, Typewriter } from "../components/effects";
import { education, experience, profile, projects, skills } from "../data/profile";

const nav = [
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

const roles = ["Backend Developer", "Java · Spring Boot", "REST APIs · Redis · RabbitMQ", "Node.js · FastAPI"];

const stats = [
  { value: "3", label: "internships" },
  { value: "150+", label: "commits at ROSYY" },
  { value: "100+", label: "reviewed tasks at SmartInvest" },
  { value: "~95", label: "endpoints in BloodBank" },
];

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <li className="rounded-full border border-border bg-surface px-2.5 py-0.5 font-mono text-xs text-muted transition-colors hover:border-accent hover:text-accent">
      {children}
    </li>
  );
}

function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="mb-8 flex scroll-mt-24 items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
      {children}
      <span className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
    </h2>
  );
}

export default function Home() {
  const allSkills = skills.flatMap((g) => g.items);

  return (
    <>
      <div className="scroll-progress" aria-hidden />
      <Spotlight />

      <header className="sticky top-0 z-40 border-b border-border bg-background/75 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="#top" className="group font-mono text-sm font-semibold">
            dang<span className="text-accent transition-colors group-hover:text-foreground">.dev</span>
          </a>
          <Nav items={nav} />
        </div>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="relative isolate">
          <div className="hero-bg" aria-hidden>
            <span className="blob blob-1" />
            <span className="blob blob-2" />
            <span className="blob blob-3" />
          </div>
          <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 sm:py-28">
            <p className="rise inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1 text-xs text-muted backdrop-blur">
              <span className="pulse-dot" /> Open to Junior Backend roles
            </p>
            <p className="rise mt-6 font-mono text-sm text-accent" style={{ "--d": "80ms" } as React.CSSProperties}>
              Hi, I&apos;m
            </p>
            <h1 className="rise gradient-text mt-2 text-4xl font-bold tracking-tight sm:text-6xl" style={{ "--d": "160ms" } as React.CSSProperties}>
              {profile.name}
            </h1>
            <p className="rise mt-3 min-h-[3.5rem] text-xl sm:min-h-0 text-muted sm:text-2xl" style={{ "--d": "240ms" } as React.CSSProperties}>
              <Typewriter words={roles} /> <span className="text-border">/</span> {profile.location}
            </p>
            <p className="rise mt-6 max-w-2xl leading-relaxed text-muted" style={{ "--d": "320ms" } as React.CSSProperties}>
              {profile.summary}
            </p>
            <div className="rise mt-8 flex flex-wrap gap-3" style={{ "--d": "400ms" } as React.CSSProperties}>
              <a
                href="#projects"
                className="group rounded-lg bg-accent px-4 py-2 text-sm font-medium text-background shadow-lg shadow-accent/20 transition hover:-translate-y-0.5 hover:shadow-accent/40"
              >
                See projects <span className="inline-block transition-transform group-hover:translate-y-0.5">↓</span>
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-border bg-surface/60 px-4 py-2 text-sm font-medium backdrop-blur transition hover:-translate-y-0.5 hover:border-accent"
              >
                GitHub
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="rounded-lg border border-border bg-surface/60 px-4 py-2 text-sm font-medium backdrop-blur transition hover:-translate-y-0.5 hover:border-accent"
              >
                Email me
              </a>
            </div>
            <dl className="rise mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4" style={{ "--d": "480ms" } as React.CSSProperties}>
              {stats.map((s) => (
                <div key={s.label} className="spotlight lift rounded-xl border border-border bg-surface/60 p-4 backdrop-blur">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="text-2xl font-bold text-accent">{s.value}</dd>
                  <dd className="mt-1 text-xs text-muted">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Skills strip */}
        <div className="marquee border-y border-border bg-surface/50 py-3" aria-hidden>
          <ul className="marquee-track">
            {[...allSkills, ...allSkills].map((s, i) => (
              <li key={i} className="whitespace-nowrap font-mono text-sm text-muted">
                <span className="text-accent">▹</span> {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          {/* Projects */}
          <section className="py-16">
            <SectionTitle id="projects">Projects</SectionTitle>
            <div className="grid gap-6">
              {projects.map((p) => (
                <article key={p.name} className="reveal spotlight rounded-2xl border border-border bg-surface p-6 sm:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold">{p.name}</h3>
                      <p className="mt-1 text-muted">{p.tagline}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {p.links.map((l) => (
                        <a
                          key={l.href}
                          href={l.href}
                          target="_blank"
                          rel="noreferrer"
                          className="group rounded-md border border-border px-3 py-1 text-sm transition hover:border-accent hover:text-accent"
                        >
                          {l.label}{" "}
                          <span className="inline-block transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                        </a>
                      ))}
                      {p.note && (
                        <span className="rounded-md border border-dashed border-border px-3 py-1 text-sm text-muted">
                          {p.note}
                        </span>
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
                  {p.images && <Gallery shots={p.images} kind={p.imageKind} />}
                  <ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted marker:text-accent">
                    {p.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <Tag key={s}>{s}</Tag>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          {/* Experience */}
          <section className="py-12">
            <SectionTitle id="experience">Experience</SectionTitle>
            <ol className="relative space-y-10 border-l border-border pl-6">
              {experience.map((e) => (
                <li key={e.title + e.period} className="reveal relative">
                  <span className="absolute -left-[31px] top-1.5 flex h-3 w-3 items-center justify-center">
                    {e.period.includes("now") && <span className="absolute h-3 w-3 animate-ping rounded-full bg-accent/40" />}
                    <span className="relative h-3 w-3 rounded-full border-2 border-accent bg-background" />
                  </span>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <h3 className="font-semibold">
                      {e.title} <span className="text-muted">· {e.company}</span>
                    </h3>
                    <span className="font-mono text-xs text-muted">{e.period}</span>
                  </div>
                  <p className="text-sm text-muted">{e.place}</p>
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted marker:text-accent">
                    {e.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {e.stack.map((s) => (
                      <Tag key={s}>{s}</Tag>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
            <div className="reveal spotlight mt-10 rounded-xl border border-border bg-surface p-5">
              <p className="text-sm text-muted">Education</p>
              <p className="font-semibold">{education.school}</p>
              <p className="text-sm text-muted">
                {education.degree} · {education.period}
              </p>
            </div>
          </section>

          {/* Skills */}
          <section className="py-12">
            <SectionTitle id="skills">Skills</SectionTitle>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {skills.map((g) => (
                <div key={g.group} className="reveal spotlight lift rounded-xl border border-border bg-surface p-5">
                  <h3 className="text-sm font-semibold">{g.group}</h3>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {g.items.map((s) => (
                      <Tag key={s}>{s}</Tag>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section className="py-16">
            <SectionTitle id="contact">Contact</SectionTitle>
            <div className="reveal spotlight rounded-2xl border border-border bg-surface p-6 sm:p-10">
              <p className="max-w-xl text-2xl font-semibold leading-snug">
                Looking for a Junior Backend role. Happy to talk about Java, Spring Boot and backend systems.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-background shadow-lg shadow-accent/20 transition hover:-translate-y-0.5 hover:shadow-accent/40"
                >
                  {profile.email}
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-border px-4 py-2 text-sm font-medium transition hover:-translate-y-0.5 hover:border-accent"
                >
                  github.com/kiins3
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t border-border py-6 text-center text-xs text-muted">
        © 2026 {profile.name} · Built with Next.js and Tailwind CSS
      </footer>
    </>
  );
}
