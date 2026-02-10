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
    <header className="h-11 border-b bg-background/80 backdrop-blur-2xl flex items-center justify-between px-5" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2.5 text-xs text-muted-foreground font-mono">
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-subtle" />
          <span className="tracking-[0.15em] uppercase text-[10px]">Secure Channel Active</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden sm:flex items-center gap-3">
          <span className="text-[10px] text-muted-foreground/60 uppercase tracking-[0.2em] font-mono">
            Integrity
          </span>
          <div className="flex items-center gap-2">
            <Progress value={integrity} className="w-16 h-0.5 bg-secondary" />
            <span className="font-mono text-[11px] font-medium text-foreground/60 tabular-nums">
              {integrity}%
            </span>
          </div>
        </div>

        <div className="h-3 w-px bg-border/30 hidden sm:block" />

        <div className="flex items-center gap-2 text-[11px] font-mono text-foreground/50 tabular-nums">
          <span>{formatTime(currentTime)}</span>
          <span className="text-muted-foreground/30 hidden lg:inline">
            {formatDate(currentTime)}
          </span>
        </div>
      </div>
    </header>
  );
}
