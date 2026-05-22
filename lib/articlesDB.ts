import { createServerClient, isSupabaseConfigured } from "./supabase";
import type { Article, Category } from "./types";
import type { RSSArticle } from "./fetchNews";

/**
 * Supabase `articles` 테이블 스키마 (Supabase SQL editor에서 1회 실행)
 *
 * ```sql
 * create table if not exists articles (
 *   id bigserial primary key,
 *   slug text unique not null,
 *   external_url text unique not null,
 *   title text not null,
 *   excerpt text,
 *   category text not null,
 *   data_label text not null,
 *   published_at timestamptz not null,
 *   image_url text,
 *   image_source text,
 *   source_name text,
 *   source_url text,
 *   created_at timestamptz default now()
 * );
 * create index if not exists idx_articles_published_at on articles (published_at desc);
 * create index if not exists idx_articles_category on articles (category);
 * create index if not exists idx_articles_image_source on articles (image_source);
 * ```
 */

interface ArticleRow {
  slug: string;
  external_url: string;
  title: string;
  excerpt: string | null;
  category: string;
  data_label: string;
  published_at: string;
  image_url: string | null;
  image_source: string | null;
  source_name: string | null;
  source_url: string | null;
}

function toRow(a: RSSArticle): ArticleRow {
  return {
    slug: a.slug,
    external_url: a.externalUrl,
    title: a.title,
    excerpt: a.excerpt || null,
    category: a.category,
    data_label: a.dataLabel,
    published_at: a.publishedAt,
    image_url: a.imageUrl ?? null,
    image_source: a.imageSource ?? null,
    source_name: a.source?.name ?? null,
    source_url: a.source?.url ?? null,
  };
}

function fromRow(r: ArticleRow): RSSArticle {
  return {
    id: `db-${r.external_url.slice(-32)}`,
    slug: r.slug,
    externalUrl: r.external_url,
    title: r.title,
    excerpt: r.excerpt ?? "",
    category: r.category as Category,
    dataLabel: r.data_label as Article["dataLabel"],
    publishedAt: r.published_at,
    imageUrl: r.image_url ?? undefined,
    imageSource: (r.image_source as Article["imageSource"]) ?? undefined,
    source: r.source_name
      ? { name: r.source_name, url: r.source_url ?? "" }
      : undefined,
  };
}

/** 새로 fetch한 기사들을 DB에 upsert (external_url 기준 중복 skip) */
export async function saveArticles(articles: RSSArticle[]): Promise<number> {
  if (articles.length === 0) return 0;
  if (!isSupabaseConfigured()) return 0;
  try {
    const supabase = createServerClient();
    const rows = articles.map(toRow);

    const { error, count } = await supabase
      .from("articles")
      .upsert(rows, { onConflict: "external_url", ignoreDuplicates: true, count: "exact" });

    if (error) {
      console.warn("[articlesDB] saveArticles error:", error.message);
      return 0;
    }
    return count ?? 0;
  } catch (err) {
    console.warn("[articlesDB] saveArticles failed:", err);
    return 0;
  }
}

/** 최근 기사 N개 (DB에 있는 모든 기사 중 최신순) */
export async function getRecentArticles(limit = 50): Promise<RSSArticle[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .order("published_at", { ascending: false })
      .limit(limit);

    if (error || !data) {
      console.warn("[articlesDB] getRecentArticles error:", error?.message);
      return [];
    }
    return (data as ArticleRow[]).map(fromRow);
  } catch (err) {
    console.warn("[articlesDB] getRecentArticles failed:", err);
    return [];
  }
}

/** 카테고리별 기사 */
export async function getArticlesByCategory(
  category: Category,
  limit = 30
): Promise<RSSArticle[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("category", category)
      .order("published_at", { ascending: false })
      .limit(limit);

    if (error || !data) return [];
    return (data as ArticleRow[]).map(fromRow);
  } catch {
    return [];
  }
}

/** 페이지네이션: cursor(=마지막 published_at) 이전 기사들 */
export async function getArticlesBefore(
  cursor: string,
  limit = 20
): Promise<RSSArticle[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .lt("published_at", cursor)
      .order("published_at", { ascending: false })
      .limit(limit);

    if (error || !data) return [];
    return (data as ArticleRow[]).map(fromRow);
  } catch {
    return [];
  }
}
