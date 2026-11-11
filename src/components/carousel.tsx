"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Feature } from "../data/profile";
import { Lightbox } from "./lightbox";

const GAP = 16;
const mod = (n: number, m: number) => ((n % m) + m) % m;

/**
 * Phone screenshots on a turning 3D ring (a merry-go-round). It turns on its own while on
 * screen, pauses on hover, can be dragged or swiped, and opens the front screen full size.
 */
export function Carousel({ slides }: { slides: Feature[] }) {
  const n = slides.length;
  const angle = 360 / n;
  const [step, setStep] = useState(0);
  const [drag, setDrag] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);
  const [zoom, setZoom] = useState<number | null>(null);
  const [width, setWidth] = useState(1000);
  const stageRef = useRef<HTMLDivElement>(null);
  const pointer = useRef<{ id: number; x: number; moved: boolean } | null>(null);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    const ro = new ResizeObserver(([e]) => setWidth(e.contentRect.width));
    io.observe(el);
    ro.observe(el);
    return () => {
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  const cardW = Math.round(Math.min(220, Math.max(124, width * 0.25)));
  const cardH = Math.round((cardW * 1600) / 720);
  const radius = Math.round((cardW / 2 + GAP) / Math.tan(Math.PI / n));
  const active = mod(step, n);
  const rotation = -step * angle + drag;

  const go = (delta: number) => setStep((s) => s + delta);
  const goTo = (i: number) => {
    let d = mod(i - active, n);
    if (d > n / 2) d -= n;
    go(d);
  };
  const closeZoom = useCallback(() => setZoom(null), []);

  const paused = !inView || hovered || dragging || zoom !== null;

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    pointer.current = { id: e.pointerId, x: e.clientX, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const p = pointer.current;
    if (!p || p.id !== e.pointerId) return;
    const dx = e.clientX - p.x;
    if (!p.moved && Math.abs(dx) > 6) {
      p.moved = true;
      setDragging(true);
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    if (p.moved) setDrag((dx / (cardW + GAP)) * angle);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const p = pointer.current;
    if (!p || p.id !== e.pointerId) return;
    if (p.moved) {
      const dx = e.clientX - p.x;
      setStep((s) => s - Math.round(((dx / (cardW + GAP)) * angle) / angle));
      setDrag(0);
      setDragging(false);
    }
    // Keep the flag until the click that follows a drag has been swallowed.
    setTimeout(() => (pointer.current = null), 0);
  };

  const slide = slides[active];

  return (
    <div
      className="mt-6"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(-1);
        if (e.key === "ArrowRight") go(1);
      }}
    >
      <div
        ref={stageRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="App screens"
        className="carousel-stage relative select-none overflow-hidden rounded-2xl border border-border bg-gradient-to-b from-accent-soft/60 via-surface-2 to-surface"
        style={{ height: cardH + 96, perspective: `${radius * 3.2}px` }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onClickCapture={(e) => {
          if (pointer.current?.moved) {
            e.stopPropagation();
            e.preventDefault();
          }
        }}
      >
        <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(var(--border)_1px,transparent_1px)] [background-size:16px_16px]" aria-hidden />
        <div className="carousel-floor" style={{ width: radius * 2.4 }} aria-hidden />

        <div
          className="carousel-ring absolute left-1/2 top-[38px]"
          data-dragging={dragging}
          style={{
            width: cardW,
            height: cardH,
            marginLeft: -cardW / 2,
            transform: `translateZ(${-radius}px) rotateY(${rotation}deg)`,
          }}
        >
          {slides.map((s, i) => {
            // How far this card is from the front, in degrees (0 = facing the viewer).
            const off = Math.abs(mod(i * angle + rotation + 180, 360) - 180);
            const front = i === active && !dragging;
            return (
              <button
                key={s.shot.src}
                type="button"
                tabIndex={front ? 0 : -1}
                aria-hidden={!front}
                aria-label={front ? `${s.title}: view full size` : s.title}
                onClick={() => (i === active ? setZoom(i) : goTo(i))}
                className={`carousel-card absolute inset-0 overflow-hidden rounded-[1.4rem] border-[5px] border-zinc-900 bg-zinc-900 ring-1 ring-white/10 ${
                  front ? "cursor-zoom-in shadow-2xl shadow-accent/25" : "cursor-pointer shadow-xl"
                }`}
                style={{
                  transform: `rotateY(${i * angle}deg) translateZ(${radius}px)`,
                  opacity: off > 95 ? 0 : 1 - off / 160,
                  filter: `brightness(${1 - Math.min(off, 120) / 260}) saturate(${1 - Math.min(off, 120) / 300})`,
                  pointerEvents: off > 95 ? "none" : undefined,
                }}
              >
                <Image
                  src={s.shot.src}
                  alt={s.shot.alt}
                  width={s.shot.width}
                  height={s.shot.height}
                  sizes="220px"
                  draggable={false}
                  className="h-full w-full rounded-[1.05rem] object-cover"
                />
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous screen"
          className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-border bg-surface/80 text-muted shadow-lg backdrop-blur transition hover:scale-105 hover:text-accent sm:left-5"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next screen"
          className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-border bg-surface/80 text-muted shadow-lg backdrop-blur transition hover:scale-105 hover:text-accent sm:right-5"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>

      <div className="mt-4 flex flex-col items-center gap-3 text-center" aria-live="polite">
        <div key={active} className="fade-in max-w-md">
          <p className="flex items-center justify-center gap-2 font-mono text-[11px] text-muted">
            <span className="text-accent">{String(active + 1).padStart(2, "0")}</span>/ {String(n).padStart(2, "0")}
            {slide.group && <span className="rounded-full bg-accent-soft px-2 py-0.5 text-accent">{slide.group}</span>}
          </p>
          <p className="mt-1.5 font-semibold">{slide.title}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted">{slide.desc}</p>
        </div>
        <div className="flex items-center gap-1.5" role="tablist" aria-label="Choose a screen">
          {slides.map((s, i) => (
            <button
              key={s.shot.src}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={s.title}
              onClick={() => goTo(i)}
              className={`relative h-1.5 overflow-hidden rounded-full transition-all duration-500 ${
                i === active ? "w-8 bg-accent/25" : "w-1.5 bg-border hover:bg-muted"
              }`}
            >
              {i === active && (
                <span
                  key={step}
                  className="tab-progress absolute inset-0 bg-accent"
                  style={{ "--dur": "3.2s" } as React.CSSProperties}
                  data-paused={paused}
                  onAnimationEnd={() => go(1)}
                  aria-hidden
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {zoom !== null && (
        <Lightbox shots={slides.map((s) => s.shot)} index={zoom} onClose={closeZoom} onIndex={(i) => { setZoom(i); goTo(i); }} />
      )}
    </div>
  );
}
