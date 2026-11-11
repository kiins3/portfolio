"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { Feature } from "../data/profile";
import { Lightbox } from "./lightbox";

/**
 * Feature tabs with a screenshot stage. Plays through the features while on screen,
 * stops autoplay once the visitor picks a tab, and opens the screenshot full size on click.
 */
export function Showcase({ features, frameUrl }: { features: Feature[]; frameUrl?: string }) {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);
  const [zoom, setZoom] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const next = () => setActive((i) => (i + 1) % features.length);
  const pick = (i: number) => {
    setAuto(false);
    setActive(i);
  };
  const closeZoom = useCallback(() => setZoom(null), []);

  const paused = !inView || hovered || zoom !== null;
  const shots = features.map((f) => f.shot);

  return (
    <div
      ref={ref}
      className="mt-6 grid gap-4 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] md:gap-6"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div role="tablist" aria-label="Features" className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 md:mx-0 md:flex-col md:overflow-visible md:px-0 md:pb-0">
        {features.map((f, i) => {
          const on = i === active;
          return (
            <button
              key={f.title}
              type="button"
              role="tab"
              id={`${id}-tab-${i}`}
              aria-selected={on}
              aria-controls={`${id}-panel`}
              onClick={() => pick(i)}
              className={`relative shrink-0 overflow-hidden rounded-xl border px-3.5 py-2.5 text-left transition-all duration-300 md:px-4 md:py-3 ${
                on ? "border-accent/50 bg-accent-soft/60 shadow-sm" : "border-transparent hover:border-border hover:bg-surface-2"
              }`}
            >
              <span className={`flex items-center gap-2 text-sm font-medium ${on ? "text-foreground" : "text-muted"}`}>
                <span className={`font-mono text-[11px] ${on ? "text-accent" : "text-muted/70"}`}>{String(i + 1).padStart(2, "0")}</span>
                {f.title}
              </span>
              <span
                className={`hidden overflow-hidden text-xs leading-relaxed text-muted transition-all duration-500 md:block ${
                  on ? "mt-1.5 max-h-24 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                {f.desc}
              </span>
              {on && auto && features.length > 1 && (
                <span
                  key={active}
                  className="tab-progress absolute inset-x-0 bottom-0 h-0.5 bg-accent"
                  data-paused={paused}
                  onAnimationEnd={next}
                  aria-hidden
                />
              )}
            </button>
          );
        })}
      </div>

      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${active}`}>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-accent-soft/70 via-surface-2 to-surface sm:aspect-[16/10]">
          <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(var(--border)_1px,transparent_1px)] [background-size:16px_16px]" aria-hidden />
          {features.map((f, i) => {
            const on = i === active;
            const phone = f.shot.kind === "phone";
            return (
              <button
                key={f.shot.src}
                type="button"
                tabIndex={on ? 0 : -1}
                aria-hidden={!on}
                data-active={on}
                onClick={() => setZoom(i)}
                title="View full size"
                className="stage-shot group absolute inset-0 flex cursor-zoom-in items-center justify-center p-[5%]"
              >
                {phone ? (
                  <span className="block h-full rounded-[1.6rem] border-[5px] border-zinc-900 bg-zinc-900 ring-1 ring-white/10 shadow-2xl transition-transform duration-500 group-hover:-translate-y-1">
                    <Image
                      src={f.shot.src}
                      alt={f.shot.alt}
                      width={f.shot.width}
                      height={f.shot.height}
                      sizes="260px"
                      className="h-full w-auto rounded-[1.25rem]"
                    />
                  </span>
                ) : (
                  <span className="flex max-h-full w-[92%] flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-2xl transition-transform duration-500 group-hover:-translate-y-1 sm:w-[88%]">
                    <span className="flex shrink-0 items-center gap-1.5 border-b border-border bg-surface-2 px-3 py-1.5">
                      <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
                      <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
                      <span className="h-2 w-2 rounded-full bg-[#28c840]" />
                      {frameUrl && (
                        <span className="mx-auto max-w-[60%] truncate rounded-md bg-surface px-3 py-0.5 font-mono text-[10px] text-muted">
                          {frameUrl}
                        </span>
                      )}
                    </span>
                    <span className="block min-h-0 overflow-hidden">
                      <Image
                        src={f.shot.src}
                        alt={f.shot.alt}
                        width={f.shot.width}
                        height={f.shot.height}
                        sizes="(min-width: 768px) 560px, 90vw"
                        className="h-auto w-full"
                      />
                    </span>
                  </span>
                )}
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted md:hidden">{features[active].desc}</p>
      </div>

      {zoom !== null && <Lightbox shots={shots} index={zoom} onClose={closeZoom} onIndex={setZoom} />}
    </div>
  );
}
