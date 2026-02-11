import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
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
import { ParticleField } from "./ParticleField";
import { ScrollBackgrounds } from "./ScrollBackgrounds";

const SECTIONS = [
  { label: "Origin", start: 0, end: 0.14 },
  { label: "Problem", start: 0.16, end: 0.38 },
  { label: "Architecture", start: 0.40, end: 0.62 },
  { label: "Intelligence", start: 0.64, end: 0.82 },
  { label: "Enter", start: 0.85, end: 0.98 },
];

// Smoother cinematic fade with wider transition windows
const useCinematicFade = (progress: MotionValue<number>, start: number, end: number) => {
  const s0 = Math.max(0, start - 0.08);
  const s1 = Math.max(s0 + 0.001, start);
  const s2 = Math.max(s1 + 0.001, start + 0.05);
  const e2 = Math.max(s2 + 0.001, end - 0.05);
  const e1 = Math.max(e2 + 0.001, end);
  const e0 = Math.max(e1 + 0.001, Math.min(1, end + 0.08));
  return {
    opacity: useTransform(progress, [s0, s1, e1, e0], [0, 1, 1, 0]),
    y: useTransform(progress, [s0, s1, e1, e0], [40, 0, 0, -40]),
    scale: useTransform(progress, [s0, s2, e2, e0], [0.96, 1, 1, 0.96]),
  };
};

// Horizontal reveal line between sections
const RevealLine = ({ progress, at }: { progress: MotionValue<number>; at: number }) => {
  const width = useTransform(progress, [at - 0.02, at, at + 0.02], ["0%", "60%", "0%"]);
  const opacity = useTransform(progress, [at - 0.03, at, at + 0.03], [0, 1, 0]);
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-px z-[8] bg-gradient-to-r from-transparent via-sovereign-violet/40 to-transparent"
      style={{ width, opacity }}
    />
  );
};

// Rotating geometric orbiter
const Orbiter = ({
  progress,
  size,
  color,
  orbitRadius,
  speedMultiplier = 1,
  startOffset = 0,
}: {
  progress: MotionValue<number>;
  size: number;
  color: string;
  orbitRadius: number;
  speedMultiplier?: number;
  startOffset?: number;
}) => {
  const angle = useTransform(progress, [0, 1], [startOffset, startOffset + 360 * speedMultiplier]);
  const x = useTransform(angle, (a) => Math.cos((a * Math.PI) / 180) * orbitRadius);
  const y = useTransform(angle, (a) => Math.sin((a * Math.PI) / 180) * orbitRadius);
  const rotate = useTransform(progress, [0, 1], [0, 720 * speedMultiplier]);
  const opacity = useTransform(progress, [0, 0.1, 0.9, 1], [0, 0.15, 0.15, 0]);

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 pointer-events-none z-[3]"
      style={{ x, y, rotate, opacity }}
    >
      <div
        className={cn("border", color)}
        style={{
          width: size,
          height: size,
          borderRadius: size > 20 ? 4 : "50%",
        }}
      />
    </motion.div>
  );
};

// Dot nav
const DotNav = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => (
  <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[60] hidden md:flex flex-col items-end gap-4">
    {SECTIONS.map((section, i) => {
      const s = Math.max(0, section.start - 0.02);
      const e = Math.min(1, section.end + 0.02);
      const dotOpacity = useTransform(
        scrollYProgress,
        [s, section.start, section.end, e],
        [0.15, 1, 1, 0.15]
      );
      const dotScale = useTransform(
        scrollYProgress,
        [s, section.start, section.end, e],
        [0.5, 1.2, 1.2, 0.5]
      );
      const labelOpacity = useTransform(
        scrollYProgress,
        [s, section.start, section.end, e],
        [0, 1, 1, 0]
      );
      const lineWidth = useTransform(
        scrollYProgress,
        [s, section.start, section.end, e],
        [0, 16, 16, 0]
      );
      return (
        <div key={i} className="flex items-center gap-3 group">
          <motion.span
            className="text-[9px] font-mono text-white/60 tracking-[0.15em] uppercase font-semibold"
            style={{ opacity: labelOpacity }}
          >
            {section.label}
          </motion.span>
          <motion.div
            className="h-px bg-gradient-to-r from-sovereign-violet/60 to-transparent"
            style={{ width: lineWidth, opacity: labelOpacity }}
          />
          <motion.div
            className="w-2 h-2 rounded-full bg-gradient-to-br from-sovereign-violet to-sovereign-cyan"
            style={{ opacity: dotOpacity, scale: dotScale }}
          />
        </div>
      );
    })}
  </div>
);

export const ScrollytellingSection = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Background — brighter base
  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [
      "hsl(220, 18%, 8%)",
      "hsl(225, 20%, 10%)",
      "hsl(230, 22%, 11%)",
      "hsl(235, 24%, 12%)",
      "hsl(240, 26%, 13%)",
    ]
  );

  // Parallax
  const gridParallaxY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const glowParallaxY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const bgParallaxY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const glow2ParallaxX = useTransform(scrollYProgress, [0, 1], [0, 80]);

  // Glow pulses — brighter
  const glowOpacity = useTransform(scrollYProgress, [0, 0.15, 0.3, 0.5, 0.7, 0.85, 1], [0.2, 0.7, 0.4, 0.8, 0.5, 0.9, 0.6]);
  // Glow hue shift
  const glowHue = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [262, 262, 192, 45, 160]);

  // Pre-compute glow backgrounds (hooks must be called at top level)
  const glowBg1 = useTransform(glowHue, (h) =>
    `radial-gradient(ellipse at center, hsl(${h}, 65%, 60%, 0.18), transparent 70%)`
  );
  const glowBg2 = useTransform(glowHue, (h) =>
    `radial-gradient(ellipse at center, hsl(${(h + 120) % 360}, 75%, 55%, 0.12), transparent 70%)`
  );
  const glowBg3 = useTransform(glowHue, (h) =>
    `radial-gradient(ellipse at center, hsl(${(h + 60) % 360}, 55%, 50%, 0.08), transparent 60%)`
  );

  // Film grain — subtler
  const grainOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.015, 0.025, 0.015]);

  // Progress bar
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const progressGlow = useTransform(scrollYProgress, [0, 1], [
    "0 0 10px hsl(262 60% 55% / 0.3)",
    "0 0 20px hsl(192 80% 55% / 0.5)",
  ]);

  // Cinematic section fades
  const heroRaw = useCinematicFade(scrollYProgress, 0, 0.14);
  // Override hero opacity/y/scale to be fully visible at scroll 0
  const hero = {
    opacity: useTransform(scrollYProgress, [0, 0.09, 0.14, 0.22], [1, 1, 1, 0]),
    y: useTransform(scrollYProgress, [0, 0.14, 0.22], [0, 0, -40]),
    scale: useTransform(scrollYProgress, [0, 0.09, 0.14, 0.22], [1, 1, 1, 0.96]),
  };
  const problem = useCinematicFade(scrollYProgress, 0.16, 0.38);
  const arch = useCinematicFade(scrollYProgress, 0.40, 0.62);
  const intel = useCinematicFade(scrollYProgress, 0.64, 0.82);
  const cta = useCinematicFade(scrollYProgress, 0.85, 0.98);

  // Vignette — lighter
  const vignetteOpacity = useTransform(scrollYProgress, [0, 0.15, 0.5, 0.85, 1], [0.2, 0.4, 0.3, 0.4, 0.5]);

  return (
    <div ref={containerRef} className="relative" style={{ height: "800vh" }}>
      <DotNav scrollYProgress={scrollYProgress} />

      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Animated background */}
        <motion.div className="absolute inset-0" style={{ backgroundColor: bgColor }} />

        {/* Cinematic background images */}
        <ScrollBackgrounds scrollYProgress={scrollYProgress} />

        {/* Particle field */}
        <ParticleField />

        {/* Grid — parallax */}
        <motion.div className="absolute inset-0 opacity-[0.04]" style={{ y: gridParallaxY }}>
          <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.4)_1px,transparent_1px)] bg-[size:80px_80px]" />
        </motion.div>

        {/* Dynamic glow — color shifts with scroll */}
        <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity: glowOpacity }}>
          <motion.div
            className="absolute top-[-15%] right-[-10%] w-[55%] h-[55%]"
            style={{ y: glowParallaxY, background: glowBg1 }}
          />
          <motion.div
            className="absolute bottom-[-15%] left-[-10%] w-[55%] h-[55%]"
            style={{ y: bgParallaxY, x: glow2ParallaxX, background: glowBg2 }}
          />
          {/* Center pulse */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%]"
            style={{ background: glowBg3 }}
          />
        </motion.div>

        {/* Film grain overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-[45] mix-blend-overlay"
          style={{ opacity: grainOpacity }}
        >
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
          }} />
        </motion.div>

        {/* Cinematic vignette */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-[44]"
          style={{
            opacity: vignetteOpacity,
            background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
          }}
        />

        {/* Floating geometric orbiters */}
        <Orbiter progress={scrollYProgress} size={40} color="border-sovereign-violet/20" orbitRadius={280} speedMultiplier={1.2} startOffset={0} />
        <Orbiter progress={scrollYProgress} size={16} color="border-sovereign-cyan/15" orbitRadius={200} speedMultiplier={0.8} startOffset={90} />
        <Orbiter progress={scrollYProgress} size={28} color="border-sovereign-gold/10" orbitRadius={340} speedMultiplier={1.5} startOffset={180} />
        <Orbiter progress={scrollYProgress} size={12} color="border-sovereign-emerald/15" orbitRadius={160} speedMultiplier={0.6} startOffset={270} />
        <Orbiter progress={scrollYProgress} size={50} color="border-sovereign-rose/8" orbitRadius={400} speedMultiplier={0.4} startOffset={45} />

        {/* Reveal lines between sections */}
        <RevealLine progress={scrollYProgress} at={0.15} />
        <RevealLine progress={scrollYProgress} at={0.39} />
        <RevealLine progress={scrollYProgress} at={0.63} />
        <RevealLine progress={scrollYProgress} at={0.83} />

        {/* Header */}
        <header className="absolute top-0 w-full z-50 px-8 max-[767px]:px-5 py-5 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-full" style={{ background: 'rgba(255,255,255,0.03)', border: '0.5px solid rgba(255,255,255,0.08)' }}>
              <VaniLogo variant="icon" size="sm" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-sm text-white font-semibold tracking-wide leading-none">VANI</span>
            </div>
          </div>
          <Button
            onClick={() => navigate("/portal")}
            className="bg-white/[0.04] hover:bg-white/[0.07] text-white hover:text-white backdrop-blur-2xl transition-all duration-700 text-xs tracking-[0.15em] uppercase px-5 py-2 h-auto font-mono font-semibold"
            style={{ border: '0.5px solid rgba(255,255,255,0.08)' }}
          >
            Enter <ArrowRight className="w-3 h-3 ml-1.5" strokeWidth={1} />
          </Button>
        </header>

        {/* === SECTION 1: Hero === */}
        <motion.div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-8 max-[767px]:px-5"
          style={hero}
        >
          <div className="text-center space-y-6">
            <div className="flex flex-col items-center gap-3 -mt-4">
              <img src="/cuj-logo.png" alt="Central University of Jammu" className="w-14 h-14 object-contain opacity-90" />
              <span className="text-[11px] font-mono text-white tracking-[0.25em] uppercase font-extrabold">An initiative by Central University of Jammu</span>
            </div>

            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.03)', border: '0.5px solid rgba(255,255,255,0.08)' }}>
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
              </span>
              <span className="text-[10px] font-mono text-white/80 tracking-[0.25em] uppercase font-semibold">System Operational</span>
            </div>

            <h1 className="font-serif text-[clamp(3.5rem,12vw,8rem)] font-bold tracking-[-0.02em] leading-[0.9]">
              <span className="bg-gradient-to-r from-foreground via-sovereign-violet to-sovereign-cyan bg-clip-text text-transparent">VANI</span>
            </h1>

            <p className="text-sm text-white tracking-[0.3em] uppercase font-mono font-bold">
              Verifiable. Anonymous. Institutional.
            </p>

            <p className="text-base text-white/80 tracking-[0.15em] font-medium">
              Verifiable Anonymous Network Intelligence
            </p>

            <div className="flex items-center gap-3 text-white/80 justify-center">
              <Building2 className="w-3.5 h-3.5" strokeWidth={1.5} />
              <div className="w-px h-3 bg-white/30" />
              <span className="text-xs tracking-[0.2em] uppercase font-semibold">Central University of Jammu</span>
            </div>
          </div>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <span className="text-[9px] font-mono text-white/60 tracking-[0.2em] uppercase font-semibold">Scroll to explore</span>
            <motion.div
              className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent"
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
            <h2 className="font-serif text-5xl max-[767px]:text-3xl font-bold text-white leading-[1.1] mb-4">
                The Problem of <br />
                <span className="text-white/80 italic">Institutional Silence</span>
              </h2>
              <p className="text-sm text-white/80 max-w-lg mx-auto leading-relaxed font-medium">
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
                  className="p-5 rounded-lg group backdrop-blur-xl bg-white/[0.06] hover:bg-white/[0.10] transition-all duration-700 shadow-lg shadow-black/10"
                  style={{ border: '1px solid rgba(255,255,255,0.12)' }}
                >
                  <item.icon className={cn("w-4 h-4 mb-3 shrink-0", item.color)} strokeWidth={1} />
                  <h3 className="text-white font-bold text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-white/70 leading-relaxed font-medium">{item.desc}</p>
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
            <h2 className="font-serif text-5xl max-[767px]:text-3xl font-bold text-white mb-3">
              Architecture of Trust
            </h2>
            <p className="text-sm text-white/80 tracking-wide font-medium">End-to-end verifiable governance pipeline</p>
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
                <div className="text-[10px] font-mono text-white/40 tracking-[0.3em] mb-3 font-bold">{step.step}</div>
                <div className={cn("w-9 h-9 rounded-md flex items-center justify-center mb-3", step.bg)}>
                  <step.icon className={cn("w-4 h-4", step.iconColor)} strokeWidth={1.5} />
                </div>
                <h3 className="text-sm font-bold text-white mb-1">{step.title}</h3>
                <p className="text-xs text-white/70 leading-relaxed font-medium">{step.desc}</p>
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
              <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse" />
              <span className="text-[10px] font-mono text-white/80 tracking-[0.2em] uppercase font-semibold">Powered by Google Gemini</span>
            </div>
             <h2 className="font-serif text-5xl max-[767px]:text-3xl font-bold text-white">Core Intelligence</h2>
          </div>

          <div className="grid grid-cols-3 max-[767px]:grid-cols-1 gap-4 max-w-5xl w-full mb-10">
            {[
              { icon: Lock, title: "Anonymous Identity", desc: "SHA-256 hashing creates irreversible identity tokens.", iconColor: "text-sovereign-violet" },
              { icon: Shield, title: "Secure Evidence", desc: "AES-256 encrypted storage with steganographic layers.", iconColor: "text-sovereign-cyan" },
              { icon: Activity, title: "Analytics", desc: "Real-time campus sentiment and zone monitoring.", iconColor: "text-sovereign-gold" },
            ].map((item, i) => (
              <div key={i} className="p-6 max-[767px]:p-4 rounded-lg" style={{ background: 'rgba(255,255,255,0.02)', border: '0.5px solid rgba(255,255,255,0.05)' }}>
                <item.icon className={cn("w-5 h-5 mb-4 shrink-0", item.iconColor)} strokeWidth={1} />
                <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                <p className="text-xs text-white/70 leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 opacity-80">
            <span className="text-[10px] text-white/80 tracking-[0.2em] uppercase font-mono font-semibold">Technology Partner</span>
            <div className="w-px h-3 bg-white/30" />
            <span className="text-xs font-bold text-white/80">Google Cloud AI</span>
          </div>
        </motion.div>

        {/* === SECTION 5: CTA / Credits === */}
        <motion.div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center px-8 max-[767px]:px-5"
          style={cta}
        >
          <div className="text-center space-y-8">
            <h2 className="font-serif text-5xl max-[767px]:text-3xl font-bold">
              <span className="bg-gradient-to-r from-sovereign-violet via-white to-sovereign-cyan bg-clip-text text-transparent">
                Ready to Begin?
              </span>
            </h2>
            <p className="text-sm text-white/80 max-w-md mx-auto leading-relaxed font-medium">
              Step into a system designed to protect your voice and ensure institutional accountability.
            </p>
            <Button
              onClick={() => navigate("/portal")}
              className="bg-sovereign-violet/20 hover:bg-sovereign-violet/30 text-white backdrop-blur-2xl transition-all duration-700 text-sm tracking-[0.15em] uppercase px-8 py-3 h-auto font-mono font-bold"
              style={{ border: '1px solid hsl(262 60% 55% / 0.3)' }}
            >
              Enter VANI <ArrowRight className="w-4 h-4 ml-2" strokeWidth={1.5} />
            </Button>
          </div>

          <div className="absolute bottom-12 w-full max-w-4xl mx-auto flex flex-row items-end justify-between gap-6 px-8 max-[767px]:flex-col max-[767px]:items-center max-[767px]:gap-4">
            <div className="flex items-center gap-3">
              <img src={cynoxLogo} alt="CYNOX" className="h-9 opacity-90 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
              <div className="text-xs text-white/80 font-mono leading-relaxed font-bold">
                <div className="tracking-[0.2em]">ENGINEERED BY</div>
                <div className="text-white tracking-[0.15em] text-sm">TEAM CYNOX</div>
              </div>
            </div>
            <div className="flex flex-wrap justify-end gap-x-6 gap-y-1 text-xs text-white/80 font-mono tracking-[0.1em] font-bold max-[767px]:justify-center">
              {["Rajatjyoti Biswas", "Priyanshu Gupta", "Sakshi", "Mantavya Kumar"].map((name) => (
                <span key={name} className="drop-shadow-[0_0_4px_rgba(255,255,255,0.2)]">{name}</span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Progress bar — glowing */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-sovereign-violet via-sovereign-cyan to-sovereign-emerald z-50"
          style={{ width: progressWidth, boxShadow: progressGlow }}
        />

        <div className="absolute bottom-4 right-8 z-40 text-[9px] text-white/30 font-mono font-semibold tracking-[0.15em] hidden md:block">
          TLS 1.3 · 256-BIT ENCRYPTION · ZERO-KNOWLEDGE
        </div>
      </div>
    </div>
  );
};
