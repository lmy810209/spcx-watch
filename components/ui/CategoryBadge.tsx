import type { Category } from "@/lib/types";
import { CATEGORY_LABELS } from "@/lib/types";

const COLOR_MAP: Record<Category, string> = {
  launch: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  starlink: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  starship: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  falcon: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  nasa: "bg-red-500/20 text-red-400 border-red-500/30",
  business: "bg-green-500/20 text-green-400 border-green-500/30",
  general: "bg-zinc-500/20 text-zinc-400 border-zinc-500/30",
};

export default function CategoryBadge({ category }: { category: Category }) {
  return (
    <span
      className={`inline-block px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase border rounded-sm ${COLOR_MAP[category]}`}
    >
      {CATEGORY_LABELS[category]}
    </span>
  );
}
