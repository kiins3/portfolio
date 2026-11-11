"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export type Shot = { src: string; alt: string; width: number; height: number };

/**
 * Screenshot strip that opens a full-size viewer.
 * "browser" = landscape web screenshots, "phone" = portrait app screenshots in a phone frame.
 */
export function Gallery({ shots, kind = "browser" }: { shots: Shot[]; kind?: "browser" | "phone" }) {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (d: number) => setOpen((i) => (i === null ? i : (i + d + shots.length) % shots.length)),
    [shots.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, step]);

  const phone = kind === "phone";
  const current = open === null ? null : shots[open];

  return (
    <>
      <ul className={phone ? "mt-5 flex justify-center gap-4 sm:justify-start sm:gap-6" : "mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4"}>
        {shots.map((s, i) => (
          <li key={s.src} className={phone ? "w-[30%] max-w-[150px]" : undefined}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              title={s.alt}
              className={`group block w-full cursor-zoom-in overflow-hidden border border-border transition duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-lg ${
                phone ? "rounded-[1.4rem] border-4 bg-background p-0.5" : "rounded-lg"
              }`}
            >
              <Image
                src={s.src}
                alt={s.alt}
                width={s.width}
                height={s.height}
                sizes={phone ? "150px" : "(min-width: 640px) 200px, 50vw"}
                className={`h-auto w-full transition-transform duration-500 group-hover:scale-[1.04] ${phone ? "rounded-[1.1rem]" : ""}`}
              />
            </button>
          </li>
        ))}
      </ul>

      {current &&
        createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          onClick={close}
          className="lightbox fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-black/85 p-4 backdrop-blur-sm"
        >
          <Image
            key={current.src}
            src={current.src}
            alt={current.alt}
            width={current.width}
            height={current.height}
            sizes="100vw"
            onClick={(e) => e.stopPropagation()}
            className={`h-auto max-h-[80vh] w-auto max-w-full rounded-xl shadow-2xl ${phone ? "max-w-[min(90vw,380px)]" : ""}`}
          />
          <p className="max-w-xl text-center text-sm text-white/80">{current.alt}</p>
          {shots.length > 1 && (
            <div className="flex items-center gap-3 text-white" onClick={(e) => e.stopPropagation()}>
              <button type="button" onClick={() => step(-1)} aria-label="Previous" className="rounded-full border border-white/30 px-3 py-1 hover:bg-white/10">
                ←
              </button>
              <span className="font-mono text-xs text-white/70">
                {open! + 1} / {shots.length}
              </span>
              <button type="button" onClick={() => step(1)} aria-label="Next" className="rounded-full border border-white/30 px-3 py-1 hover:bg-white/10">
                →
              </button>
            </div>
          )}
          <button type="button" onClick={close} aria-label="Close" className="absolute right-4 top-4 rounded-full border border-white/30 px-3 py-1 text-white hover:bg-white/10">
            ✕
          </button>
        </div>,
          document.body,
        )}
    </>
  );
}
