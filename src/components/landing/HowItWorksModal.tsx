import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Lock,
  Scale,
  Users,
  Eye,
  FileText,
  Server,
  Activity,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  ArrowDown,
  Zap,
  Database,
  Bot,
  UserCheck,
  FileCheck,
  Network,
  Fingerprint,
  MessageSquare,
  BarChart3,
  Clock,
  Target,
  Layers,
  GitBranch,
  ShieldCheck,
  Bell,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface HowItWorksModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const HowItWorksModal = ({ open, onOpenChange }: HowItWorksModalProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl h-[85vh] p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-6 py-4 border-b border-border/50 bg-background/95 backdrop-blur-sm">
          <DialogTitle className="text-xl font-bold flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            VANI Platform Documentation
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
          <div className="px-6 py-2 border-b border-border/30 bg-secondary/30">
            <TabsList className="bg-transparent gap-1 h-auto p-0 flex-wrap">
              <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs px-3 py-1.5">
                Overview
              </TabsTrigger>
              <TabsTrigger value="features" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs px-3 py-1.5">
                Features
              </TabsTrigger>
              <TabsTrigger value="workflow" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs px-3 py-1.5">
                Workflow
              </TabsTrigger>
              <TabsTrigger value="architecture" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs px-3 py-1.5">
                Architecture
              </TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs px-3 py-1.5">
                Security
              </TabsTrigger>
              <TabsTrigger value="faq" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs px-3 py-1.5">
                FAQ
              </TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-6">
              {/* Overview Tab */}
              <TabsContent value="overview" className="mt-0 space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Verifiable Anonymous Network Intelligence
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    A secure, AI-powered platform for anonymous institutional grievance reporting and transparent resolution.
                  </p>
                </div>

                {/* Key Statistics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {[
                    { label: "Encryption", value: "AES-256", icon: Lock },
                    { label: "Hash Algorithm", value: "SHA-256", icon: Fingerprint },
                    { label: "AI Model", value: "Gemini", icon: Bot },
                    { label: "Anonymity", value: "100%", icon: UserCheck },
                  ].map((stat, i) => (
                    <Card key={i} className="border-border/50 bg-card/50">
                      <CardContent className="p-4 text-center">
                        <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                        <div className="text-lg font-bold text-foreground">{stat.value}</div>
                        <div className="text-xs text-muted-foreground">{stat.label}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Core Principles */}
                <Card className="border-primary/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Target className="w-5 h-5 text-primary" />
                      Core Principles
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid md:grid-cols-3 gap-4">
                    {[
                      { 
                        title: "Data Integrity",
                        desc: "All submissions are cryptographically secured and tamper-proof",
                        icon: Database,
                        color: "text-blue-500"
                      },
                      { 
                        title: "Institutional Transparency",
                        desc: "Resolution outcomes are publicly recorded on an immutable ledger",
                        icon: Eye,
                        color: "text-green-500"
                      },
                      { 
                        title: "Policy Compliance",
                        desc: "AI-driven verification ensures adherence to university policies",
                        icon: FileCheck,
                        color: "text-amber-500"
                      },
                    ].map((principle, i) => (
                      <div key={i} className="p-4 rounded-lg bg-secondary/30 border border-border/30">
                        <principle.icon className={cn("w-8 h-8 mb-3", principle.color)} />
                        <h4 className="font-semibold text-foreground mb-1">{principle.title}</h4>
                        <p className="text-xs text-muted-foreground">{principle.desc}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Quick Start Flow */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Zap className="w-5 h-5 text-primary" />
                      Quick Start Guide
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      {[
                        { step: "1", title: "Create Credential", desc: "Generate anonymous identity" },
                        { step: "2", title: "Submit Report", desc: "Describe your concern" },
                        { step: "3", title: "Upload Evidence", desc: "Attach supporting files" },
                        { step: "4", title: "Track Resolution", desc: "Monitor progress" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 flex-1">
                          <div className="flex flex-col items-center">
                            <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                              {item.step}
                            </div>
                            {i < 3 && (
                              <ArrowDown className="w-4 h-4 text-muted-foreground my-1 md:hidden" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h5 className="font-medium text-foreground text-sm">{item.title}</h5>
                            <p className="text-xs text-muted-foreground">{item.desc}</p>
                          </div>
                          {i < 3 && (
                            <ArrowRight className="w-5 h-5 text-muted-foreground hidden md:block" />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Features Tab */}
              <TabsContent value="features" className="mt-0 space-y-6">
                <h2 className="text-xl font-bold text-foreground mb-4">Platform Features</h2>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    {
                      title: "Anonymous Credentialing",
                      icon: UserCheck,
                      badge: "Identity",
                      color: "bg-blue-500/10 text-blue-500",
                      features: [
                        "SHA-256 cryptographic hashing",
                        "Zero-knowledge identity verification",
                        "Local credential storage",
                        "Untraceable ghost names",
                        "Trust score system"
                      ]
                    },
                    {
                      title: "Evidence Repository",
                      icon: Shield,
                      badge: "Storage",
                      color: "bg-green-500/10 text-green-500",
                      features: [
                        "AES-256 file encryption",
                        "LSB steganography embedding",
                        "Multiple format support",
                        "Tamper-proof storage",
                        "Redundant data backup"
                      ]
                    },
                    {
                      title: "Governance Matrix",
                      icon: Scale,
                      badge: "Resolution",
                      color: "bg-purple-500/10 text-purple-500",
                      features: [
                        "AI-powered mediation",
                        "Three-agent deliberation",
                        "Priority escalation protocol",
                        "Automated conflict resolution",
                        "Fair outcome generation"
                      ]
                    },
                    {
                      title: "Compliance Assistant (Irene)",
                      icon: Bot,
                      badge: "AI",
                      color: "bg-amber-500/10 text-amber-500",
                      features: [
                        "Powered by Google Gemini",
                        "Real-time policy guidance",
                        "Natural language processing",
                        "24/7 availability",
                        "Context-aware responses"
                      ]
                    },
                    {
                      title: "Public Ledger",
                      icon: FileText,
                      badge: "Transparency",
                      color: "bg-cyan-500/10 text-cyan-500",
                      features: [
                        "Immutable resolution records",
                        "Cryptographic certificates",
                        "Public verification",
                        "Audit trail logging",
                        "Timestamp verification"
                      ]
                    },
                    {
                      title: "Sentiment Analytics",
                      icon: BarChart3,
                      badge: "Insights",
                      color: "bg-rose-500/10 text-rose-500",
                      features: [
                        "Campus zone heat mapping",
                        "Trend analysis",
                        "Early warning system",
                        "Pattern recognition",
                        "Real-time dashboards"
                      ]
                    },
                  ].map((feature, i) => (
                    <Card key={i} className="border-border/50">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base flex items-center gap-2">
                            <div className={cn("p-2 rounded-lg", feature.color)}>
                              <feature.icon className="w-4 h-4" />
                            </div>
                            {feature.title}
                          </CardTitle>
                          <Badge variant="secondary" className="text-[10px]">
                            {feature.badge}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-1.5">
                          {feature.features.map((f, j) => (
                            <li key={j} className="flex items-center gap-2 text-xs text-muted-foreground">
                              <CheckCircle className="w-3 h-3 text-green-500 shrink-0" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Workflow Tab */}
              <TabsContent value="workflow" className="mt-0 space-y-6">
                <h2 className="text-xl font-bold text-foreground mb-4">User Journey & Workflow</h2>

                {/* Main Workflow Diagram */}
                <Card className="border-primary/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <GitBranch className="w-5 h-5 text-primary" />
                      Grievance Resolution Flow
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      {/* Flow Diagram */}
                      <div className="flex flex-col gap-4">
                        {/* Row 1: User Entry */}
                        <div className="flex items-center justify-center gap-4">
                          <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 text-center min-w-[140px]">
                            <Users className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                            <span className="text-sm font-medium text-foreground">User Entry</span>
                            <p className="text-[10px] text-muted-foreground mt-1">Portal Selection</p>
                          </div>
                          <ArrowRight className="w-6 h-6 text-muted-foreground" />
                          <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-center min-w-[140px]">
                            <Fingerprint className="w-6 h-6 text-green-500 mx-auto mb-2" />
                            <span className="text-sm font-medium text-foreground">Authentication</span>
                            <p className="text-[10px] text-muted-foreground mt-1">SHA-256 Hash</p>
                          </div>
                          <ArrowRight className="w-6 h-6 text-muted-foreground" />
                          <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30 text-center min-w-[140px]">
                            <FileText className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                            <span className="text-sm font-medium text-foreground">Submission</span>
                            <p className="text-[10px] text-muted-foreground mt-1">Report & Evidence</p>
                          </div>
                        </div>

                        {/* Arrow Down */}
                        <div className="flex justify-center">
                          <ArrowDown className="w-6 h-6 text-muted-foreground" />
                        </div>

                        {/* Row 2: Processing */}
                        <div className="flex items-center justify-center gap-4">
                          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-center min-w-[140px]">
                            <Server className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                            <span className="text-sm font-medium text-foreground">AI Processing</span>
                            <p className="text-[10px] text-muted-foreground mt-1">Categorization</p>
                          </div>
                          <ArrowRight className="w-6 h-6 text-muted-foreground" />
                          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-center min-w-[140px]">
                            <Scale className="w-6 h-6 text-rose-500 mx-auto mb-2" />
                            <span className="text-sm font-medium text-foreground">Resolution</span>
                            <p className="text-[10px] text-muted-foreground mt-1">AI Mediation</p>
                          </div>
                          <ArrowRight className="w-6 h-6 text-muted-foreground" />
                          <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-center min-w-[140px]">
                            <CheckCircle className="w-6 h-6 text-cyan-500 mx-auto mb-2" />
                            <span className="text-sm font-medium text-foreground">Outcome</span>
                            <p className="text-[10px] text-muted-foreground mt-1">Public Record</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Resolution Matrix Detail */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Layers className="w-5 h-5 text-primary" />
                      AI Resolution Matrix
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                            <Bot className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground text-sm">Student Advocate</h4>
                            <p className="text-[10px] text-muted-foreground">Represents student interests</p>
                          </div>
                        </div>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          <li>• Presents grievance details</li>
                          <li>• Argues for student rights</li>
                          <li>• Proposes resolutions</li>
                        </ul>
                      </div>

                      <div className="p-4 rounded-lg bg-amber-500/5 border border-amber-500/20">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center">
                            <Bot className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground text-sm">Admin Representative</h4>
                            <p className="text-[10px] text-muted-foreground">Represents institution</p>
                          </div>
                        </div>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          <li>• Considers policy constraints</li>
                          <li>• Evaluates feasibility</li>
                          <li>• Proposes alternatives</li>
                        </ul>
                      </div>

                      <div className="p-4 rounded-lg bg-purple-500/5 border border-purple-500/20">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                            <Bot className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground text-sm">Resolution Officer</h4>
                            <p className="text-[10px] text-muted-foreground">Neutral mediator</p>
                          </div>
                        </div>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          <li>• Ensures fair process</li>
                          <li>• Triggers escalation</li>
                          <li>• Finalizes outcome</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Status Flow */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      Report Status Lifecycle
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      {[
                        { status: "Submitted", color: "bg-blue-500" },
                        { status: "Under Review", color: "bg-amber-500" },
                        { status: "In Mediation", color: "bg-purple-500" },
                        { status: "Pending Action", color: "bg-orange-500" },
                        { status: "Resolved", color: "bg-green-500" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-border/50">
                            <div className={cn("w-2 h-2 rounded-full", item.color)} />
                            <span className="text-xs font-medium text-foreground">{item.status}</span>
                          </div>
                          {i < 4 && <ArrowRight className="w-4 h-4 text-muted-foreground" />}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Architecture Tab */}
              <TabsContent value="architecture" className="mt-0 space-y-6">
                <h2 className="text-xl font-bold text-foreground mb-4">System Architecture</h2>

                {/* Architecture Diagram */}
                <Card className="border-primary/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Network className="w-5 h-5 text-primary" />
                      High-Level Architecture
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      {/* Client Layer */}
                      <div className="space-y-3">
                        <div className="text-center p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
                          <h4 className="font-semibold text-blue-500 text-sm">Client Layer</h4>
                        </div>
                        <div className="space-y-2">
                          {["React SPA", "Local Encryption", "Credential Storage", "Real-time Updates"].map((item, i) => (
                            <div key={i} className="p-2 rounded bg-secondary/30 text-xs text-muted-foreground text-center">
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* API Layer */}
                      <div className="space-y-3">
                        <div className="text-center p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                          <h4 className="font-semibold text-green-500 text-sm">API Layer</h4>
                        </div>
                        <div className="space-y-2">
                          {["Edge Functions", "Authentication", "AI Gateway", "File Processing"].map((item, i) => (
                            <div key={i} className="p-2 rounded bg-secondary/30 text-xs text-muted-foreground text-center">
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Data Layer */}
                      <div className="space-y-3">
                        <div className="text-center p-3 rounded-lg bg-purple-500/10 border border-purple-500/30">
                          <h4 className="font-semibold text-purple-500 text-sm">Data Layer</h4>
                        </div>
                        <div className="space-y-2">
                          {["PostgreSQL DB", "Encrypted Storage", "Audit Logs", "Public Ledger"].map((item, i) => (
                            <div key={i} className="p-2 rounded bg-secondary/30 text-xs text-muted-foreground text-center">
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Technology Stack */}
                <div className="grid md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Layers className="w-4 h-4 text-primary" />
                        Frontend Stack
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {[
                        { name: "React 18", desc: "Component-based UI framework" },
                        { name: "TypeScript", desc: "Type-safe development" },
                        { name: "Tailwind CSS", desc: "Utility-first styling" },
                        { name: "shadcn/ui", desc: "Accessible component library" },
                        { name: "React Query", desc: "Server state management" },
                      ].map((tech, i) => (
                        <div key={i} className="flex items-center justify-between p-2 rounded bg-secondary/30">
                          <span className="text-sm font-medium text-foreground">{tech.name}</span>
                          <span className="text-xs text-muted-foreground">{tech.desc}</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Server className="w-4 h-4 text-primary" />
                        Backend Stack
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {[
                        { name: "Lovable Cloud", desc: "Managed backend infrastructure" },
                        { name: "PostgreSQL", desc: "Relational database" },
                        { name: "Edge Functions", desc: "Serverless compute" },
                        { name: "Google Gemini", desc: "AI/ML processing" },
                        { name: "Row Level Security", desc: "Fine-grained access control" },
                      ].map((tech, i) => (
                        <div key={i} className="flex items-center justify-between p-2 rounded bg-secondary/30">
                          <span className="text-sm font-medium text-foreground">{tech.name}</span>
                          <span className="text-xs text-muted-foreground">{tech.desc}</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                {/* Data Flow */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Activity className="w-4 h-4 text-primary" />
                      Data Flow Diagram
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 bg-secondary/20 rounded-lg border border-border/30">
                      <div className="text-center space-y-4">
                        <div className="flex items-center justify-center gap-4 flex-wrap">
                          <Badge variant="outline" className="px-3 py-1">User Input</Badge>
                          <ArrowRight className="w-4 h-4 text-muted-foreground" />
                          <Badge variant="outline" className="px-3 py-1 bg-blue-500/10">Client Encryption</Badge>
                          <ArrowRight className="w-4 h-4 text-muted-foreground" />
                          <Badge variant="outline" className="px-3 py-1 bg-green-500/10">API Validation</Badge>
                          <ArrowRight className="w-4 h-4 text-muted-foreground" />
                          <Badge variant="outline" className="px-3 py-1 bg-purple-500/10">Secure Storage</Badge>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          All data is encrypted at rest and in transit using industry-standard protocols
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Security Tab */}
              <TabsContent value="security" className="mt-0 space-y-6">
                <h2 className="text-xl font-bold text-foreground mb-4">Security & Privacy</h2>

                {/* Security Features */}
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="border-green-500/20">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-green-500" />
                        Encryption Standards
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {[
                        { title: "AES-256 Encryption", desc: "Military-grade file encryption for all evidence" },
                        { title: "SHA-256 Hashing", desc: "One-way cryptographic identity transformation" },
                        { title: "TLS 1.3", desc: "Secure data transmission protocol" },
                        { title: "End-to-End Encryption", desc: "Data encrypted from client to storage" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3 p-2 rounded bg-green-500/5">
                          <Lock className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          <div>
                            <h5 className="text-sm font-medium text-foreground">{item.title}</h5>
                            <p className="text-xs text-muted-foreground">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="border-blue-500/20">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Fingerprint className="w-5 h-5 text-blue-500" />
                        Anonymity Guarantees
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {[
                        { title: "Zero-Knowledge Architecture", desc: "System cannot access original identity" },
                        { title: "Local Credential Storage", desc: "Identity data never leaves your device" },
                        { title: "Metadata Stripping", desc: "All identifying metadata removed from files" },
                        { title: "Ghost Name System", desc: "Randomized display names for interactions" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3 p-2 rounded bg-blue-500/5">
                          <UserCheck className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                          <div>
                            <h5 className="text-sm font-medium text-foreground">{item.title}</h5>
                            <p className="text-xs text-muted-foreground">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                {/* Emergency Protocols */}
                <Card className="border-amber-500/20">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-amber-500" />
                      Emergency Protocols
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-amber-500/5 border border-amber-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Bell className="w-4 h-4 text-amber-500" />
                          <h5 className="font-medium text-foreground text-sm">Dead Man's Switch</h5>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Automatic evidence release mechanism activated if the user fails to check in within a specified timeframe. Ensures evidence preservation even under duress.
                        </p>
                      </div>
                      <div className="p-4 rounded-lg bg-rose-500/5 border border-rose-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Globe className="w-4 h-4 text-rose-500" />
                          <h5 className="font-medium text-foreground text-sm">Emergency Disclosure</h5>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Fail-safe that automatically publishes evidence to the Public Archive if critical concerns are not addressed through normal resolution processes within defined timeframes.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Compliance */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <FileCheck className="w-5 h-5 text-primary" />
                      Compliance & Standards
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "GDPR Compliant",
                        "UGC Guidelines",
                        "RTI Compatible",
                        "ISO 27001 Aligned",
                        "Audit Trail Enabled",
                        "Data Minimization",
                      ].map((badge, i) => (
                        <Badge key={i} variant="secondary" className="px-3 py-1">
                          <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* FAQ Tab */}
              <TabsContent value="faq" className="mt-0 space-y-6">
                <h2 className="text-xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>

                <div className="space-y-3">
                  {[
                    {
                      q: "Can my identity be traced from my credential?",
                      a: "No. Your credential is generated using one-way SHA-256 hashing. It is mathematically impossible to reverse the hash to obtain your original institutional ID. Even system administrators cannot access your real identity."
                    },
                    {
                      q: "What happens to my submitted evidence?",
                      a: "Evidence is encrypted using AES-256 before storage. If you include report details with an image upload, the data is also embedded into the image file itself using steganography for redundancy. This ensures your evidence persists even if database systems are compromised."
                    },
                    {
                      q: "How do I know my report is being addressed?",
                      a: "All reports appear in the Compliance Log with real-time status updates. You can track the progress of your submission from 'Submitted' through 'Resolved'. Additionally, the AI mediation sessions in the Governance Matrix are transparent and documented."
                    },
                    {
                      q: "What is the Emergency Disclosure feature?",
                      a: "Emergency Disclosure is a fail-safe mechanism that automatically publishes evidence to the Public Archive if critical concerns are not addressed through normal resolution processes within defined timeframes. It ensures institutional accountability."
                    },
                    {
                      q: "Can I delete my submissions?",
                      a: "Data deletion requests must be submitted through institutional channels. The platform maintains audit logs for compliance purposes, which may be subject to retention requirements. However, your anonymous credential ensures your identity remains protected."
                    },
                    {
                      q: "How does the AI mediation work?",
                      a: "The Governance Resolution Matrix uses three AI agents: a Student Advocate that represents your interests, an Administration Representative that considers institutional constraints, and a Resolution Officer that ensures fair process and makes final decisions. All are powered by Google Gemini."
                    },
                    {
                      q: "What is the Dead Man's Switch?",
                      a: "The Dead Man's Switch is an optional safety feature that automatically releases evidence if you fail to check in within a specified timeframe. This protects whistleblowers who may face retaliation and ensures evidence preservation."
                    },
                    {
                      q: "Can administrators see who submitted a report?",
                      a: "No. The zero-knowledge architecture ensures that administrators only see the cryptographic hash of your credential, not your actual identity. They can verify that a submission came from a valid institutional member without knowing which specific person."
                    },
                  ].map((faq, i) => (
                    <Card key={i} className="border-border/50">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="p-1.5 rounded bg-primary/10 shrink-0">
                            <MessageSquare className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground mb-2">{faq.q}</h4>
                            <p className="text-sm text-muted-foreground">{faq.a}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </div>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
