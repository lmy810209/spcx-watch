import { createClient } from "@supabase/supabase-js";

/** placeholder 값 감지 (실제 Supabase 키가 아직 설정되지 않은 경우) */
function isPlaceholder(value: string | undefined): boolean {
  if (!value) return true;
  return (
    value.includes("your-project-id") ||
    value.includes("your-key-here") ||
    value.includes("your-supabase") ||
    value === "placeholder"
  );
}

/** Supabase가 실제로 사용 가능한지 — 호출 전에 항상 체크 */
export function isSupabaseConfigured(): boolean {
  return !isPlaceholder(process.env.SUPABASE_URL) &&
         !isPlaceholder(process.env.SUPABASE_SERVICE_ROLE_KEY);
}

// 서버 사이드 전용 (Service Role Key — 절대 클라이언트 번들에 포함되지 않음)
export function createServerClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (isPlaceholder(url) || isPlaceholder(key)) {
    throw new Error("Supabase not configured (placeholder or missing env vars)");
  }

  return createClient(url!, key!, {
    auth: { persistSession: false },
  });
}

// Supabase Postgres 에러 코드
export const PG_UNIQUE_VIOLATION = "23505";
