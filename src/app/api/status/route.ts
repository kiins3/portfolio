import { connection } from "next/server";

const HEALTH_URL = "https://bloodbank-api-i4a4.onrender.com/actuator/health";

/**
 * Checks the live BloodBank API for the hero terminal.
 * Runs on the server so the browser doesn't need CORS access to the API,
 * and it also wakes the free-tier server before a visitor opens the demo.
 */
export async function GET() {
  await connection();
  const started = Date.now();
  try {
    const res = await fetch(HEALTH_URL, { cache: "no-store", signal: AbortSignal.timeout(9000) });
    const body = await res.json().catch(() => null);
    return Response.json({ ok: res.ok, code: res.status, ms: Date.now() - started, body });
  } catch {
    // Timed out: Render is still waking the instance up.
    return Response.json({ ok: false, code: 0, ms: Date.now() - started, body: null });
  }
}
