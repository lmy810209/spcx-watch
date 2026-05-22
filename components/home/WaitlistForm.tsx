"use client";

import { useState, useRef } from "react";
import { Mail, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

type Status = "idle" | "loading" | "success" | "duplicate" | "error";

export default function WaitlistForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = inputRef.current?.value.trim() ?? "";
    if (!email) return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message ?? "You're on the list.");
        if (inputRef.current) inputRef.current.value = "";
      } else if (data.code === "DUPLICATE") {
        setStatus("duplicate");
        setMessage("This email is already registered.");
      } else {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please check your connection.");
    }
  }

  const feedbackConfig = {
    success:   { icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
    duplicate: { icon: AlertCircle,  color: "text-amber-400",   bg: "bg-amber-500/10  border-amber-500/20"   },
    error:     { icon: AlertCircle,  color: "text-red-400",     bg: "bg-red-500/10    border-red-500/20"     },
  } as const;

  const feedback = status in feedbackConfig
    ? feedbackConfig[status as keyof typeof feedbackConfig]
    : null;

  return (
    <div className="w-full max-w-md">
      <p className="text-[11px] text-space-muted uppercase tracking-widest mb-2 font-semibold">
        IPO Alert List
      </p>
      <p className="text-sm text-space-body mb-3 leading-relaxed">
        Get notified when SpaceX files its S-1 and on key IPO milestones.
      </p>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-space-muted pointer-events-none" />
          <input
            ref={inputRef}
            type="email"
            name="email"
            placeholder="your@email.com"
            disabled={status === "loading" || status === "success"}
            required
            className="w-full pl-8 pr-3 py-2 text-sm bg-space-surface border border-space-border rounded-md text-space-primary placeholder:text-space-muted focus:outline-none focus:border-space-accent transition-colors disabled:opacity-50"
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold bg-space-accent text-white rounded-md hover:bg-blue-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {status === "loading" ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Send className="w-3.5 h-3.5" />
          )}
          {status === "success" ? "Done" : "Notify Me"}
        </button>
      </form>

      {feedback && message && (
        <div className={`flex items-start gap-2 mt-2 px-3 py-2 rounded-md text-[11px] border ${feedback.bg}`}>
          <feedback.icon className={`w-3.5 h-3.5 shrink-0 mt-px ${feedback.color}`} />
          <span className={feedback.color}>{message}</span>
        </div>
      )}
    </div>
  );
}
