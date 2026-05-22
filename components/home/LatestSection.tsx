import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/types";
import { CATEGORY_LABELS } from "@/lib/types";
import { formatTimeAgo } from "@/lib/articles";
import { ExternalLink } from "lucide-react";

type ArticleWithExternal = Article & { externalUrl?: string };

export default function LatestSection({ articles }: { articles: ArticleWithExternal[] }) {
  return (
    <aside>
      <div className="flex items-center justify-between mb-3 px-0.5">
        <h2 className="text-[10px] font-bold tracking-[0.2em] uppercase text-space-muted">
          🕐 Latest
        </h2>
      </div>

      <div className="flex flex-col gap-1">
        {articles.map((article) => {
          const isExternal = !!article.externalUrl;
          const href = isExternal ? article.externalUrl! : `/article/${article.slug}`;

          const inner = (
            <div className="card-space group flex gap-3 p-3">
              {/* Thumbnail */}
              <div className="relative shrink-0 w-20 h-14 rounded overflow-hidden bg-space-elevated">
                {article.imageUrl ? (
                  <Image
                    src={article.imageUrl}
                    alt=""
                    width={80}
                    height={56}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-space-elevated to-space-surface" />
                )}
                {article.imageSource === "stock" && (
                  <span className="absolute bottom-0 left-0 right-0 px-1 py-0.5 text-[7px] font-bold tracking-wider uppercase bg-black/60 text-white/80 text-center">
                    관련 자료
                  </span>
                )}
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0 flex flex-col justify-center gap-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[9px] font-bold tracking-widest uppercase text-space-accent">
                    {CATEGORY_LABELS[article.category]}
                  </span>
                  <span className="text-[9px] text-space-muted">
                    {formatTimeAgo(article.publishedAt)}
                  </span>
                  {isExternal && <ExternalLink className="w-2.5 h-2.5 text-space-muted" />}
                </div>
                <p className="text-[12px] font-semibold text-space-body group-hover:text-space-primary leading-snug line-clamp-2 transition-colors">
                  {article.title}
                </p>
                {article.source && (
                  <span className="text-[10px] text-space-muted">{article.source.name}</span>
                )}
              </div>
            </div>
          );

          return isExternal ? (
            <a key={article.id} href={href} target="_blank" rel="noopener noreferrer">
              {inner}
            </a>
          ) : (
            <Link key={article.id} href={href}>{inner}</Link>
          );
        })}
      </div>

      <Link
        href="/latest"
        className="mt-3 block py-2 text-center text-xs text-space-muted hover:text-space-accent border border-space-border hover:border-space-accent/40 rounded-lg transition-colors"
      >
        View all articles →
      </Link>
    </aside>
  );
}
