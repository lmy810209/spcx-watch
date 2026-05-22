import Link from "next/link";
import { MOCK_ARTICLES } from "@/lib/articles";
import { fetchSpaceXNews } from "@/lib/fetchNews";
import CategoryBadge from "@/components/ui/CategoryBadge";
import EstimateBadge from "@/components/ui/EstimateBadge";
import { ArrowLeft, ExternalLink, Wifi, WifiOff } from "lucide-react";
import { formatTimeAgo } from "@/lib/articles";
import type { Metadata } from "next";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Latest Articles — SPCX Watch",
  description: "Full archive of SpaceX IPO news and scenario analysis articles.",
};

const PAGE_SIZE = 30;

interface PageProps {
  searchParams: { before?: string };
}

export default async function LatestPage({ searchParams }: PageProps) {
  const cursor = searchParams.before;

  // 첫 페이지는 fetchSpaceXNews (RSS fetch + DB upsert + DB 읽기)
  // 이후 페이지는 DB에서 cursor 이전 기사
  let articles;
  let isLive = false;
  let totalShown = 0;

  if (cursor) {
    try {
      const { getArticlesBefore } = await import("@/lib/articlesDB");
      const older = await getArticlesBefore(cursor, PAGE_SIZE);
      articles = older.length > 0 ? older : MOCK_ARTICLES;
      isLive = older.length > 0;
      totalShown = older.length;
    } catch {
      articles = MOCK_ARTICLES;
    }
  } else {
    const rssResult = await fetchSpaceXNews(PAGE_SIZE);
    isLive = rssResult.ok && rssResult.articles.length > 0;
    articles = isLive ? rssResult.articles : MOCK_ARTICLES;
    totalShown = rssResult.articles.length;
  }

  const oldestPublishedAt = articles[articles.length - 1]?.publishedAt;
  const hasNext = isLive && articles.length === PAGE_SIZE && oldestPublishedAt;

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-space-muted hover:text-space-primary transition-colors mb-6"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Home
      </Link>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-space-primary">
          {cursor ? "Older Articles" : "Latest Articles"}
        </h1>
        <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] ${
          isLive
            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
            : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
        }`}>
          {isLive
            ? <><Wifi className="w-3 h-3" /> {totalShown} articles</>
            : <><WifiOff className="w-3 h-3" /> Cached</>
          }
        </div>
      </div>

      <div className="divide-y divide-space-border">
        {articles.map((article) => {
          const isExternal = "externalUrl" in article;
          const href = isExternal
            ? (article as { externalUrl: string }).externalUrl
            : `/article/${article.slug}`;

          return (
            <a
              key={article.id}
              href={href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className="group flex items-start gap-4 py-4 hover:bg-space-surface/50 px-2 -mx-2 rounded-lg transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap mb-1.5">
                  <CategoryBadge category={article.category} />
                  <EstimateBadge label={article.dataLabel} />
                  <span className="text-[10px] text-space-muted">
                    {formatTimeAgo(article.publishedAt)}
                  </span>
                </div>
                <h2 className="text-sm font-semibold text-space-primary group-hover:text-white leading-snug line-clamp-2 transition-colors mb-1">
                  {article.title}
                </h2>
                <p className="text-xs text-space-body line-clamp-1">
                  {article.excerpt}
                </p>
              </div>

              <div className="shrink-0 flex flex-col items-end gap-1 pt-0.5">
                {article.source && (
                  <span className="text-[10px] text-space-muted">
                    {article.source.name}
                  </span>
                )}
                {isExternal && (
                  <ExternalLink className="w-3 h-3 text-space-muted" />
                )}
              </div>
            </a>
          );
        })}
      </div>

      {/* Pagination */}
      {hasNext && (
        <div className="mt-8 flex justify-center">
          <Link
            href={`/latest?before=${encodeURIComponent(oldestPublishedAt)}`}
            className="px-6 py-2.5 text-sm text-space-muted hover:text-space-accent border border-space-border hover:border-space-accent/40 rounded-lg transition-colors"
          >
            Older Articles →
          </Link>
        </div>
      )}
      {cursor && (
        <div className="mt-4 flex justify-center">
          <Link
            href="/latest"
            className="text-xs text-space-muted hover:text-space-accent transition-colors"
          >
            ← Back to most recent
          </Link>
        </div>
      )}
    </main>
  );
}
