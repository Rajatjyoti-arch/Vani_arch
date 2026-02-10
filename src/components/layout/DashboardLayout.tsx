import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";
import { UniversityFooter } from "./UniversityFooter";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="h-screen flex w-full bg-background overflow-hidden">
        <AppSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AppHeader />
          <main className="flex-1 overflow-auto smooth-scroll no-scrollbar">
            <div className="p-6 relative min-h-full">
              {/* The Void background */}
              <div className="absolute inset-0 pointer-events-none bg-[hsl(220,20%,4%)]" />
              {/* Radial grid glow */}
              <div className="absolute inset-0 pointer-events-none void-grid animate-grid-flow" />
              {/* Center radial glow */}
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_30%,hsl(187_100%_50%/0.04),transparent_70%)]" />
              <div className="relative z-10">
                {children}
              </div>
            </div>
            <UniversityFooter />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
