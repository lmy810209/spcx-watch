"use client";

import { Share2, Check } from "lucide-react";
import { useState } from "react";

export default function ShareButton({ scenarioId }: { scenarioId: string }) {
  const [copied, setCopied] = useState(false);

  function handleClick() {
    const url = `${window.location.origin}/community#${scenarioId}`;
    navigator.clipboard?.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <button
      onClick={handleClick}
      className="shrink-0 p-1.5 text-space-muted hover:text-space-accent rounded transition-colors"
      title="Copy link"
    >
      {copied ? (
        <Check className="w-3.5 h-3.5 text-emerald-400" />
      ) : (
        <Share2 className="w-3.5 h-3.5" />
      )}
    </button>
  );
}
