"use client";

import Image from "next/image";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { Shot } from "../data/profile";

/** Full-screen screenshot viewer: ← → to move, Esc or click outside to close. */
export function Lightbox({
  shots,
  index,
  onClose,
  onIndex,
}: {
  shots: Shot[];
  index: number;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const step = (d: number) => onIndex((index + d + shots.length) % shots.length);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndex((index + 1) % shots.length);
      if (e.key === "ArrowLeft") onIndex((index - 1 + shots.length) % shots.length);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, shots.length, onClose, onIndex]);

  const shot = shots[index];
  const phone = shot.kind === "phone";

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={shot.alt}
      onClick={onClose}
      className="overlay fixed inset-0 z-[66] flex flex-col items-center justify-center gap-4 bg-black/85 p-4 backdrop-blur-sm"
    >
      <Image
        key={shot.src}
        src={shot.src}
        alt={shot.alt}
        width={shot.width}
        height={shot.height}
        sizes="100vw"
        onClick={(e) => e.stopPropagation()}
        className={`pop h-auto max-h-[80vh] w-auto rounded-xl shadow-2xl ${phone ? "max-w-[min(90vw,380px)]" : "max-w-full"}`}
      />
      <p className="max-w-xl text-center text-sm text-white/80">{shot.alt}</p>
      {shots.length > 1 && (
        <div className="flex items-center gap-3 text-white" onClick={(e) => e.stopPropagation()}>
          <button type="button" onClick={() => step(-1)} aria-label="Previous" className="rounded-full border border-white/30 px-3 py-1 hover:bg-white/10">
            ←
          </button>
          <span className="font-mono text-xs text-white/70">
            {index + 1} / {shots.length}
          </span>
          <button type="button" onClick={() => step(1)} aria-label="Next" className="rounded-full border border-white/30 px-3 py-1 hover:bg-white/10">
            →
          </button>
        </div>
      )}
      <button type="button" onClick={onClose} aria-label="Close" className="absolute right-4 top-4 rounded-full border border-white/30 px-3 py-1 text-white hover:bg-white/10">
        ✕
      </button>
    </div>,
    document.body,
  );
}
