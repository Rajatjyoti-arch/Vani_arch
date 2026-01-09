import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Shield,
  Lock,
  Scale,
  ArrowRight,
  Users,
  Eye,
  FileText,
  Server,
  Activity,
  CheckCircle,
  AlertTriangle,
  FileCheck,
  Network,
  Building2
} from "lucide-react";
import { VaniLogo } from "@/components/ui/VaniLogo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useStudentSession } from "@/contexts/StudentSessionContext";

const LandingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useStudentSession();
  const [activeSection, setActiveSection] = useState(0);
  const [taglineIndex, setTaglineIndex] = useState(0);
  
  const taglines = [
    "Anonymous, yet accountable",
    "Truth without fear",
    "Governance without bias"
  ];

  const sectionNames = ["VANI", "Problem", "Architecture", "Principles", "AI Partner"];

  // Auto-cycle taglines
  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Auto-cycle sections
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % 5);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleEnterSystem = () => {
    navigate("/portal");
  };

  const goToSection = (index: number) => {
    setActiveSection(index);
  };

  // Section 1: The Problem
  const ProblemSection = () => (
    <div className="h-full w-full flex items-center justify-center px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              The Problem: <span className="text-destructive/80">Institutional Silence</span>
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-lg bg-background/50 border border-border/50">
                <AlertTriangle className="w-6 h-6 text-destructive shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Fear of Retaliation</h3>
                  <p className="text-sm text-muted-foreground">Valid grievances go unreported because whistleblowers fear academic or professional backlash.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-lg bg-background/50 border border-border/50">
                <Network className="w-6 h-6 text-orange-500 shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Broken Feedback Loops</h3>
                  <p className="text-sm text-muted-foreground">Reports get lost in bureaucracy with no way to track progress or ensure accountability.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-lg bg-background/50 border border-border/50">
                <Eye className="w-6 h-6 text-slate-500 shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Lack of Transparency</h3>
                  <p className="text-sm text-muted-foreground">Decisions are made behind closed doors without data-driven justification.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 blur-3xl opacity-30" />
            <Card className="relative border-primary/20 bg-card/80 backdrop-blur-sm shadow-2xl">
              <CardContent className="p-6 space-y-6">
                <h3 className="text-xl font-bold text-foreground mb-4">How VANI Fixes This</h3>
                <div className="relative pl-6 border-l-2 border-primary/20 space-y-6">
                  <div className="relative">
                    <div className="absolute -left-[29px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                    <h4 className="font-semibold text-primary mb-1 text-sm">Cryptographic Anonymity</h4>
                    <p className="text-xs text-muted-foreground">Identity is hashed (SHA-256). We verify *who* you are without knowing *which* one you are.</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[29px] top-0 w-4 h-4 rounded-full bg-accent border-4 border-background" />
                    <h4 className="font-semibold text-accent mb-1 text-sm">Immutable Evidence</h4>
                    <p className="text-xs text-muted-foreground">All submissions are encrypted and time-stamped. Nothing gets "lost".</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[29px] top-0 w-4 h-4 rounded-full bg-foreground border-4 border-background" />
                    <h4 className="font-semibold text-foreground mb-1 text-sm">AI-Assisted Resolution</h4>
                    <p className="text-xs text-muted-foreground">Unbiased algorithms categorize issues and suggest fair resolutions.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );

  // Section 2: How It Works
  const ArchitectureSection = () => (
    <div className="h-full w-full flex items-center justify-center px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Architecture of Trust</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From submission to resolution, every step is designed for security and accountability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-border to-transparent -z-10" />

          {[
            { icon: Lock, title: "1. Secure Entry", desc: "Zero-knowledge proofs verify credentials without revealing identity.", color: "text-primary" },
            { icon: FileCheck, title: "2. Submission", desc: "Grievance is encrypted; metadata is stripped.", color: "text-accent" },
            { icon: Server, title: "3. AI Processing", desc: "VANI AI analyzes, categorizes urgency, and routes.", color: "text-status-info" },
            { icon: Scale, title: "4. Resolution", desc: "Admins resolve. Outcome recorded on public ledger.", color: "text-status-warning" }
          ].map((step, i) => (
            <div key={i} className="group relative bg-background/50 rounded-xl p-4 cursor-default">
              <div className="w-14 h-14 mx-auto bg-card border border-border rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:border-primary/30 transition-all duration-300">
                <step.icon className={cn("w-7 h-7", step.color)} />
              </div>
              <h3 className="text-base font-bold text-center mb-2">{step.title}</h3>
              <p className="text-xs text-muted-foreground text-center">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Section 3: Core Principles
  const PrinciplesSection = () => (
    <div className="h-full w-full flex items-center justify-center px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Core Principles</h2>
          <p className="text-muted-foreground">The pillars of our secure governance architecture</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="group border-border/50 bg-card/50 hover:bg-card hover:border-primary/30 transition-all duration-300">
            <CardContent className="p-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-all duration-300">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">Anonymous Identity</h3>
              <p className="text-sm text-muted-foreground">
                SHA-256 hashing creates irreversible identity tokens. Your right to speak is verified, your identity remains private.
              </p>
            </CardContent>
          </Card>

          <Card className="group border-border/50 bg-card/50 hover:bg-card hover:border-accent/30 transition-all duration-300">
            <CardContent className="p-6">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-all duration-300">
                <FileText className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-lg font-bold mb-2">Secure Evidence</h3>
              <p className="text-sm text-muted-foreground">
                Military-grade encryption protects all documentation. Tamper-proof vault accessible only to authorized committees.
              </p>
            </CardContent>
          </Card>

          <Card className="group border-border/50 bg-card/50 hover:bg-card hover:border-status-info/30 transition-all duration-300">
            <CardContent className="p-6">
              <div className="w-10 h-10 rounded-lg bg-status-info/10 flex items-center justify-center mb-4 group-hover:bg-status-info/20 transition-all duration-300">
                <Activity className="w-5 h-5 text-status-info" />
              </div>
              <h3 className="text-lg font-bold mb-2">Real-time Analytics</h3>
              <p className="text-sm text-muted-foreground">
                Live dashboards track institutional health. Sentiment analysis provides early warnings for systemic issues.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  // Section 4: AI Partnership
  const AIPartnerSection = () => (
    <div className="h-full w-full flex items-center justify-center px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#4285F4]/10 border border-[#4285F4]/20 mb-4">
            <span className="flex h-2 w-2 rounded-full bg-[#4285F4] animate-pulse" />
            <span className="text-xs font-medium bg-gradient-to-r from-[#4285F4] via-[#9B72CB] to-[#D96570] bg-clip-text text-transparent tracking-wide uppercase">AI-Powered Governance</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Powered by{" "}
            <span className="bg-gradient-to-r from-[#4285F4] via-[#9B72CB] to-[#D96570] bg-clip-text text-transparent">
              Google Gemini
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="group border-[#4285F4]/20 bg-card/50 hover:bg-card hover:border-[#4285F4]/40 transition-all duration-300">
            <CardContent className="p-5 flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#4285F4]/10 flex items-center justify-center shrink-0">
                <Scale className="w-5 h-5 text-[#4285F4]" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1 text-sm">AI-Powered Resolution</h3>
                <p className="text-xs text-muted-foreground">Three specialized AI agents collaborate for fair, unbiased resolutions.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="group border-[#9B72CB]/20 bg-card/50 hover:bg-card hover:border-[#9B72CB]/40 transition-all duration-300">
            <CardContent className="p-5 flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#9B72CB]/10 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 text-[#9B72CB]" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1 text-sm">Irene - Compliance Guide</h3>
                <p className="text-xs text-muted-foreground">AI assistant powered by Gemini for real-time policy guidance.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="group border-[#D96570]/20 bg-card/50 hover:bg-card hover:border-[#D96570]/40 transition-all duration-300">
            <CardContent className="p-5 flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#D96570]/10 flex items-center justify-center shrink-0">
                <Activity className="w-5 h-5 text-[#D96570]" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1 text-sm">Intelligent Analytics</h3>
                <p className="text-xs text-muted-foreground">Pattern recognition identifies systemic issues proactively.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center justify-center gap-4 mt-8">
          <svg viewBox="0 0 24 24" className="w-8 h-8">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <div className="text-left">
            <p className="text-xs text-muted-foreground">Official Technology Partner</p>
            <p className="font-semibold bg-gradient-to-r from-[#4285F4] via-[#9B72CB] to-[#D96570] bg-clip-text text-transparent">
              Google Cloud AI
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Section 1: VANI Hero (formerly Team)
  const VANIHeroSection = () => (
    <div className="h-full w-full flex items-center justify-center px-6 py-20">
      <div className="max-w-4xl mx-auto text-center">
        {/* System Status */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-medium text-emerald-500 tracking-wide uppercase">System Operational</span>
        </div>

        {/* VANI Logo & Title */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <VaniLogo variant="icon" size="lg" />
          <h1
            className="text-6xl md:text-7xl font-semibold text-foreground"
            style={{ letterSpacing: '0.15em' }}
          >
            VANI
          </h1>
        </div>

        {/* Rotating Tagline */}
        <div className="h-8 mb-3 overflow-hidden">
          <p className="text-xl font-light text-primary/80 transition-all duration-500">
            {taglines[taglineIndex]}
          </p>
        </div>

        <p className="text-base text-muted-foreground/80 mb-8">
          Verifiable Anonymous Network Intelligence
        </p>

        {/* University Branding */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <Building2 className="w-5 h-5 text-primary/60" />
          <span className="text-sm font-medium text-foreground/80">Central University of Jammu</span>
        </div>

        {/* Team CYNOX */}
        <div className="pt-8 border-t border-border/30">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-6">Built by Team CYNOX</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {["Rajatjyoti Biswas", "Priyanshu Gupta", "Sakshi", "Mantavya Kumar"].map((member) => (
              <div key={member} className="flex flex-col items-center gap-3 group cursor-default">
                <div className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center shadow-sm group-hover:border-primary/50 group-hover:shadow-lg transition-all duration-300">
                  <Users className="w-6 h-6 text-muted-foreground/50 group-hover:text-primary/50 transition-colors duration-300" />
                </div>
                <span className="font-medium text-foreground text-sm group-hover:text-primary transition-colors duration-300">{member}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const sections = [VANIHeroSection, ProblemSection, ArchitectureSection, PrinciplesSection, AIPartnerSection];

  return (
    <div className="h-screen w-screen overflow-hidden relative bg-background">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      <div className="absolute inset-0 -z-20 institutional-grid opacity-[0.03]" />

      {/* Fixed Header */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => goToSection(0)}>
            <VaniLogo variant="icon" size="sm" />
            <div className="flex flex-col leading-tight">
              <span className="font-semibold text-foreground tracking-[0.15em] uppercase text-sm">VANI</span>
              <span className="text-[10px] text-muted-foreground/60 hidden sm:block">Central University of Jammu</span>
            </div>
          </div>
          
          {/* CTA Buttons in Header */}
          <div className="flex items-center gap-3">
            <Button
              onClick={() => goToSection(2)}
              variant="ghost"
              size="sm"
              className="hidden md:inline-flex text-muted-foreground hover:text-foreground"
            >
              Learn How It Works
            </Button>
            <Button
              onClick={handleEnterSystem}
              size="sm"
              className="group/btn shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 bg-primary hover:bg-primary/90"
            >
              Enter System
              <ArrowRight className="ml-1.5 w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Slideshow Container - Full Screen */}
      <div className="absolute inset-0 z-0 pt-16">
        {sections.map((Section, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-all duration-1000 ease-in-out",
              index === activeSection
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105 pointer-events-none"
            )}
          >
            <Section />
          </div>
        ))}
      </div>


      {/* Section Indicators */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-background/60 backdrop-blur-md px-4 py-2 rounded-full border border-border/50">
        {sectionNames.map((name, i) => (
          <button
            key={i}
            onClick={() => goToSection(i)}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300",
              i === activeSection
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            )}
          >
            <span className={cn(
              "w-2 h-2 rounded-full transition-all",
              i === activeSection ? "bg-primary-foreground" : "bg-current"
            )} />
            <span className="text-xs font-medium hidden md:block">{name}</span>
          </button>
        ))}
      </div>

      {/* Footer Links (Mobile) */}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 flex gap-4 text-xs text-muted-foreground md:hidden">
        <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy</Link>
        <Link to="/gdpr-compliance" className="hover:text-primary transition-colors">GDPR</Link>
        <Link to="/help" className="hover:text-primary transition-colors">Docs</Link>
      </div>

      {/* Copyright */}
      <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-40 text-[10px] text-muted-foreground/50">
        © {new Date().getFullYear()} Team CYNOX • Central University of Jammu
      </div>
    </div>
  );
};

export default LandingPage;
