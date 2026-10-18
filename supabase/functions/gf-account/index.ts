// 아가미파이터 계정 연동: Apple 로그인 토큰(identityToken)을 Apple 공개키로 확인하고,
// 그 사람(sub)에 '백업 코드'를 연결해 둔다(gf_cloud 키 'a:'+sha256). 저장 내용은 코드 쪽(c:)에 있음.
// Apple 아이디 원문·이메일·이름은 받지도 저장하지도 않음.
// v3 (1.1.14): op 'unlink' — 그 Apple 계정과 백업 코드의 연결(a: 행)만 지운다. 백업 코드·저장(c:)은 그대로.
import { createRemoteJWKSet, jwtVerify } from "npm:jose@5.9.6";

const APPLE = createRemoteJWKSet(new URL("https://appleid.apple.com/auth/keys"));
const AUD = ["com.gillfighter.game"];
const URL0 = Deno.env.get("SUPABASE_URL")!;
const SRK = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const CODE = /^[A-HJ-NP-Z2-9]{12}$/;
const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
function out(o: unknown, st = 200) {
  return new Response(JSON.stringify(o), { status: st, headers: { ...cors, "Content-Type": "application/json" } });
}
async function sha(s: string) {
  const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return Array.from(new Uint8Array(b)).map((x) => x.toString(16).padStart(2, "0")).join("");
}
async function db(path: string, init: RequestInit) {
  return fetch(URL0 + "/rest/v1/" + path, {
    ...init,
    headers: { apikey: SRK, Authorization: "Bearer " + SRK, "Content-Type": "application/json", ...(init.headers || {}) },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return out({ error: "method" }, 405);
  let body: any;
  try { body = await req.json(); } catch { return out({ error: "json" }, 400); }
  const tok = String(body?.id_token || "");
  if (!tok || tok.length > 4000) return out({ error: "token" }, 400);
  let sub = "";
  try {
    const { payload } = await jwtVerify(tok, APPLE, { issuer: "https://appleid.apple.com", audience: AUD });
    sub = String(payload.sub || "");
  } catch (_e) {
    return out({ error: "verify" }, 401);
  }
  if (!sub) return out({ error: "verify" }, 401);
  const k = "a:" + (await sha("gfa:" + sub));
  const op = body?.op;
  if (op === "unlink") {
    const r = await db("gf_cloud?k=eq." + encodeURIComponent(k), { method: "DELETE", headers: { Prefer: "return=minimal" } });
    if (!r.ok) return out({ error: "db" }, 500);
    return out({ ok: true, unlinked: true });
  }
  const r0 = await db("gf_cloud?select=data,updated_at&k=eq." + encodeURIComponent(k), { method: "GET" });
  if (!r0.ok) return out({ error: "db" }, 500);
  const rows = await r0.json();
  const cur = rows[0]?.data?.code ? String(rows[0].data.code) : "";
  if (op === "get") return out({ ok: true, code: cur || null });
  if (op === "link") {
    const code = String(body?.code || "");
    if (!CODE.test(code)) return out({ error: "code" }, 400);
    if (cur && cur !== code && !body?.force) return out({ ok: true, code: cur, linked: false });
    const row = { k, data: { code }, ver: "acct", bytes: 30, updated_at: new Date().toISOString() };
    const r = await db("gf_cloud?on_conflict=k", { method: "POST", headers: { Prefer: "resolution=merge-duplicates,return=minimal" }, body: JSON.stringify(row) });
    if (!r.ok) return out({ error: "db" }, 500);
    return out({ ok: true, code, linked: true });
  }
  return out({ error: "op" }, 400);
});
