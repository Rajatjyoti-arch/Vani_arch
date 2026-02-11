import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { AppHeader } from "./AppHeader";
import { UniversityFooter } from "./UniversityFooter";
import dashboardBg from "@/assets/dashboard-bg.png";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="h-screen flex w-full overflow-hidden relative">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img src={dashboardBg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        <AppSidebar />
        <div className="flex-1 flex flex-col overflow-hidden relative z-10">
          <AppHeader />
          <main className="flex-1 overflow-auto smooth-scroll no-scrollbar">
            <div className="p-6 relative min-h-full">
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
