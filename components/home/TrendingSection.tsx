import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/types";
import { CATEGORY_LABELS } from "@/lib/types";
import { formatTimeAgo } from "@/lib/articles";
import EstimateBadge from "@/components/ui/EstimateBadge";

export default function TrendingSection({ articles }: { articles: Article[] }) {
  return (
    <aside>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-space-muted">
          🔥 Trending
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {articles.map((article, i) => {
          const isFirst = i === 0;
          return (
            <Link
              key={article.id}
              href={`/article/${article.slug}`}
              className="card-space group overflow-hidden block"
            >
              {/* Image — full width, taller for #1 */}
              <div className={`relative w-full ${isFirst ? "h-44" : "h-32"} bg-space-elevated overflow-hidden`}>
                {article.imageUrl ? (
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-space-elevated to-space-surface" />
                )}
                {/* Rank badge */}
                <span className="absolute top-2 left-2 w-6 h-6 rounded-sm bg-space-accent text-white text-[11px] font-black flex items-center justify-center leading-none">
                  {i + 1}
                </span>
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-space-surface/80 via-transparent to-transparent" />
              </div>

              {/* Text */}
              <div className="p-3">
                <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                  <span className="text-[9px] font-bold tracking-widest uppercase text-space-accent">
                    {CATEGORY_LABELS[article.category]}
                  </span>
                  <span className="text-[9px] text-space-muted">·</span>
                  <span className="text-[9px] text-space-muted">{formatTimeAgo(article.publishedAt)}</span>
                  <EstimateBadge label={article.dataLabel} />
                </div>
                <p className={`font-bold text-space-primary group-hover:text-white leading-snug transition-colors ${isFirst ? "text-sm" : "text-[13px]"} line-clamp-2`}>
                  {article.title}
                </p>
                {isFirst && article.excerpt && (
                  <p className="text-[11px] text-space-body mt-1.5 line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
