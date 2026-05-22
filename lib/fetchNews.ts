import type { Article, Category, DataLabel } from "./types";

// ─── Google News RSS URL ────────────────────────────────────────────────────
const RSS_URL =
  "https://news.google.com/rss/search?q=SpaceX&hl=en-US&gl=US&ceid=US:en";

// ─── XML 파싱 유틸리티 ──────────────────────────────────────────────────────

function decodeEntities(s: string): string {
  return s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'");
}

function stripHTML(s: string): string {
  return decodeEntities(s)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** 태그 안의 텍스트 추출. CDATA / 일반 텍스트 모두 처리 */
function extractTag(xml: string, tag: string): string {
  const cdataRe = new RegExp(
    `<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`,
    "i"
  );
  const cdata = xml.match(cdataRe);
  if (cdata) return cdata[1].trim();

  const textRe = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
  const text = xml.match(textRe);
  return text ? decodeEntities(text[1]).trim() : "";
}

/** <source url="...">이름</source> 에서 {name, url} 추출 */
function extractSource(itemXml: string): { name: string; url: string } {
  const re = /<source\s+url="([^"]*)"[^>]*>([^<]*)<\/source>/i;
  const m = itemXml.match(re);
  if (m) return { url: m[1], name: m[2].trim() };
  return { name: "External", url: "" };
}

/** Google News RSS 제목 형식 "기사 제목 - 언론사명" 에서 제목 분리 */
function splitGoogleTitle(raw: string): { title: string; pub: string } {
  const idx = raw.lastIndexOf(" - ");
  if (idx > 0) {
    return { title: raw.slice(0, idx).trim(), pub: raw.slice(idx + 3).trim() };
  }
  return { title: raw, pub: "" };
}

/** pubDate 문자열 → ISO string */
function toISO(pubDate: string): string {
  try {
    return new Date(pubDate).toISOString();
  } catch {
    return new Date().toISOString();
  }
}

// ─── 카테고리 자동 감지 ──────────────────────────────────────────────────────

const KEYWORD_MAP: { pattern: RegExp; category: Category }[] = [
  { pattern: /starlink/i,                                      category: "starlink" },
  { pattern: /starship/i,                                      category: "starship" },
  { pattern: /falcon\s?9|falcon\s?heavy/i,                    category: "falcon"   },
  { pattern: /nasa/i,                                          category: "nasa"     },
  { pattern: /launch|rocket|orbit|liftoff|booster/i,          category: "launch"   },
  { pattern: /ipo|valuation|contract|investment|revenue|deal/i, category: "business"},
];

// SpaceX와 무관한 기사 필터링 (Grok, Tesla, AI 등 일론 머스크 관련 비우주 기사)
const SPACEX_RELEVANCE = /spacex|starship|starlink|falcon|rocket|launch|orbit|space\s*x|elon.{0,20}space|reusab|booster|raptor|boca\s*chica|starbase|nasa|faa|payload|satellite/i;
const IRRELEVANT_TOPICS = /grok|tesla|twitter|x\.com|neuralink|boring\s*company|doge|dogecoin|crypto|bitcoin|ai\s*chatbot|openai|chatgpt/i;

const SPACE_CORE = /spacex|starship|starlink|falcon|rocket|launch|orbit/i;

function isSpaceXRelevant(title: string, desc: string): boolean {
  const titleLower = title.toLowerCase();
  const irrelevantPos = titleLower.search(IRRELEVANT_TOPICS);
  const spacePos      = titleLower.search(SPACE_CORE);

  // Irrelevant topic appears before (or without) any space/rocket keyword in title → filter
  if (irrelevantPos !== -1 && (spacePos === -1 || irrelevantPos < spacePos)) return false;

  // Combined check: irrelevant AND no space relevance at all
  const text = `${title} ${desc}`;
  if (IRRELEVANT_TOPICS.test(text) && !SPACEX_RELEVANCE.test(text)) return false;

  return true;
}

function detectCategory(text: string): Category {
  for (const { pattern, category } of KEYWORD_MAP) {
    if (pattern.test(text)) return category;
  }
  return "general";
}

// ─── 출처별 DataLabel 결정 ───────────────────────────────────────────────────

const OFFICIAL_SOURCES = ["spacex.com", "nasa.gov", "faa.gov", "fcc.gov"];

function detectLabel(sourceUrl: string): DataLabel {
  if (OFFICIAL_SOURCES.some((s) => sourceUrl.includes(s))) return "REAL";
  return "PUBLIC DATA";
}

// ─── 메인 파서 ──────────────────────────────────────────────────────────────

export interface RSSArticle extends Article {
  externalUrl: string; // 원문 링크 (Google 리다이렉트 포함)
}

function parseRSS(xml: string): RSSArticle[] {
  const items: RSSArticle[] = [];
  const itemRe = /<item>([\s\S]*?)<\/item>/g;
  let match;
  let index = 0;

  // RSS에서 최대 40개 파싱 시도 → 필터 후 30개 확보
  while ((match = itemRe.exec(xml)) !== null && items.length < 30) {
    const itemXml = match[1];

    const rawTitle  = extractTag(itemXml, "title");
    const link      = extractTag(itemXml, "link") || extractTag(itemXml, "guid");
    const pubDate   = extractTag(itemXml, "pubDate");
    const desc      = extractTag(itemXml, "description");
    const srcInfo   = extractSource(itemXml);

    // "기사 제목 - 언론사" 분리 (언론사가 source 태그에 없을 때 보완)
    const { title, pub } = splitGoogleTitle(rawTitle);
    const sourceName = srcInfo.name !== "External" ? srcInfo.name : pub || "External";
    const sourceUrl  = srcInfo.url;

    // SpaceX 무관 기사 제외 (Grok, Tesla 등)
    const combined = `${title} ${desc}`;
    if (!isSpaceXRelevant(title, desc)) continue;

    const clean   = desc ? stripHTML(desc) : "";
    const excerpt = clean.length > 0 ? clean.slice(0, 200).trim() + "…" : "";

    const category  = detectCategory(combined);
    const dataLabel = detectLabel(sourceUrl);
    const publishedAt = toISO(pubDate);

    items.push({
      id: `rss-${index++}`,
      title,
      excerpt,
      category,
      dataLabel,
      slug: `rss-${Buffer.from(link).toString("base64url").slice(0, 32)}`,
      publishedAt,
      externalUrl: link,
      source: { name: sourceName, url: sourceUrl || link },
    });
  }

  return items;
}

// ─── 외부 호출 함수 ─────────────────────────────────────────────────────────

export interface FetchNewsResult {
  articles: RSSArticle[];
  ok: boolean;
  source: "rss" | "fallback";
  fetchedAt: string;
}

export async function fetchSpaceXNews(): Promise<FetchNewsResult> {
  try {
    const res = await fetch(RSS_URL, {
      headers: {
        // 일부 RSS 서버가 bot 차단 → 브라우저 UA 사용
        "User-Agent":
          "Mozilla/5.0 (compatible; OrbitNewsBot/1.0; +https://orbitnews.vercel.app)",
        Accept: "application/rss+xml, application/xml, text/xml",
      },
      // Next.js 캐시: 5분마다 재검증
      next: { revalidate: 300 },
    });

    if (!res.ok) throw new Error(`RSS responded ${res.status}`);

    const xml = await res.text();

    // Google News가 빈 피드를 줬는지 확인
    if (!xml.includes("<item>")) throw new Error("No items in RSS feed");

    const articles = parseRSS(xml);
    return { articles, ok: true, source: "rss", fetchedAt: new Date().toISOString() };
  } catch (err) {
    // 실패 시 빈 배열 반환 — 호출부에서 mock fallback 처리
    console.warn("[fetchSpaceXNews] RSS fetch failed:", err);
    return { articles: [], ok: false, source: "fallback", fetchedAt: new Date().toISOString() };
  }
}
