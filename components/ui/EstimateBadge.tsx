import type { DataLabel } from "@/lib/types";

const STYLE_MAP: Record<DataLabel, string> = {
  "REAL":         "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
  "PUBLIC DATA":  "bg-sky-500/20     text-sky-300     border-sky-500/40",
  "COMMUNITY":    "bg-violet-500/20  text-violet-300  border-violet-500/40",
  "HYPOTHETICAL": "bg-amber-500/20   text-amber-300   border-amber-500/40",
  "ANALYSIS":     "bg-blue-500/20    text-blue-300    border-blue-500/40",
  "UNVERIFIED":   "bg-zinc-500/20    text-zinc-400    border-zinc-500/40",
};

const DOT_MAP: Record<DataLabel, string> = {
  "REAL":         "bg-emerald-400",
  "PUBLIC DATA":  "bg-sky-400",
  "COMMUNITY":    "bg-violet-400",
  "HYPOTHETICAL": "bg-amber-400",
  "ANALYSIS":     "bg-blue-400",
  "UNVERIFIED":   "bg-zinc-500",
};

export default function EstimateBadge({ label }: { label: DataLabel }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-1.5 py-0.5 text-[9px] font-bold tracking-widest uppercase border rounded-sm ${STYLE_MAP[label]}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${DOT_MAP[label]}`} />
      {label}
    </span>
  );
}
