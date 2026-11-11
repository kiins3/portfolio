"use client";

import { useEffect, useRef, useState } from "react";

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Feeds the cursor position to the page glow (--cx/--cy) and to `.spotlight` cards (--mx/--my). */
export function Spotlight() {
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        root.style.setProperty("--cx", `${e.clientX}px`);
        root.style.setProperty("--cy", `${e.clientY}px`);
        const card = (e.target as Element | null)?.closest<HTMLElement>(".spotlight");
        if (!card) return;
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
    };
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

/** Counts a value like "150+" or "~95" up from zero the first time it scrolls into view. */
export function CountUp({ value }: { value: string }) {
  const match = value.match(/^(\D*)(\d+)(.*)$/);
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    if (!match || prefersReducedMotion()) return;
    const [, pre, num, post] = match;
    const target = Number(num);
    const el = ref.current;
    if (!el) return;
    setShown(`${pre}0${post}`);

    let frame = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / 1400);
        const eased = 1 - Math.pow(1 - t, 3);
        setShown(`${pre}${Math.round(target * eased)}${post}`);
        if (t < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
    // The value never changes for a given card.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <span ref={ref}>
      <span className="sr-only">{value}</span>
      <span aria-hidden>{shown}</span>
    </span>
  );
}

/** Current time in Hanoi, rendered only in the browser. */
export function HanoiClock() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Ho_Chi_Minh", hour: "2-digit", minute: "2-digit" });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = setInterval(update, 15_000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{time ?? "--:--"}</span>;
}

/** Small toast at the bottom of the screen; call `toast("…")` from anywhere. */
export function toast(message: string) {
  window.dispatchEvent(new CustomEvent("toast", { detail: message }));
}

export function Toaster() {
  const [msg, setMsg] = useState<{ text: string; id: number } | null>(null);
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const onToast = (e: Event) => {
      clearTimeout(timer);
      setMsg({ text: (e as CustomEvent<string>).detail, id: Date.now() });
      timer = setTimeout(() => setMsg(null), 2200);
    };
    window.addEventListener("toast", onToast);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("toast", onToast);
    };
  }, []);
  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-[70] flex justify-center px-4">
      {msg && (
        <p key={msg.id} className="pop rounded-full border border-border bg-surface px-4 py-2 text-sm shadow-xl">
          <span className="mr-2 text-accent">✓</span>
          {msg.text}
        </p>
      )}
    </div>
  );
}

/** Button that copies text and shows a toast. */
export function CopyButton({ text, label, className }: { text: string; label: string; className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => navigator.clipboard.writeText(text).then(() => toast("Copied to clipboard"), () => toast(text))}
    >
      {label}
    </button>
  );
}
