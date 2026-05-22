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

export default async function LatestPage() {
  const rssResult = await fetchSpaceXNews();
  const isLive = rssResult.ok && rssResult.articles.length > 0;

  const articles = isLive
    ? [...rssResult.articles, ...MOCK_ARTICLES]
    : MOCK_ARTICLES;

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Back */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-space-muted hover:text-space-primary transition-colors mb-6"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Home
      </Link>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-space-primary">Latest Articles</h1>
        <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] ${
          isLive
            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
            : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
        }`}>
          {isLive
            ? <><Wifi className="w-3 h-3" /> Live RSS — {rssResult.articles.length}</>
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
    </main>
  );
}
