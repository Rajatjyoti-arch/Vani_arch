import { Link } from "react-router-dom";
import { Shield, UserCheck, Lock, ArrowRight } from "lucide-react";
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
        {/* Header */}
        <div className="flex items-center justify-between pb-6" style={{ borderBottom: '0.5px solid rgba(255,255,255,0.04)' }}>
          <div>
            <h1 className="font-serif text-2xl font-light text-foreground tracking-tight">
              Operational Command Center
            </h1>
            <UniversityBranding size="sm" className="mt-2 mb-3 opacity-70" />
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.02)', border: '0.5px solid rgba(255,255,255,0.06)' }}>
                <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse-subtle" />
                <span className="text-[10px] font-mono text-foreground/40 tracking-[0.15em]">OPERATIONAL</span>
              </div>
              <span className="text-[10px] text-foreground/15 font-mono tracking-wider">
                v2.4.0
              </span>
            </div>
          </div>
        </div>

        {/* Portal Cards */}
        <ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="group">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2 text-foreground/60">
                  <UserCheck className="w-4 h-4 text-accent" strokeWidth={1} />
                  Student Portal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-foreground/25 mb-6 leading-relaxed">
                  Access anonymous credentialing, evidence vault, and grievance submission.
                </p>
                <Link to="/identity">
                  <Button className="w-full bg-accent/10 text-accent hover:bg-accent/20 transition-all duration-700 text-xs tracking-wide" style={{ border: '0.5px solid rgba(255,255,255,0.06)' }}>
                    Access Portal
                    <ArrowRight className="w-3 h-3 ml-2" strokeWidth={1} />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="group">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2 text-foreground/60">
                  <Shield className="w-4 h-4 text-sovereign-gold" strokeWidth={1} />
                  Administrative Oversight
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-foreground/25 mb-6 leading-relaxed">
                  Restricted access for governance officers and resolution committees.
                </p>
                <Link to="/admin/login">
                  <Button className="w-full bg-sovereign-gold/10 text-sovereign-gold hover:bg-sovereign-gold/15 transition-all duration-700 text-xs tracking-wide" style={{ border: '0.5px solid rgba(255,255,255,0.06)' }}>
                    Secure Login
                    <Lock className="w-3 h-3 ml-2" strokeWidth={1} />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </ScrollReveal>

        {/* Metrics */}
        <ScrollReveal delay={100}>
          <div>
            <h2 className="text-[10px] font-mono text-foreground/20 uppercase tracking-[0.25em] mb-4">
              Network Intelligence
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
              <div className="lg:col-span-4"><QuickStats /></div>
              <div className="lg:col-span-1"><CampusImpactScore /></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2"><SentimentMap /></div>
              <div className="lg:col-span-1 space-y-4">
                <RecentActivity />
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-8 h-8 shrink-0">
                        <div className="absolute inset-0 animate-gemini-rotate opacity-20">
                          <svg viewBox="0 0 24 24" className="w-full h-full">
                            <defs>
                              <linearGradient id="gemini-home-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#4285F4" />
                                <stop offset="50%" stopColor="#9B72CB" />
                                <stop offset="100%" stopColor="#D96570" />
                              </linearGradient>
                            </defs>
                            <circle cx="12" cy="12" r="10" fill="none" stroke="url(#gemini-home-gradient)" strokeWidth="1" strokeDasharray="8 4" />
                          </svg>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg viewBox="0 0 24 24" className="w-4 h-4">
                            <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="rgba(255,255,255,0.2)" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <p className="text-[9px] text-foreground/20 font-mono tracking-[0.2em] uppercase">Powered by</p>
                        <p className="text-xs font-medium text-foreground/40">Google Gemini</p>
                      </div>
                    </div>
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
