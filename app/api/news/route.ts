import { NextResponse } from "next/server";
import { fetchSpaceXNews } from "@/lib/fetchNews";
import { MOCK_ARTICLES } from "@/lib/articles";

export const runtime = "nodejs"; // edge에서는 Buffer.from 미지원
export const revalidate = 300;   // 5분 캐시

export async function GET() {
  const result = await fetchSpaceXNews();

  if (result.ok && result.articles.length > 0) {
    return NextResponse.json(result, {
      headers: {
        // 브라우저 캐시 1분, CDN 캐시 5분
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        "X-Data-Source": "rss",
      },
    });
  }

  // ── Fallback: RSS 실패 시 mock 데이터 반환 ─────────────────────────
  return NextResponse.json(
    {
      articles: MOCK_ARTICLES,
      ok: false,
      source: "fallback",
      fetchedAt: new Date().toISOString(),
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
        "X-Data-Source": "fallback",
      },
    }
  );
}
