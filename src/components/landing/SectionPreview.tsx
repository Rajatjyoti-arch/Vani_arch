import { useState, useEffect } from "react";
import {
  AlertTriangle,
  Network,
  Eye,
  Lock,
  FileCheck,
  Server,
  Scale,
  Users,
  FileText,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionPreviewProps {
  activeIndex: number;
}

const sections = [
  {
    id: "problem",
    title: "The Problem",
    subtitle: "Institutional Silence",
    color: "from-destructive/20 to-destructive/5",
    items: [
      { icon: AlertTriangle, label: "Fear of Retaliation", color: "text-destructive" },
      { icon: Network, label: "Broken Feedback Loops", color: "text-orange-500" },
      { icon: Eye, label: "Lack of Transparency", color: "text-slate-400" },
    ]
  },
  {
    id: "how-it-works",
    title: "Architecture of Trust",
    subtitle: "4-Step Process",
    color: "from-primary/20 to-accent/5",
    items: [
      { icon: Lock, label: "Secure Entry", color: "text-primary" },
      { icon: FileCheck, label: "Submission", color: "text-accent" },
      { icon: Server, label: "AI Processing", color: "text-status-info" },
      { icon: Scale, label: "Resolution", color: "text-status-warning" },
    ]
  },
  {
    id: "principles",
    title: "Core Principles",
    subtitle: "Security Architecture",
    color: "from-primary/15 to-status-info/10",
    items: [
      { icon: Users, label: "Anonymous Identity", color: "text-primary" },
      { icon: FileText, label: "Secure Evidence", color: "text-accent" },
      { icon: Activity, label: "Real-time Analytics", color: "text-status-info" },
    ]
  },
  {
    id: "ai",
    title: "AI Partnership",
    subtitle: "Google Gemini",
    color: "from-[#4285F4]/20 via-[#9B72CB]/10 to-[#D96570]/10",
    items: [
      { icon: Scale, label: "AI-Powered Resolution", color: "text-[#4285F4]" },
      { icon: Users, label: "Irene Assistant", color: "text-[#9B72CB]" },
      { icon: Activity, label: "Intelligent Analytics", color: "text-[#D96570]" },
    ]
  },
  {
    id: "team",
    title: "Team CYNOX",
    subtitle: "The Builders",
    color: "from-foreground/10 to-muted/20",
    items: [
      { icon: Users, label: "Rajatjyoti", color: "text-foreground/70" },
      { icon: Users, label: "Priyanshu", color: "text-foreground/70" },
      { icon: Users, label: "Sakshi", color: "text-foreground/70" },
      { icon: Users, label: "Mantavya", color: "text-foreground/70" },
    ]
  },
];

export const SectionPreview = ({ activeIndex }: SectionPreviewProps) => {
  return (
    <div className="relative w-full h-full">
      {sections.map((section, index) => (
        <div
          key={section.id}
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ease-out",
            index === activeIndex 
              ? "opacity-100 scale-100 translate-y-0" 
              : "opacity-0 scale-95 translate-y-4 pointer-events-none"
          )}
        >
          {/* Background gradient */}
          <div className={cn(
            "absolute inset-0 rounded-2xl bg-gradient-to-br",
            section.color
          )} />
          
          {/* Content */}
          <div className="relative z-10 text-center px-6 py-8">
            <h3 className="text-lg font-bold text-foreground/90 mb-1">
              {section.title}
            </h3>
            <p className="text-xs text-muted-foreground mb-6">
              {section.subtitle}
            </p>
            
            {/* Icons grid */}
            <div className={cn(
              "flex items-center justify-center gap-4 flex-wrap",
              section.items.length === 4 ? "max-w-[200px]" : ""
            )}>
              {section.items.map((item, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex flex-col items-center gap-1.5 transition-all duration-500",
                    index === activeIndex ? "animate-fade-in" : ""
                  )}
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="w-10 h-10 rounded-lg bg-background/80 border border-border/50 flex items-center justify-center shadow-sm">
                    <item.icon className={cn("w-5 h-5", item.color)} />
                  </div>
                  <span className="text-[10px] text-muted-foreground/80 max-w-[60px] text-center leading-tight">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
      
      {/* Section indicators */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
        {sections.map((_, index) => (
          <div
            key={index}
            className={cn(
              "w-1.5 h-1.5 rounded-full transition-all duration-300",
              index === activeIndex 
                ? "bg-primary w-4" 
                : "bg-muted-foreground/30"
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default SectionPreview;
