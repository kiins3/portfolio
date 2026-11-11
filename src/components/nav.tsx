"use client";

import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { openPalette } from "./command-palette";
import { ThemeToggle } from "./theme-toggle";

type NavItem = { href: string; label: string };

const noop = () => () => {};

/** Floating pill nav: the highlight slides to the hovered or current section. */
export function Nav({ items, name }: { items: NavItem[]; name: string }) {
  const [active, setActive] = useState("");
  const [hover, setHover] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [box, setBox] = useState<{ left: number; width: number } | null>(null);
  const mac = useSyncExternalStore(noop, () => /Mac|iPhone|iPad/.test(navigator.platform), () => true);
  const links = useRef<Map<string, HTMLAnchorElement>>(new Map());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const owner = new Map<Element, string>();
    for (const i of items) {
      const section = document.querySelector(i.href)?.closest("section");
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
    const onTop = () => window.scrollY < 200 && setActive("");
    window.addEventListener("scroll", onTop, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scroll", onTop);
    };
  }, [items]);

  const target = hover ?? active;
  useLayoutEffect(() => {
    const el = target ? links.current.get(target) : null;
    setBox(el ? { left: el.offsetLeft, width: el.offsetWidth } : null);
  }, [target]);

  return (
    <header className="fixed inset-x-0 top-3 z-50 flex justify-center px-3 sm:top-4">
      <div
        data-scrolled={scrolled}
        className="nav-pill flex w-full max-w-2xl items-center gap-1 rounded-full border border-border bg-surface/60 py-1.5 pl-1.5 pr-2 backdrop-blur-xl"
      >
        <a href="#top" className="group flex items-center gap-2 rounded-full py-0.5 pl-0.5 pr-3" aria-label={`${name}, back to top`}>
          <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-accent to-accent-2 font-mono text-xs font-bold text-background shadow-md transition-transform duration-500 group-hover:rotate-[360deg]">
            TD
          </span>
          <span className="text-sm font-semibold">
            dang<span className="text-accent">.dev</span>
          </span>
        </a>

        <nav className="relative ml-auto hidden items-center sm:flex" onMouseLeave={() => setHover(null)}>
          <span className="nav-indicator" style={box ? { left: box.left, width: box.width, opacity: 1 } : { opacity: 0 }} aria-hidden />
          {items.map((n) => (
            <a
              key={n.href}
              href={n.href}
              ref={(el) => {
                if (el) links.current.set(n.href, el);
              }}
              onMouseEnter={() => setHover(n.href)}
              aria-current={active === n.href ? "true" : undefined}
              className={`relative z-10 rounded-full px-3 py-1.5 text-sm transition-colors ${
                target === n.href ? "text-foreground" : "text-muted hover:text-foreground"
              }`}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <span className="mx-1 hidden h-5 w-px bg-border sm:block" aria-hidden />

        <div className="ml-auto flex items-center gap-1 sm:ml-0">
          <button
            type="button"
            onClick={openPalette}
            className="flex h-8 items-center gap-1.5 rounded-full px-2 text-muted transition hover:bg-surface-2 hover:text-foreground"
            aria-label="Open command menu"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <span className="kbd hidden sm:inline">{mac ? "⌘K" : "Ctrl K"}</span>
          </button>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenu((m) => !m)}
            className="grid h-8 w-8 place-items-center rounded-full text-muted transition hover:bg-surface-2 hover:text-foreground sm:hidden"
            aria-label="Menu"
            aria-expanded={menu}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              {menu ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {menu && (
        <nav className="pop absolute inset-x-3 top-14 rounded-2xl border border-border bg-surface/95 p-2 shadow-2xl backdrop-blur-xl sm:hidden">
          {items.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setMenu(false)}
              className={`block rounded-xl px-4 py-3 text-sm ${active === n.href ? "bg-accent-soft text-foreground" : "text-muted"}`}
            >
              {n.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
