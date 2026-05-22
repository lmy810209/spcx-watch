import type { Category } from "./types";

const PEXELS_QUERIES: Record<Category, string> = {
  starship:  "spacex starship rocket launch",
  starlink:  "satellite constellation space orbit",
  falcon:    "falcon rocket landing booster",
  nasa:      "nasa moon rocket artemis",
  launch:    "rocket launch liftoff fire",
  business:  "stock market wall street IPO trading finance",
  general:   "financial charts investment data technology business",
};

interface PexelsPhoto {
  src: { large2x: string; large: string; medium: string };
}
interface PexelsResponse {
  photos: PexelsPhoto[];
}

/** 임의 쿼리로 Pexels 이미지 배열 반환 */
export async function fetchImagesForQuery(
  query: string,
  count = 5
): Promise<string[]> {
  const pexelsKey = process.env.PEXELS_API_KEY;
  if (!pexelsKey) return [];
  try {
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${count}&orientation=landscape`,
      { headers: { Authorization: pexelsKey }, next: { revalidate: 86400 } }
    );
    if (!res.ok) return [];
    const data: PexelsResponse = await res.json();
    return (data.photos ?? []).map((p) => p.src.large2x || p.src.large).filter(Boolean);
  } catch {
    return [];
  }
}

/** 카테고리에 맞는 이미지 URL 배열 반환 (최대 count장) */
export async function fetchImagesForCategory(
  category: Category,
  count = 5
): Promise<string[]> {
  const pexelsKey = process.env.PEXELS_API_KEY;

  if (pexelsKey) {
    try {
      const query = PEXELS_QUERIES[category];
      const res = await fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${count}&orientation=landscape`,
        {
          headers: { Authorization: pexelsKey },
          next: { revalidate: 86400 },
        }
      );

      if (res.ok) {
        const data: PexelsResponse = await res.json();
        const urls = (data.photos ?? [])
          .map((p) => p.src.large2x || p.src.large)
          .filter(Boolean);
        if (urls.length > 0) return urls;
      }
    } catch (err) {
      console.warn("[fetchImage] Pexels failed:", err);
    }
  }

  const nasa = await fetchNasaImage(category);
  return nasa ? [nasa] : [];
}

/** 단일 이미지 (category page 등 단건 호출용) */
export async function fetchImageForCategory(
  category: Category
): Promise<string | undefined> {
  const urls = await fetchImagesForCategory(category, 1);
  return urls[0];
}

const NASA_QUERIES: Record<Category, string> = {
  starship:  "starship spacecraft",
  starlink:  "starlink satellite",
  falcon:    "falcon rocket",
  nasa:      "artemis moon SLS",
  launch:    "rocket launch",
  business:  "spacex launch",
  general:   "space exploration",
};

async function fetchNasaImage(category: Category): Promise<string | undefined> {
  try {
    const query = NASA_QUERIES[category];
    const res = await fetch(
      `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}&media_type=image&page_size=10`,
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return undefined;

    const data = await res.json();
    const items: { links?: { href: string; rel: string }[] }[] =
      data.collection?.items ?? [];

    for (const item of items) {
      const link = item.links?.find((l) => l.rel === "preview");
      if (link?.href) return link.href.replace("~thumb.jpg", "~medium.jpg");
    }
  } catch { /* gradient fallback */ }
  return undefined;
}

/**
 * 기사 URL에서 og:image / twitter:image 메타태그 추출
 * 24시간 캐시 — 첫 로드 이후는 빠름
 */
export async function fetchOGImage(url: string): Promise<string | undefined> {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
        Accept: "text/html",
      },
      next: { revalidate: 86400 },
    });

    if (!res.ok) return undefined;

    const html = await res.text();
    const head = html.slice(0, 60000); // head 영역만 파싱

    const match =
      head.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) ||
      head.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i) ||
      head.match(/<meta[^>]+name=["']twitter:image(?::src)?["'][^>]+content=["']([^"']+)["']/i) ||
      head.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']twitter:image(?::src)?["']/i);

    const imgUrl = match?.[1];
    if (!imgUrl || imgUrl.startsWith("data:")) return undefined;

    // 상대 경로 → 절대 경로 변환
    if (imgUrl.startsWith("//")) return `https:${imgUrl}`;
    if (imgUrl.startsWith("/")) {
      try {
        const base = new URL(url);
        return `${base.protocol}//${base.hostname}${imgUrl}`;
      } catch { return undefined; }
    }

    return imgUrl;
  } catch {
    return undefined;
  }
}

/** 기사 배열에 OG 이미지를 병렬로 붙이기 (없는 기사만) */
export async function attachOGImages<T extends { imageUrl?: string; externalUrl?: string }>(
  articles: T[]
): Promise<T[]> {
  return Promise.all(
    articles.map(async (a) => {
      if (a.imageUrl || !a.externalUrl) return a;
      const og = await fetchOGImage(a.externalUrl);
      return og ? { ...a, imageUrl: og } : a;
    })
  );
}

/** 카테고리 배열 → { category: imageUrls[] } 맵 반환 (병렬) */
export async function fetchCategoryImageMap(
  categories: Category[]
): Promise<Partial<Record<Category, string[]>>> {
  const seen = new Set<Category>();
  categories.forEach((c) => seen.add(c));
  const unique = Array.from(seen);

  const results = await Promise.all(
    unique.map(async (cat) => ({ cat, urls: await fetchImagesForCategory(cat, 5) }))
  );

  const map: Partial<Record<Category, string[]>> = {};
  for (const { cat, urls } of results) {
    if (urls.length > 0) (map as Record<string, string[]>)[cat] = urls;
  }
  return map;
}
