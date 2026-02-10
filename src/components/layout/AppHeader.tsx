import { useState, useEffect } from "react";
import { Activity, Clock, Shield } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function AppHeader() {
  const [integrity, setIntegrity] = useState(97);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setIntegrity((prev) => {
        const change = Math.random() > 0.5 ? 1 : -1;
        return Math.max(94, Math.min(99, prev + change));
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-US", {
      hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
    });

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-US", {
      weekday: "short", month: "short", day: "2-digit", year: "numeric",
    });

  return (
    <header className="h-12 border-b border-border/30 bg-[hsl(220,20%,4%)/0.8] backdrop-blur-xl flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground font-mono">
          <div className="relative flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <Shield className="w-3 h-3 text-primary/60" strokeWidth={1.5} />
            <span className="text-primary/70 tracking-widest">VANI://SECURE_CHANNEL</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden sm:flex items-center gap-3">
          <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-mono">
            SYS_INTEGRITY
          </span>
          <div className="flex items-center gap-2">
            <Progress value={integrity} className="w-20 h-1 bg-secondary" />
            <span
              className={`
                font-mono text-xs font-bold transition-all duration-500
                ${integrity >= 97 ? "text-status-safe text-glow-cyan" : integrity >= 95 ? "text-status-warning" : "text-status-critical"}
              `}
            >
              {integrity}%
            </span>
          </div>
        </div>

        <div className="h-4 w-px bg-border/30 hidden sm:block" />

        <div className="flex items-center gap-2 text-xs font-mono">
          <Clock className="w-3 h-3 text-muted-foreground/50" strokeWidth={1.5} />
          <span className="text-primary/80 tabular-nums">{formatTime(currentTime)}</span>
          <span className="text-muted-foreground/40 hidden lg:inline">
            {formatDate(currentTime)}
          </span>
        </div>
      </div>
    </header>
  );
}
