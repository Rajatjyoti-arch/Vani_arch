import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  MotionValue,
} from "framer-motion";
import {
  Shield, Lock, FileText, Activity,
  Building2, Eye, Archive, Gavel, ArrowRight,
} from "lucide-react";
import { VaniLogo } from "@/components/ui/VaniLogo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import cynoxLogo from "@/assets/cynox-logo.png";

// Helper: fade in/out within a scroll range
const useFadeRange = (progress: MotionValue<number>, start: number, end: number) => ({
  opacity: useTransform(progress, [start - 0.03, start, end, end + 0.03], [0, 1, 1, 0]),
  y: useTransform(progress, [start - 0.03, start, end, end + 0.03], [40, 0, 0, -40]),
});

export const ScrollytellingSection = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Background: deep black → navy → violet-tinged
  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    [
      "hsl(220, 16%, 4%)",
      "hsl(220, 16%, 4%)",
      "hsl(220, 25%, 6%)",
      "hsl(225, 30%, 8%)",
    ]
  );

  // 3D card transforms (visible in middle sections)
  const cardRotate = useTransform(scrollYProgress, [0.15, 0.85], [0, 360]);
  const cardScale = useTransform(scrollYProgress, [0, 0.15, 0.5, 0.85, 1], [0, 0.5, 1.1, 1.0, 0.8]);
  const cardOpacity = useTransform(scrollYProgress, [0.12, 0.18, 0.82, 0.88], [0, 0.6, 0.6, 0]);

  // Glow intensity
  const glowOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.5, 0.8, 0.3]);

  // Progress bar
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Section fade ranges — each section gets a scroll band
  const hero = useFadeRange(scrollYProgress, 0, 0.14);
  const problem = useFadeRange(scrollYProgress, 0.16, 0.38);
  const arch = useFadeRange(scrollYProgress, 0.40, 0.62);
  const intel = useFadeRange(scrollYProgress, 0.64, 0.82);
  const cta = useFadeRange(scrollYProgress, 0.85, 0.98);

  return (
    <div ref={containerRef} className="relative" style={{ height: "800vh" }}>
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Animated background */}
        <motion.div className="absolute inset-0" style={{ backgroundColor: bgColor }} />

        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.4)_1px,transparent_1px)] bg-[size:80px_80px]" />
        </div>

        {/* Ambient glows */}
        <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity: glowOpacity }}>
          <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-[radial-gradient(ellipse_at_center,hsl(262,60%,55%,0.08),transparent_70%)]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[50%] h-[50%] bg-[radial-gradient(ellipse_at_center,hsl(192,80%,55%,0.06),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,hsl(160,60%,40%,0.03),transparent_60%)]" />
        </motion.div>

        {/* Fixed header */}
        <header className="absolute top-0 w-full z-50 px-8 max-[767px]:px-5 py-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-full" style={{ background: 'rgba(255,255,255,0.03)', border: '0.5px solid rgba(255,255,255,0.08)' }}>
              <VaniLogo variant="icon" size="sm" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-sm text-foreground/80 tracking-wide leading-none">VANI</span>
              <span className="text-[9px] text-foreground/20 tracking-[0.15em] uppercase mt-0.5 hidden sm:block">Central University of Jammu</span>
            </div>
          </div>
          <Button
            onClick={() => navigate("/portal")}
            className="bg-white/[0.04] hover:bg-white/[0.07] text-foreground/60 hover:text-foreground/80 backdrop-blur-2xl transition-all duration-700 text-xs tracking-[0.15em] uppercase px-5 py-2 h-auto font-mono"
            style={{ border: '0.5px solid rgba(255,255,255,0.08)' }}
          >
            Enter <ArrowRight className="w-3 h-3 ml-1.5" strokeWidth={1} />
          </Button>
        </header>

        {/* 3D Floating Card (persistent, behind content) */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-72 md:w-64 md:h-80 rounded-2xl z-[5] flex items-center justify-center"
          style={{
            rotateY: cardRotate,
            scale: cardScale,
            opacity: cardOpacity,
            perspective: 1200,
            background: "linear-gradient(135deg, hsl(262 60% 55% / 0.25), hsl(192 80% 55% / 0.1), hsl(213 80% 35% / 0.25))",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 25px 80px -20px hsl(262 60% 55% / 0.2), inset 0 1px 0 rgba(255,255,255,0.06)",
            backdropFilter: "blur(24px)",
          }}
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.05] via-transparent to-transparent" />
          <div className="relative text-center space-y-3 px-6">
            <div className="w-10 h-10 mx-auto rounded-lg bg-sovereign-violet/20 flex items-center justify-center">
              <div className="w-4 h-4 rounded bg-gradient-to-br from-sovereign-violet to-sovereign-cyan" />
            </div>
            <p className="text-[9px] font-mono text-foreground/25 tracking-[0.25em] uppercase">VANI Protocol</p>
          </div>
        </motion.div>

        {/* === SECTION 1: Hero === */}
        <motion.div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-8 max-[767px]:px-5"
          style={hero}
        >
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.03)', border: '0.5px solid rgba(255,255,255,0.08)' }}>
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
              </span>
              <span className="text-[10px] font-mono text-foreground/50 tracking-[0.25em] uppercase">System Operational</span>
            </div>

            <h1 className="font-serif text-[clamp(3.5rem,12vw,8rem)] font-light tracking-[-0.02em] leading-[0.9]">
              <span className="bg-gradient-to-r from-foreground via-sovereign-violet to-sovereign-cyan bg-clip-text text-transparent">VANI</span>
            </h1>

            <p className="text-sm text-foreground/40 tracking-[0.3em] uppercase font-mono">
              Verifiable. Anonymous. Institutional.
            </p>

            <p className="text-base text-foreground/25 tracking-[0.15em] font-light">
              Verifiable Anonymous Network Intelligence
            </p>

            <div className="flex items-center gap-3 text-foreground/30 justify-center">
              <Building2 className="w-3.5 h-3.5" strokeWidth={1} />
              <div className="w-px h-3 bg-foreground/10" />
              <span className="text-xs tracking-[0.2em] uppercase font-light">Central University of Jammu</span>
            </div>
          </div>

          {/* Scroll hint */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <span className="text-[9px] font-mono text-foreground/20 tracking-[0.2em] uppercase">Scroll to explore</span>
            <motion.div
              className="w-px h-8 bg-gradient-to-b from-foreground/20 to-transparent"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>

        {/* === SECTION 2: The Problem === */}
        <motion.div
          className="absolute inset-0 z-10 flex items-center justify-center px-8 max-[767px]:px-5"
          style={problem}
        >
          <div className="max-w-4xl w-full">
            <div className="text-center mb-12">
              <h2 className="font-serif text-5xl max-[767px]:text-3xl font-light text-foreground leading-[1.1] mb-4">
                The Problem of <br />
                <span className="text-foreground/40 italic">Institutional Silence</span>
              </h2>
              <p className="text-sm text-foreground/30 max-w-lg mx-auto leading-relaxed">
                When fear silences truth, institutions fail their duty of care.
              </p>
            </div>

            <div className="grid grid-cols-3 max-[767px]:grid-cols-1 gap-4">
              {[
                { icon: Shield, title: "Fear of Retaliation", desc: "Whistleblowers stay silent to protect their futures.", color: "text-sovereign-rose" },
                { icon: Eye, title: "Opaque Processes", desc: "Decisions behind closed doors erode trust.", color: "text-sovereign-violet" },
                { icon: Archive, title: "Lost Records", desc: "Reports vanish into administrative voids.", color: "text-sovereign-gold" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-5 rounded-lg group hover:bg-white/[0.02] transition-all duration-700"
                  style={{ border: '0.5px solid rgba(255,255,255,0.05)' }}
                >
                  <item.icon className={cn("w-4 h-4 mb-3 shrink-0", item.color)} strokeWidth={1} />
                  <h3 className="text-foreground/70 font-medium text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-foreground/25 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* === SECTION 3: Architecture === */}
        <motion.div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-8 max-[767px]:px-5"
          style={arch}
        >
          <div className="text-center mb-14 max-[767px]:mb-8">
            <h2 className="font-serif text-5xl max-[767px]:text-3xl font-light text-foreground mb-3">
              Architecture of Trust
            </h2>
            <p className="text-sm text-foreground/25 tracking-wide font-light">End-to-end verifiable governance pipeline</p>
          </div>

          <div className="grid grid-cols-4 max-[767px]:grid-cols-2 max-[639px]:grid-cols-1 gap-4 max-w-5xl w-full relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-px -translate-y-1/2 z-0" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)' }} />
            {[
              { icon: Lock, title: "Secure Entry", desc: "Zero-knowledge credential verification.", step: "01", iconColor: "text-sovereign-violet", bg: "bg-sovereign-violet/10" },
              { icon: FileText, title: "Submission", desc: "Encrypted grievance, metadata stripped.", step: "02", iconColor: "text-sovereign-cyan", bg: "bg-sovereign-cyan/10" },
              { icon: Activity, title: "AI Analysis", desc: "Gemini-powered urgency classification.", step: "03", iconColor: "text-sovereign-gold", bg: "bg-sovereign-gold/10" },
              { icon: Gavel, title: "Resolution", desc: "Outcome recorded on public ledger.", step: "04", iconColor: "text-sovereign-emerald", bg: "bg-sovereign-emerald/10" },
            ].map((step, i) => (
              <div key={i} className="relative z-10 p-5 max-[767px]:p-4 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)', border: '0.5px solid rgba(255,255,255,0.05)' }}>
                <div className="text-[10px] font-mono text-foreground/15 tracking-[0.3em] mb-3">{step.step}</div>
                <div className={cn("w-9 h-9 rounded-md flex items-center justify-center mb-3", step.bg)}>
                  <step.icon className={cn("w-4 h-4", step.iconColor)} strokeWidth={1} />
                </div>
                <h3 className="text-sm font-medium text-foreground/70 mb-1">{step.title}</h3>
                <p className="text-xs text-foreground/25 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* === SECTION 4: Intelligence === */}
        <motion.div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-8 max-[767px]:px-5"
          style={intel}
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6" style={{ background: 'rgba(255,255,255,0.02)', border: '0.5px solid rgba(255,255,255,0.06)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-foreground/20 animate-pulse" />
              <span className="text-[10px] font-mono text-foreground/30 tracking-[0.2em] uppercase">Powered by Google Gemini</span>
            </div>
            <h2 className="font-serif text-5xl max-[767px]:text-3xl font-light text-foreground">Core Intelligence</h2>
          </div>

          <div className="grid grid-cols-3 max-[767px]:grid-cols-1 gap-4 max-w-5xl w-full mb-10">
            {[
              { icon: Lock, title: "Anonymous Identity", desc: "SHA-256 hashing creates irreversible identity tokens.", iconColor: "text-sovereign-violet" },
              { icon: Shield, title: "Secure Evidence", desc: "AES-256 encrypted storage with steganographic layers.", iconColor: "text-sovereign-cyan" },
              { icon: Activity, title: "Analytics", desc: "Real-time campus sentiment and zone monitoring.", iconColor: "text-sovereign-gold" },
            ].map((item, i) => (
              <div key={i} className="p-6 max-[767px]:p-4 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)', border: '0.5px solid rgba(255,255,255,0.05)' }}>
                <item.icon className={cn("w-5 h-5 mb-4 shrink-0", item.iconColor)} strokeWidth={1} />
                <h3 className="text-base font-medium text-foreground/70 mb-2">{item.title}</h3>
                <p className="text-xs text-foreground/25 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 opacity-40">
            <span className="text-[10px] text-foreground/30 tracking-[0.2em] uppercase font-mono">Technology Partner</span>
            <div className="w-px h-3 bg-foreground/10" />
            <span className="text-xs font-medium text-foreground/40">Google Cloud AI</span>
          </div>
        </motion.div>

        {/* === SECTION 5: CTA / Credits === */}
        <motion.div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-8 max-[767px]:px-5"
          style={cta}
        >
          <div className="text-center space-y-8">
            <h2 className="font-serif text-5xl max-[767px]:text-3xl font-light">
              <span className="bg-gradient-to-r from-sovereign-violet via-foreground to-sovereign-cyan bg-clip-text text-transparent">
                Ready to Begin?
              </span>
            </h2>
            <p className="text-sm text-foreground/30 max-w-md mx-auto leading-relaxed">
              Step into a system designed to protect your voice and ensure institutional accountability.
            </p>
            <Button
              onClick={() => navigate("/portal")}
              className="bg-sovereign-violet/20 hover:bg-sovereign-violet/30 text-foreground/80 backdrop-blur-2xl transition-all duration-700 text-sm tracking-[0.15em] uppercase px-8 py-3 h-auto font-mono"
              style={{ border: '1px solid hsl(262 60% 55% / 0.3)' }}
            >
              Enter VANI <ArrowRight className="w-4 h-4 ml-2" strokeWidth={1.5} />
            </Button>
          </div>

          {/* Credits */}
          <div className="absolute bottom-12 w-full max-w-4xl mx-auto flex flex-row items-end justify-between gap-6 px-8 max-[767px]:flex-col max-[767px]:items-center max-[767px]:gap-4">
            <div className="flex items-center gap-3">
              <img src={cynoxLogo} alt="CYNOX" className="h-7 opacity-40" />
              <div className="text-[10px] text-foreground/20 font-mono leading-relaxed">
                <div className="tracking-[0.2em]">ENGINEERED BY</div>
                <div className="text-foreground/35 tracking-[0.15em]">TEAM CYNOX</div>
              </div>
            </div>
            <div className="flex flex-wrap justify-end gap-x-5 gap-y-1 text-[10px] text-foreground/20 font-mono tracking-[0.1em] max-[767px]:justify-center">
              {["Rajatjyoti Biswas", "Priyanshu Gupta", "Sakshi", "Mantavya Kumar"].map((name) => (
                <span key={name}>{name}</span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-sovereign-violet via-sovereign-cyan to-sovereign-emerald z-50"
          style={{ width: progressWidth }}
        />

        {/* Encryption label */}
        <div className="absolute bottom-4 right-8 z-40 text-[9px] text-foreground/10 font-mono tracking-[0.15em] hidden md:block">
          TLS 1.3 · 256-BIT ENCRYPTION · ZERO-KNOWLEDGE
        </div>
      </div>
    </div>
  );
};
