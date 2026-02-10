import { Link } from "react-router-dom";
import { Shield, UserCheck, Activity, Lock, ArrowRight } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SentimentMap } from "@/components/dashboard/SentimentMap";
import { QuickStats } from "@/components/dashboard/QuickStats";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { CampusImpactScore } from "@/components/dashboard/CampusImpactScore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { UniversityBranding } from "@/components/ui/UniversityBranding";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Operational Header */}
        <div className="flex items-center justify-between border-b border-border/20 pb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">
              Operational <span className="text-glow-cyan text-primary">Command Center</span>
            </h1>
            <UniversityBranding size="sm" className="mt-2 mb-3 opacity-90" />
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-status-safe/10 border border-status-safe/20">
                <div className="w-1.5 h-1.5 bg-status-safe rounded-full animate-pulse" />
                <span className="text-xs font-medium text-status-safe font-mono">OPERATIONAL</span>
              </div>
              <span className="text-[10px] text-muted-foreground font-mono tracking-wider">
                VANI-OS v2.4.0
              </span>
            </div>
          </div>
        </div>

        {/* Access Control / Portal Entry Points */}
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="group hover:border-primary/30 hover:shadow-[0_0_30px_rgba(0,242,255,0.08)]">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-primary" strokeWidth={1.5} />
                  Student Portal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-6">
                  Access anonymous credentialing, evidence vault, and grievance submission.
                </p>
                <Link to="/identity">
                  <Button className="w-full bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                    Access Portal
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:border-void-amber/30 hover:shadow-[0_0_30px_rgba(245,158,11,0.08)]">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <Shield className="w-5 h-5 text-void-amber" strokeWidth={1.5} />
                  Administrative Oversight
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-6">
                  Restricted access for governance officers and resolution committees.
                </p>
                <Link to="/admin/login">
                  <Button className="w-full bg-void-amber/10 text-void-amber hover:bg-void-amber/20 border border-void-amber/20 group-hover:bg-void-amber group-hover:text-primary-foreground transition-all duration-500">
                    Secure Login
                    <Lock className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </ScrollReveal>

        {/* Live System Metrics */}
        <ScrollReveal delay={100}>
          <div>
            <h2 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.25em] mb-4 font-mono">
              Live Network Intelligence
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
              <div className="lg:col-span-4">
                <QuickStats />
              </div>
              <div className="lg:col-span-1">
                <CampusImpactScore />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <SentimentMap />
              </div>
              <div className="lg:col-span-1 space-y-6">
                <RecentActivity />
                
                {/* AI Branding Card */}
                <Card className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 shrink-0">
                        <div className="absolute inset-0 animate-gemini-rotate opacity-30">
                          <svg viewBox="0 0 24 24" className="w-full h-full">
                            <defs>
                              <linearGradient id="gemini-home-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#4285F4" />
                                <stop offset="50%" stopColor="#9B72CB" />
                                <stop offset="100%" stopColor="#D96570" />
                              </linearGradient>
                            </defs>
                            <circle cx="12" cy="12" r="10" fill="none" stroke="url(#gemini-home-gradient)" strokeWidth="1.5" strokeDasharray="8 4" />
                          </svg>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg viewBox="0 0 24 24" className="w-6 h-6">
                            <defs>
                              <linearGradient id="gemini-star-home" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#4285F4" />
                                <stop offset="50%" stopColor="#9B72CB" />
                                <stop offset="100%" stopColor="#D96570" />
                              </linearGradient>
                            </defs>
                            <path 
                              d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" 
                              fill="url(#gemini-star-home)"
                            />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">Powered by</p>
                        <p className="font-semibold bg-gradient-to-r from-[#4285F4] via-[#9B72CB] to-[#D96570] bg-clip-text text-transparent">
                          Google Gemini
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                      Advanced AI governance powered by Gemini 2.5 Flash.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </DashboardLayout>
  );
};

export default Index;
