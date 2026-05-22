import Link from "next/link";
import type { Article } from "@/lib/types";
import CategoryBadge from "@/components/ui/CategoryBadge";
import EstimateBadge from "@/components/ui/EstimateBadge";
import { formatTimeAgo } from "@/lib/articles";
import { Clock, ExternalLink } from "lucide-react";

type ArticleWithExternal = Article & { externalUrl?: string };

export default function LatestSection({ articles }: { articles: ArticleWithExternal[] }) {
  return (
    <aside className="flex flex-col gap-1">
      <h2 className="text-[10px] font-bold tracking-[0.2em] uppercase text-space-muted mb-3 px-1">
        🕐 Latest
      </h2>

      {articles.map((article, i) => {
        const isExternal = !!article.externalUrl;
        const href = isExternal ? article.externalUrl! : `/article/${article.slug}`;

        const inner = (
          <div className="card-space group relative flex flex-col gap-1.5 p-3">
            {/* Timeline dot + line */}
            <div className="absolute left-1 top-4 bottom-0 flex flex-col items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-space-border group-hover:bg-space-accent transition-colors" />
              {i < articles.length - 1 && (
                <span className="w-px flex-1 bg-space-border mt-1" />
              )}
            </div>

            <div className="pl-4">
              <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                <CategoryBadge category={article.category} />
                <EstimateBadge label={article.dataLabel} />
                <span className="inline-flex items-center gap-1 text-[10px] text-space-muted">
                  <Clock className="w-2.5 h-2.5" />
                  {formatTimeAgo(article.publishedAt)}
                </span>
                {isExternal && (
                  <ExternalLink className="w-2.5 h-2.5 text-space-muted" />
                )}
              </div>

              <p className="text-sm font-semibold text-space-body group-hover:text-space-primary leading-snug line-clamp-2 transition-colors">
                {article.title}
              </p>

              {article.source && (
                <span className="text-[10px] text-space-muted mt-0.5 block">
                  {article.source.name}
                </span>
              )}
            </div>
          </div>
        );

        return isExternal ? (
          <a
            key={article.id}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {inner}
          </a>
        ) : (
          <Link key={article.id} href={href}>
            {inner}
          </Link>
        );
      })}

      <Link
        href="/latest"
        className="mt-2 mx-1 py-2 text-center text-xs text-space-muted hover:text-space-accent border border-space-border hover:border-space-accent/40 rounded-lg transition-colors"
      >
        View all articles →
      </Link>
    </aside>
  );
}
