"use client";

import { useEffect, useState } from "react";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Feeds the cursor position to every `.spotlight` card as --mx / --my. */
export function Spotlight() {
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest<HTMLElement>(".spotlight");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);
  return null;
}

/** Types each word, pauses, deletes it, moves to the next. */
export function Typewriter({ words }: { words: string[] }) {
  const [text, setText] = useState(words[0]);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let word = 0;
    let len = words[0].length;
    let deleting = true;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (deleting) {
        len--;
        if (len === 0) {
          deleting = false;
          word = (word + 1) % words.length;
        }
      } else {
        len++;
      }
      setText(words[word].slice(0, len));

      let delay = deleting ? 35 : 70;
      if (!deleting && len === words[word].length) {
        deleting = true;
        delay = 2200;
      }
      timer = setTimeout(tick, delay);
    };

    timer = setTimeout(tick, 2600);
    return () => clearTimeout(timer);
  }, [words]);

  return (
    <span aria-label={words.join(", ")}>
      <span aria-hidden>{text}</span>
      <span className="caret" aria-hidden />
    </span>
  );
}

/** Top nav that highlights the section currently on screen. */
export function Nav({ items }: { items: { href: string; label: string }[] }) {
  const [active, setActive] = useState("");

  useEffect(() => {
    const owner = new Map<Element, string>();
    for (const i of items) {
      const heading = document.querySelector(i.href);
      const section = heading?.closest("section");
      if (section) owner.set(section, i.href);
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(owner.get(e.target) ?? "");
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    owner.forEach((_, section) => io.observe(section));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav className="flex gap-4 text-sm text-muted sm:gap-6">
      {items.map((n) => (
        <a
          key={n.href}
          href={n.href}
          className={`relative py-1 transition-colors hover:text-foreground ${active === n.href ? "text-foreground" : ""}`}
        >
          {n.label}
          <span
            className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-accent transition-transform duration-300 ${active === n.href ? "scale-x-100" : "scale-x-0"}`}
          />
        </a>
      ))}
    </nav>
  );
}
