import type { Article, Category, DataLabel } from "./types";

// ─── RSS Feed URLs ──────────────────────────────────────────────────────────
// Direct space-news feeds with embedded images (<media:content> or HTML <img> in content:encoded)
const DIRECT_FEEDS = [
  { url: "https://arstechnica.com/space/feed/",         source: "Ars Technica",        skipFilter: true  },
  { url: "https://www.space.com/feeds/all",             source: "Space.com",           skipFilter: false },
  { url: "https://spaceflightnow.com/feed/",            source: "Spaceflight Now",     skipFilter: true  },
  { url: "https://www.nasaspaceflight.com/feed/",       source: "NASASpaceflight",     skipFilter: true  },
];

// Google News broad-coverage feeds (no embedded images, uses OG fallback)
const GOOGLE_FEEDS = [
  "https://news.google.com/rss/search?q=SpaceX&hl=en-US&gl=US&ceid=US:en",
  "https://news.google.com/rss/search?q=%22Elon+Musk%22+SpaceX&hl=en-US&gl=US&ceid=US:en",
];

// ─── XML utilities ──────────────────────────────────────────────────────────

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

function extractSource(itemXml: string): { name: string; url: string } {
  const re = /<source\s+url="([^"]*)"[^>]*>([^<]*)<\/source>/i;
  const m = itemXml.match(re);
  if (m) return { url: m[1], name: m[2].trim() };
  return { name: "External", url: "" };
}

/** Skip emoji, tracking pixels, icons */
const JUNK_IMAGE_PATTERNS = [
  /s\.w\.org\/images\/core\/emoji/i,
  /\/wp-content\/plugins\//i,
  /\/feed\/icon/i,
  /gravatar\.com/i,
  /pixel\.gif$/i,
  /\.svg$/i,
];

function isJunkImage(url: string): boolean {
  return JUNK_IMAGE_PATTERNS.some((p) => p.test(url));
}

function normalizeImageUrl(url: string): string {
  // http→https (Spaceflight Now serves images as http)
  if (url.startsWith("http://")) return "https://" + url.slice(7);
  return url;
}

/** Extract embedded image URL — checks media tags first, then <content:encoded>/<description> HTML <img> */
function extractMediaImage(itemXml: string): string | undefined {
  // <media:content url="..." type="image/..."> — prefer larger width
  const contents: { url: string; width: number }[] = [];
  const mcRe = /<media:content\s[^>]*url="([^"]+)"[^>]*/gi;
  let m: RegExpExecArray | null;
  while ((m = mcRe.exec(itemXml)) !== null) {
    const wMatch = m[0].match(/width="(\d+)"/);
    const typeMatch = m[0].match(/type="image\//i);
    const mediumMatch = m[0].match(/medium="image"/i);
    if (typeMatch || mediumMatch) {
      contents.push({ url: m[1], width: wMatch ? parseInt(wMatch[1]) : 0 });
    }
  }
  if (contents.length > 0) {
    contents.sort((a, b) => b.width - a.width);
    return normalizeImageUrl(contents[0].url);
  }

  // <media:thumbnail url="...">
  const mt = itemXml.match(/<media:thumbnail\s[^>]*url="([^"]+)"/i);
  if (mt && !isJunkImage(mt[1])) return normalizeImageUrl(mt[1]);

  // <enclosure url="..." type="image/...">
  const enc = itemXml.match(/<enclosure\s[^>]*url="([^"]+)"[^>]*type="image\/[^"]+"/i);
  if (enc && !isJunkImage(enc[1])) return normalizeImageUrl(enc[1]);

  // Fallback: parse HTML <img> from <content:encoded> or <description>
  // Spaceflight Now / NASASpaceflight embed images here, not in media tags
  const html = extractTag(itemXml, "content:encoded") || extractTag(itemXml, "description");
  if (html) {
    const imgs: { url: string; width: number }[] = [];
    const imgRe = /<img\s[^>]*src="([^"]+\.(?:jpg|jpeg|png|webp))"[^>]*/gi;
    let im: RegExpExecArray | null;
    while ((im = imgRe.exec(html)) !== null) {
      const url = im[1];
      if (isJunkImage(url)) continue;
      const wMatch = im[0].match(/width="(\d+)"/);
      imgs.push({ url, width: wMatch ? parseInt(wMatch[1]) : 0 });
    }
    if (imgs.length > 0) {
      // Prefer largest width; if none have width attrs, take the first
      imgs.sort((a, b) => b.width - a.width);
      return normalizeImageUrl(imgs[0].url);
    }
  }

  return undefined;
}

function splitGoogleTitle(raw: string): { title: string; pub: string } {
  const idx = raw.lastIndexOf(" - ");
  if (idx > 0) {
    return { title: raw.slice(0, idx).trim(), pub: raw.slice(idx + 3).trim() };
  }
  return { title: raw, pub: "" };
}

function toISO(pubDate: string): string {
  try {
    return new Date(pubDate).toISOString();
  } catch {
    return new Date().toISOString();
  }
}

// ─── Category detection ─────────────────────────────────────────────────────

const KEYWORD_MAP: { pattern: RegExp; category: Category }[] = [
  { pattern: /starlink/i,                                        category: "starlink" },
  { pattern: /starship/i,                                        category: "starship" },
  { pattern: /falcon\s?9|falcon\s?heavy/i,                      category: "falcon"   },
  { pattern: /nasa/i,                                            category: "nasa"     },
  { pattern: /launch|rocket|orbit|liftoff|booster/i,            category: "launch"   },
  { pattern: /ipo|valuation|flotation|contract|investment|revenue|deal|stock/i, category: "business" },
];

// SpaceX 직접 관련 키워드 — 이 중 하나는 제목 또는 첫 문장에 반드시 포함되어야 통과
const STRICT_SPACEX = /spacex|space\s*x|starship|starlink|falcon\s?9|falcon\s?heavy|raptor\s+engine|boca\s*chica|starbase|crew\s*dragon|cargo\s*dragon|elon\s+musk/i;

const IRRELEVANT_TOPICS = /grok|tesla|twitter|x\.com|neuralink|boring\s*company|doge|dogecoin|crypto|bitcoin|ai\s*chatbot|openai|chatgpt|mandalorian|star\s*wars|for\s*all\s*mankind|binoculars?\s*review|telescope\s*review|conspiracy|astrology|horoscope/i;

function isSpaceXRelevant(title: string, desc: string): boolean {
  // SpaceX 직접 키워드가 제목/본문 어디든 있어야 통과
  const text = `${title} ${desc}`;
  if (!STRICT_SPACEX.test(text)) return false;

  // 무관 주제가 SpaceX 키워드보다 앞에 오면 거부 (e.g. "Mandalorian Lego rocket")
  const titleLower = title.toLowerCase();
  const irrelevantPos = titleLower.search(IRRELEVANT_TOPICS);
  const spacexPos    = titleLower.search(STRICT_SPACEX);
  if (irrelevantPos !== -1 && (spacexPos === -1 || irrelevantPos < spacexPos)) return false;

  return true;
}

function detectCategory(text: string): Category {
  for (const { pattern, category } of KEYWORD_MAP) {
    if (pattern.test(text)) return category;
  }
  return "general";
}

// ─── DataLabel ──────────────────────────────────────────────────────────────

const OFFICIAL_SOURCES = ["spacex.com", "nasa.gov", "faa.gov", "fcc.gov"];

function detectLabel(sourceUrl: string): DataLabel {
  if (OFFICIAL_SOURCES.some((s) => sourceUrl.includes(s))) return "REAL";
  return "PUBLIC DATA";
}

// ─── RSS parser ─────────────────────────────────────────────────────────────

export interface RSSArticle extends Article {
  externalUrl: string;
}

function parseRSS(
  xml: string,
  opts: { skipFilter?: boolean; fallbackSource?: string } = {}
): RSSArticle[] {
  const items: RSSArticle[] = [];
  const itemRe = /<item>([\s\S]*?)<\/item>/g;
  let match;
  let index = 0;

  while ((match = itemRe.exec(xml)) !== null && items.length < 30) {
    const itemXml = match[1];

    const rawTitle = extractTag(itemXml, "title");
    const link     = extractTag(itemXml, "link") || extractTag(itemXml, "guid");
    const pubDate  = extractTag(itemXml, "pubDate");
    const desc     = extractTag(itemXml, "description");
    const srcInfo  = extractSource(itemXml);

    const { title, pub } = splitGoogleTitle(rawTitle);
    const sourceName = srcInfo.name !== "External" ? srcInfo.name : pub || opts.fallbackSource || "External";
    const sourceUrl  = srcInfo.url;

    if (!opts.skipFilter && !isSpaceXRelevant(title, desc)) continue;

    const clean   = desc ? stripHTML(desc) : "";
    const excerpt = clean.length > 0 ? clean.slice(0, 200).trim() + "…" : "";

    const combined    = `${title} ${desc}`;
    const category    = detectCategory(combined);
    const dataLabel   = detectLabel(sourceUrl);
    const publishedAt = toISO(pubDate);
    const imageUrl    = extractMediaImage(itemXml);

    const article: RSSArticle = {
      id: `rss-${index++}`,
      title,
      excerpt,
      category,
      dataLabel,
      slug: `rss-${Buffer.from(link).toString("base64url").slice(0, 32)}`,
      publishedAt,
      externalUrl: link,
      source: { name: sourceName, url: sourceUrl || link },
    };
    if (imageUrl) {
      article.imageUrl = imageUrl;
      article.imageSource = "rss";
    }

    items.push(article);
  }

  return items;
}

// ─── Fetch helpers ──────────────────────────────────────────────────────────

const RSS_HEADERS = {
  "User-Agent": "Mozilla/5.0 (compatible; OrbitNewsBot/1.0; +https://spcxwatch.vercel.app)",
  Accept: "application/rss+xml, application/xml, text/xml, */*",
};

async function fetchFeed(
  url: string,
  opts: { skipFilter?: boolean; fallbackSource?: string } = {}
): Promise<RSSArticle[]> {
  const res = await fetch(url, { headers: RSS_HEADERS, next: { revalidate: 300 } });
  if (!res.ok) throw new Error(`RSS ${url} responded ${res.status}`);
  const xml = await res.text();
  if (!xml.includes("<item>")) return [];
  return parseRSS(xml, opts);
}

// ─── Main export ─────────────────────────────────────────────────────────────

export interface FetchNewsResult {
  articles: RSSArticle[];
  ok: boolean;
  source: "rss" | "fallback";
  fetchedAt: string;
}

/** RSS 6개 피드 fetch + 중복 제거 (DB 미사용, 순수 라이브) */
async function fetchLiveArticles(): Promise<RSSArticle[]> {
  const allSettled = await Promise.allSettled([
    ...DIRECT_FEEDS.map((f) =>
      fetchFeed(f.url, { skipFilter: f.skipFilter, fallbackSource: f.source })
    ),
    ...GOOGLE_FEEDS.map((url) => fetchFeed(url)),
  ]);

  const allArticles: RSSArticle[] = [];
  for (const result of allSettled) {
    if (result.status === "fulfilled") allArticles.push(...result.value);
  }

  const seen = new Set<string>();
  const merged: RSSArticle[] = [];
  for (const art of allArticles) {
    const key = art.title.toLowerCase().slice(0, 60);
    if (!seen.has(key)) {
      seen.add(key);
      merged.push(art);
    }
  }

  merged.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  return merged.slice(0, 50);
}

/**
 * 메인 호출: RSS fetch → DB upsert → DB에서 최근 N개 반환.
 * DB 사용 불가 시 RSS 결과를 그대로 반환 (graceful fallback).
 */
export async function fetchSpaceXNews(limit = 50): Promise<FetchNewsResult> {
  try {
    const liveArticles = await fetchLiveArticles();
    if (liveArticles.length === 0) throw new Error("No articles from any feed");

    // DB 모듈은 동적 임포트 — Supabase env 없을 때 빌드 깨지지 않도록
    let dbArticles: RSSArticle[] = [];
    let dbOk = false;
    try {
      const { saveArticles, getRecentArticles } = await import("./articlesDB");
      const saved = await saveArticles(liveArticles);
      dbArticles = await getRecentArticles(limit);
      dbOk = dbArticles.length > 0;
      console.log(`[fetchSpaceXNews] live=${liveArticles.length} saved=${saved} db=${dbArticles.length}`);
    } catch (dbErr) {
      console.warn("[fetchSpaceXNews] DB unavailable, using live only:", dbErr);
    }

    const articles = dbOk ? dbArticles : liveArticles;
    return { articles, ok: true, source: "rss", fetchedAt: new Date().toISOString() };
  } catch (err) {
    console.warn("[fetchSpaceXNews] RSS fetch failed:", err);
    return { articles: [], ok: false, source: "fallback", fetchedAt: new Date().toISOString() };
  }
}
