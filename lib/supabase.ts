import { createClient } from "@supabase/supabase-js";

// 서버 사이드 전용 (Service Role Key — 절대 클라이언트 번들에 포함되지 않음)
export function createServerClient() {
  const url  = process.env.SUPABASE_URL!;
  const key  = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  if (!url || !key) {
    throw new Error(
      "Supabase env vars missing: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY"
    );
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}

// Supabase Postgres 에러 코드
export const PG_UNIQUE_VIOLATION = "23505";
