import { education, experience, profile, projects, skills } from "../data/profile";

const nav = [
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <li className="rounded-full border border-border bg-surface px-2.5 py-0.5 font-mono text-xs text-muted">
      {children}
    </li>
  );
}

function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="mb-8 scroll-mt-24 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
      {children}
    </h2>
  );
}

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="#top" className="font-mono text-sm font-semibold">
            dang<span className="text-accent">.dev</span>
          </a>
          <nav className="flex gap-4 text-sm text-muted sm:gap-6">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-foreground">
                {n.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main id="top" className="mx-auto max-w-4xl px-4 sm:px-6">
        {/* Hero */}
        <section className="py-20 sm:py-28">
          <p className="font-mono text-sm text-accent">Hi, I&apos;m</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-6xl">{profile.name}</h1>
          <p className="mt-3 text-xl text-muted sm:text-2xl">
            {profile.role} · {profile.location}
          </p>
          <p className="mt-6 max-w-2xl leading-relaxed text-muted">{profile.summary}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-background hover:opacity-90"
            >
              See projects
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:border-accent"
            >
              GitHub
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:border-accent"
            >
              Email me
            </a>
          </div>
        </section>

        {/* Projects */}
        <section className="py-12">
          <SectionTitle id="projects">Projects</SectionTitle>
          <div className="grid gap-6">
            {projects.map((p) => (
              <article key={p.name} className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold">{p.name}</h3>
                    <p className="mt-1 text-muted">{p.tagline}</p>
                  </div>
                  <div className="flex gap-2">
                    {p.links.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-md border border-border px-3 py-1 text-sm hover:border-accent hover:text-accent"
                      >
                        {l.label} ↗
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
              <li key={e.title + e.period} className="relative">
                <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-background" />
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
          <div className="mt-10 rounded-xl border border-border bg-surface p-5">
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
              <div key={g.group} className="rounded-xl border border-border bg-surface p-5">
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
          <p className="max-w-xl text-2xl font-semibold leading-snug">
            Looking for a Junior Backend role. Happy to talk about Java, Spring Boot and backend systems.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-background hover:opacity-90"
            >
              {profile.email}
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:border-accent"
            >
              github.com/kiins3
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-6 text-center text-xs text-muted">
        © 2026 {profile.name} · Built with Next.js and Tailwind CSS
      </footer>
    </>
  );
}
