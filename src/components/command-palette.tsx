"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "./effects";
import { toggleTheme } from "./theme-toggle";

export type PaletteLink = { label: string; href: string; group: "Go to" | "Open" };

type Item = { id: string; label: string; group: string; hint?: string; run: () => void };

export function openPalette() {
  window.dispatchEvent(new Event("open-palette"));
}

/** ⌘K / Ctrl+K menu to jump to a section, open a project or copy the email. */
export function CommandPalette({ links, email }: { links: PaletteLink[]; email: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-palette", onOpen);
    };
  }, []);

  return open ? <PaletteDialog links={links} email={email} onClose={() => setOpen(false)} /> : null;
}

/** Mounted fresh each time the menu opens, so the search starts empty. */
function PaletteDialog({ links, email, onClose }: { links: PaletteLink[]; email: string; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const items = useMemo<Item[]>(
    () => [
      ...links.map((l) => ({
        id: l.href,
        label: l.label,
        group: l.group,
        hint: l.href.startsWith("#") ? undefined : new URL(l.href).hostname.replace("www.", ""),
        run: () => {
          if (l.href.startsWith("#")) document.querySelector(l.href)?.scrollIntoView({ behavior: "smooth" });
          else window.open(l.href, "_blank", "noopener");
        },
      })),
      {
        id: "copy-email",
        label: "Copy email address",
        group: "Actions",
        hint: email,
        run: () => {
          navigator.clipboard.writeText(email).then(() => toast("Email copied"), () => toast(email));
        },
      },
      { id: "theme", label: "Toggle light / dark theme", group: "Actions", run: () => toggleTheme() },
    ],
    [links, email],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? items.filter((i) => `${i.label} ${i.group} ${i.hint ?? ""}`.toLowerCase().includes(q)) : items;
  }, [items, query]);

  useEffect(() => {
    inputRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);


  const run = (item: Item | undefined) => {
    if (!item) return;
    onClose();
    item.run();
  };

  let lastGroup = "";

  return createPortal(
    <div className="overlay fixed inset-0 z-[65] flex items-start justify-center bg-black/50 px-4 pt-[15vh] backdrop-blur-sm" onClick={() => onClose()}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command menu"
        onClick={(e) => e.stopPropagation()}
        className="pop w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl"
      >
        <div className="flex items-center gap-3 border-b border-border px-4">
          <svg viewBox="0 0 24 24" className="h-4 w-4 text-muted" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIndex(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setIndex((i) => Math.min(i + 1, filtered.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setIndex((i) => Math.max(i - 1, 0));
              } else if (e.key === "Enter") {
                run(filtered[index]);
              } else if (e.key === "Escape") {
                onClose();
              }
            }}
            placeholder="Search sections, projects, actions…"
            className="h-12 flex-1 bg-transparent text-sm outline-none placeholder:text-muted"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
          />
          <span className="kbd">Esc</span>
        </div>
        <ul id="palette-list" role="listbox" className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 && <li className="px-3 py-6 text-center text-sm text-muted">No results</li>}
          {filtered.map((item, i) => {
            const header = item.group !== lastGroup ? item.group : null;
            lastGroup = item.group;
            return (
              <li key={item.id} role="presentation">
                {header && <p className="px-3 pb-1 pt-2 text-[11px] font-medium uppercase tracking-wider text-muted">{header}</p>}
                <button
                  type="button"
                  role="option"
                  aria-selected={i === index}
                  onMouseMove={() => setIndex(i)}
                  onClick={() => run(item)}
                  className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    i === index ? "bg-accent-soft text-foreground" : "text-muted"
                  }`}
                >
                  <span>{item.label}</span>
                  {item.hint && <span className="truncate font-mono text-xs text-muted">{item.hint}</span>}
                </button>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center gap-3 border-t border-border px-4 py-2 text-[11px] text-muted">
          <span><span className="kbd">↑</span> <span className="kbd">↓</span> move</span>
          <span><span className="kbd">↵</span> open</span>
        </div>
      </div>
    </div>,
    document.body,
  );
}
