"use client";

import { useEffect, useState } from "react";
import { prefersReducedMotion } from "./effects";

const COMMAND = "curl bloodbank-api-i4a4.onrender.com/actuator/health";

type Status =
  | { state: "typing" }
  | { state: "waiting"; tries: number; since: number }
  | { state: "up"; ms: number; body: unknown }
  | { state: "down" };

/**
 * Hero terminal: types a curl command, then really calls the live BloodBank API
 * (through /api/status). Render's free tier sleeps, so it keeps retrying while it wakes up.
 */
export function Terminal({ demoUrl, docsUrl }: { demoUrl: string; docsUrl: string }) {
  const [typed, setTyped] = useState(0);
  const [status, setStatus] = useState<Status>({ state: "typing" });
  const [now, setNow] = useState(0);

  // Type the command
  useEffect(() => {
    const instant = prefersReducedMotion();
    let i = 0;
    const id = setInterval(() => {
      i = instant ? COMMAND.length : i + 1;
      setTyped(i);
      if (i >= COMMAND.length) clearInterval(id);
    }, 28);
    return () => clearInterval(id);
  }, []);

  // Call the API once the command is typed
  useEffect(() => {
    if (typed < COMMAND.length) return;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    const since = Date.now();

    const check = async (tries: number) => {
      setStatus({ state: "waiting", tries, since });
      try {
        const res = await fetch("/api/status", { cache: "no-store" });
        const data = (await res.json()) as { ok: boolean; ms: number; body: unknown };
        if (cancelled) return;
        if (data.ok) {
          setStatus({ state: "up", ms: data.ms, body: data.body });
          return;
        }
      } catch {}
      if (cancelled) return;
      if (tries >= 16) setStatus({ state: "down" });
      else timer = setTimeout(() => check(tries + 1), 3000);
    };
    check(1);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [typed]);

  // Tick the "waking up" counter
  useEffect(() => {
    if (status.state !== "waiting") return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [status.state]);

  const waited = status.state === "waiting" ? Math.max(0, Math.round((now - status.since) / 1000)) : 0;

  return (
    <div className="spotlight overflow-hidden rounded-2xl border border-border bg-surface/80 shadow-2xl backdrop-blur-xl">
      <div className="flex items-center gap-2 border-b border-border bg-surface-2/60 px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-2 truncate font-mono text-xs text-muted">bloodbank-api — zsh</span>
        <span className="ml-auto flex items-center gap-1.5 font-mono text-[11px] text-muted">
          {status.state === "up" ? (
            <>
              <span className="pulse-dot" /> live
            </>
          ) : status.state === "down" ? (
            <>
              <span className="h-2 w-2 rounded-full bg-amber-500" /> asleep
            </>
          ) : (
            <>
              <span className="h-2 w-2 animate-pulse rounded-full bg-amber-400" /> connecting
            </>
          )}
        </span>
      </div>

      <div className="min-h-[15.5rem] space-y-3 p-4 font-mono text-[12.5px] leading-relaxed sm:p-5 sm:text-[13px]">
        <p className="break-all">
          <span className="text-accent">➜</span> <span className="text-accent-2">~</span> {COMMAND.slice(0, typed)}
          {typed < COMMAND.length && <span className="caret" />}
        </p>

        {status.state === "waiting" && (
          <p className="fade-in text-muted">
            <span className="spinner mr-2 text-accent" />
            {waited < 4 ? "connecting…" : `waking up the free-tier server… ${waited}s (can take 1–3 min)`}
          </p>
        )}

        {status.state === "up" && (
          <div className="fade-in space-y-2">
            <pre className="overflow-x-auto whitespace-pre-wrap text-foreground">
              {JSON.stringify(status.body, null, 2)
                .split(/("[^"]*")/g)
                .map((part, i) =>
                  part.startsWith('"') ? (
                    <span key={i} className={part === '"UP"' ? "text-emerald-500" : "text-accent-2"}>
                      {part}
                    </span>
                  ) : (
                    part
                  ),
                )}
            </pre>
            <p className="text-muted">
              <span className="text-emerald-500">HTTP 200</span> · {status.ms} ms · Spring Boot on Render
            </p>
          </div>
        )}

        {status.state === "down" && (
          <p className="fade-in text-amber-500">The server is still starting. Open the demo in a minute and it will be up.</p>
        )}

        {status.state !== "typing" && (
          <p className="fade-in text-muted">
            <span className="text-accent">➜</span> <span className="text-accent-2">~</span>{" "}
            <span className="text-muted/70"># Java 17 · Spring Boot 3 · MySQL · Redis · RabbitMQ · WebSocket</span>
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-border px-4 py-3">
        <a
          href={demoUrl}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-background transition hover:opacity-90"
        >
          Open live demo ↗
        </a>
        <a
          href={docsUrl}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-border px-3 py-1 text-xs font-medium transition hover:border-accent hover:text-accent"
        >
          Swagger docs ↗
        </a>
        <span className="ml-auto text-[11px] text-muted">real request, not a mock</span>
      </div>
    </div>
  );
}
