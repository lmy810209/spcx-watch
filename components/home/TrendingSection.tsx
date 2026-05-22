import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/types";
import CategoryBadge from "@/components/ui/CategoryBadge";
import EstimateBadge from "@/components/ui/EstimateBadge";

export default function TrendingSection({ articles }: { articles: Article[] }) {
  return (
    <aside className="flex flex-col gap-1">
      <h2 className="text-[10px] font-bold tracking-[0.2em] uppercase text-space-muted mb-3 px-1">
        🔥 Trending
      </h2>

      {articles.map((article, i) => (
        <Link
          key={article.id}
          href={`/article/${article.slug}`}
          className="card-space group flex gap-3 p-3"
        >
          {/* Rank number */}
          <span className="shrink-0 w-7 h-7 flex items-center justify-center text-xl font-black text-space-border group-hover:text-space-muted transition-colors leading-none">
            {i + 1}
          </span>

          {/* Thumbnail */}
          <div className="shrink-0 w-16 h-12 rounded overflow-hidden bg-space-elevated flex items-center justify-center">
            {article.imageUrl ? (
              <Image
                src={article.imageUrl}
                alt=""
                width={64}
                height={48}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-space-elevated to-space-surface" />
            )}
          </div>

          {/* Text */}
          <div className="flex flex-col gap-1 min-w-0">
            <div className="flex items-center gap-1 flex-wrap">
              <CategoryBadge category={article.category} />
              <EstimateBadge label={article.dataLabel} />
            </div>
            <p className="text-sm font-semibold text-space-primary group-hover:text-white leading-snug line-clamp-2 transition-colors">
              {article.title}
            </p>
            {article.viewCount && (
              <span className="text-[11px] text-space-muted">
                {article.viewCount.toLocaleString()} views
              </span>
            )}
          </div>
        </Link>
      ))}
    </aside>
  );
}
