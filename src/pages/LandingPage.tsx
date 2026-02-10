import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Shield, Lock, Scale, FileText,
  Activity, Building2, ChevronRight, Play, Pause,
  Eye, Archive, Gavel, ArrowRight
} from "lucide-react";
import { VaniLogo } from "@/components/ui/VaniLogo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import cynoxLogo from "@/assets/cynox-logo.png";

// Luxury easing
const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;

const SLIDE_VARIANTS = {
  enter: (direction: number) => ({
    opacity: 0,
    y: direction === 0 ? 0 : 20,
  }),
  center: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: LUXURY_EASE },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.6, ease: LUXURY_EASE },
  },
};

// Staggered children container
const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: LUXURY_EASE },
  },
};

// --- Parallax Background ---
const ParallaxBackground = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 30, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 30, damping: 20 });
  const bgX = useTransform(smoothX, [0, 1], [-8, 8]);
  const bgY = useTransform(smoothY, [0, 1], [-8, 8]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [mouseX, mouseY]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Deep neutral base */}
      <div className="absolute inset-0 bg-[hsl(220,16%,4%)]" />

      {/* Parallax grid layer */}
      <motion.div
        style={{ x: bgX, y: bgY }}
        className="absolute -inset-4 opacity-[0.04]"
      >
        <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.4)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </motion.div>

      {/* Very subtle radial warmth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(255,255,255,0.015),transparent_70%)]" />
    </div>
  );
};

// --- Slide 1: Hero / Identity ---
const SlideHero = () => {
  const [taglineIdx, setTaglineIdx] = useState(0);
  const taglines = [
    "Verifiable. Anonymous. Institutional.",
    "Truth without fear.",
    "Governance without bias.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIdx((p) => (p + 1) % taglines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="h-full w-full flex flex-col relative z-20 px-8 max-[767px]:px-5"
    >
      {/* Letterbox top bar is handled by parent */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-5xl mx-auto gap-12 max-[767px]:gap-8">

        {/* Status badge */}
        <motion.div variants={staggerItem}>
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full backdrop-blur-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '0.5px solid rgba(255,255,255,0.08)' }}>
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent"></span>
            </span>
            <span className="text-[10px] font-mono text-foreground/50 tracking-[0.25em] uppercase">
              System Operational
            </span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.div variants={staggerItem} className="text-center space-y-6">
          <h1 className="font-serif text-[clamp(3.5rem,12vw,8rem)] font-light tracking-[-0.02em] text-foreground leading-[0.9]">
            VANI
          </h1>
          <div className="h-7 relative flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={taglineIdx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.8, ease: LUXURY_EASE }}
                className="absolute text-sm max-[767px]:text-xs text-foreground/40 tracking-[0.3em] uppercase font-mono"
              >
                {taglines[taglineIdx]}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Expansion line */}
        <motion.p
          variants={staggerItem}
          className="text-base max-[767px]:text-sm text-foreground/25 tracking-[0.15em] font-light text-center"
        >
          Verifiable Anonymous Network Intelligence
        </motion.p>

        {/* University attribution */}
        <motion.div
          variants={staggerItem}
          className="flex items-center gap-3 text-foreground/30"
        >
          <Building2 className="w-3.5 h-3.5" strokeWidth={1} />
          <div className="w-px h-3 bg-foreground/10" />
          <span className="text-xs tracking-[0.2em] uppercase font-light">
            Central University of Jammu
          </span>
        </motion.div>
      </div>

      {/* Bottom: Team Credit */}
      <motion.div
        variants={staggerItem}
        className="w-full max-w-5xl mx-auto flex flex-row items-end justify-between gap-6 pb-16 max-[767px]:pb-20 max-[767px]:flex-col max-[767px]:items-center max-[767px]:gap-4"
      >
        <div className="flex items-center gap-3">
          <img src={cynoxLogo} alt="CYNOX" className="h-8 max-[767px]:h-7 opacity-40 hover:opacity-60 transition-opacity duration-700" />
          <div className="text-[10px] text-foreground/20 font-mono leading-relaxed">
            <div className="tracking-[0.2em]">ENGINEERED BY</div>
            <div className="text-foreground/35 tracking-[0.15em]">TEAM CYNOX</div>
          </div>
        </div>

        <div className="flex flex-wrap justify-end gap-x-5 gap-y-1 text-[10px] text-foreground/20 font-mono tracking-[0.1em] max-[767px]:justify-center">
          {["Rajatjyoti Biswas", "Priyanshu Gupta", "Sakshi", "Mantavya Kumar"].map((name) => (
            <span key={name} className="hover:text-foreground/40 transition-colors duration-700">
              {name}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- Slide 2: The Problem ---
const SlideProblem = () => (
  <motion.div
    variants={staggerContainer}
    initial="hidden"
    animate="visible"
    className="h-full w-full flex items-center justify-center relative z-10 px-8 max-[767px]:px-5 max-w-6xl mx-auto"
  >
    <div className="grid grid-cols-2 max-[767px]:grid-cols-1 gap-20 max-[767px]:gap-10 items-center w-full">
      <div className="space-y-10 max-[767px]:space-y-6">
        <motion.div variants={staggerItem}>
          <h2 className="font-serif text-5xl max-[767px]:text-3xl font-light text-foreground leading-[1.1] mb-4 max-[767px]:text-center">
            The Problem of<br />
            <span className="text-foreground/40 italic">Institutional Silence</span>
          </h2>
          <p className="text-sm text-foreground/30 max-w-md leading-relaxed max-[767px]:text-center max-[767px]:mx-auto">
            When fear silences truth, institutions fail their duty of care. The distance between grievance and resolution grows unchecked.
          </p>
        </motion.div>

        <div className="space-y-4 max-[767px]:space-y-3">
          {[
            { icon: Shield, title: "Fear of Retaliation", desc: "Whistleblowers stay silent to protect their futures." },
            { icon: Eye, title: "Opaque Processes", desc: "Decisions made behind closed doors erode trust." },
            { icon: Archive, title: "Lost Records", desc: "Reports vanish into administrative voids without trace." },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="flex items-start gap-4 max-[767px]:gap-3 p-4 max-[767px]:p-3 rounded-lg transition-all duration-700 group hover:bg-white/[0.02]"
              style={{ borderLeft: '1px solid rgba(255,255,255,0.05)' }}
            >
              <item.icon className="w-4 h-4 text-foreground/20 group-hover:text-accent transition-colors duration-700 shrink-0 mt-0.5" strokeWidth={1} />
              <div>
                <h3 className="text-foreground/70 font-medium text-sm mb-0.5">{item.title}</h3>
                <p className="text-xs text-foreground/25 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Protocol Card */}
      <motion.div variants={staggerItem} className="relative hidden max-[767px]:hidden md:block">
        <div className="frosted-glass p-8 rounded-xl">
          <div className="flex items-center gap-3 mb-8 pb-4" style={{ borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>
            <Shield className="w-4 h-4 text-accent" strokeWidth={1} />
            <span className="text-[11px] font-mono text-foreground/40 tracking-[0.2em] uppercase">VANI Protocol</span>
          </div>

          <div className="space-y-8">
            {[
              { icon: Lock, title: "Cryptographic Anonymity", desc: "SHA-256 hashed identities. We verify who you are without knowing which one you are." },
              { icon: FileText, title: "Immutable Evidence", desc: "AES-256 encrypted submissions. Time-stamped. Tamper-proof." },
              { icon: Scale, title: "AI-Mediated Resolution", desc: "Policy-aware algorithms that categorize, route, and mediate disputes." },
            ].map((item, i) => (
              <div key={i} className="group">
                <h4 className="text-foreground/60 font-medium text-sm mb-2 flex items-center gap-2.5">
                  <item.icon className="w-3.5 h-3.5 text-accent/60" strokeWidth={1} />
                  {item.title}
                </h4>
                <p className="text-xs text-foreground/25 pl-6 leading-relaxed" style={{ borderLeft: '0.5px solid rgba(255,255,255,0.04)' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </motion.div>
);

// --- Slide 3: Architecture Pipeline ---
const SlideArchitecture = () => (
  <motion.div
    variants={staggerContainer}
    initial="hidden"
    animate="visible"
    className="h-full w-full flex flex-col items-center justify-center relative z-10 px-8 max-[767px]:px-5 overflow-hidden"
  >
    <motion.div variants={staggerItem} className="text-center mb-16 max-[767px]:mb-10">
      <h2 className="font-serif text-5xl max-[767px]:text-3xl font-light text-foreground mb-3">
        Architecture of Trust
      </h2>
      <p className="text-sm text-foreground/25 tracking-wide font-light">
        End-to-end verifiable governance pipeline
      </p>
    </motion.div>

    <div className="grid grid-cols-4 max-[767px]:grid-cols-2 max-[639px]:grid-cols-1 gap-4 max-[767px]:gap-3 max-w-5xl w-full relative">
      {/* Connecting line */}
      <div className="hidden md:block absolute top-1/2 left-0 w-full h-px -translate-y-1/2 z-0" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)' }} />

      {[
        { icon: Lock, title: "Secure Entry", desc: "Zero-knowledge credential verification.", step: "01" },
        { icon: FileText, title: "Submission", desc: "Encrypted grievance with metadata stripped.", step: "02" },
        { icon: Activity, title: "AI Analysis", desc: "Gemini-powered urgency classification.", step: "03" },
        { icon: Gavel, title: "Resolution", desc: "Outcome recorded on public ledger.", step: "04" },
      ].map((step, i) => (
        <motion.div
          key={i}
          variants={staggerItem}
          className="relative z-10 frosted-glass-hover p-6 max-[767px]:p-4 rounded-lg group flex flex-col"
        >
          <div className="text-[10px] font-mono text-foreground/15 tracking-[0.3em] mb-4">{step.step}</div>
          <div className="w-10 h-10 rounded-md bg-white/[0.03] flex items-center justify-center mb-4 group-hover:bg-accent/10 transition-colors duration-700">
            <step.icon className="w-4 h-4 text-foreground/30 group-hover:text-accent transition-colors duration-700" strokeWidth={1} />
          </div>
          <h3 className="text-sm font-medium text-foreground/70 mb-1.5">{step.title}</h3>
          <p className="text-xs text-foreground/25 leading-relaxed">{step.desc}</p>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

// --- Slide 4: Intelligence & AI ---
const SlideIntelligence = () => (
  <motion.div
    variants={staggerContainer}
    initial="hidden"
    animate="visible"
    className="h-full w-full flex flex-col items-center justify-center relative z-10 px-8 max-[767px]:px-5 max-w-5xl mx-auto"
  >
    <motion.div variants={staggerItem} className="text-center mb-14 max-[767px]:mb-8">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 backdrop-blur-2xl" style={{ background: 'rgba(255,255,255,0.02)', border: '0.5px solid rgba(255,255,255,0.06)' }}>
        <span className="w-1.5 h-1.5 rounded-full bg-foreground/20 animate-pulse-subtle" />
        <span className="text-[10px] font-mono text-foreground/30 tracking-[0.2em] uppercase">Powered by Google Gemini</span>
      </div>
      <h2 className="font-serif text-5xl max-[767px]:text-3xl font-light text-foreground">
        Core Intelligence
      </h2>
    </motion.div>

    <div className="grid grid-cols-3 max-[767px]:grid-cols-1 gap-4 w-full mb-14 max-[767px]:mb-8">
      {[
        { icon: Lock, title: "Anonymous Identity", desc: "SHA-256 hashing creates irreversible identity tokens. Your enrollment number is never stored." },
        { icon: Shield, title: "Secure Evidence", desc: "AES-256 encrypted document storage with steganographic concealment layers." },
        { icon: Activity, title: "Institutional Analytics", desc: "Real-time campus sentiment tracking and zone-level concern monitoring." },
      ].map((item, i) => (
        <motion.div
          key={i}
          variants={staggerItem}
          className="frosted-glass-hover p-7 max-[767px]:p-5 rounded-lg flex flex-col"
        >
          <item.icon className="w-5 h-5 text-foreground/20 mb-5 shrink-0" strokeWidth={1} />
          <h3 className="text-base font-medium text-foreground/70 mb-2">{item.title}</h3>
          <p className="text-xs text-foreground/25 leading-relaxed flex-1">{item.desc}</p>
        </motion.div>
      ))}
    </div>

    {/* Google AI badge */}
    <motion.div
      variants={staggerItem}
      className="flex items-center gap-4 opacity-40 hover:opacity-60 transition-opacity duration-700"
    >
      <span className="text-[10px] text-foreground/30 tracking-[0.2em] uppercase font-mono">Technology Partner</span>
      <div className="w-px h-3 bg-foreground/10" />
      <span className="text-xs font-medium text-foreground/40">Google Cloud AI</span>
    </motion.div>
  </motion.div>
);

// --- Main Landing Page ---

const LandingPage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const slides = React.useMemo(() => [
    <SlideHero />,
    <SlideProblem />,
    <SlideArchitecture />,
    <SlideIntelligence />,
  ], []);

  const paginate = useCallback((d: number) => {
    setPage((p) => {
      const next = p + d;
      if (next < 0) return slides.length - 1;
      if (next >= slides.length) return 0;
      return next;
    });
    setDirection(d);
  }, [slides.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") paginate(1);
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") paginate(-1);
      if (e.key === " ") { e.preventDefault(); setIsPaused((p) => !p); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [paginate]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => paginate(1), 6000);
    return () => clearInterval(timer);
  }, [paginate, isPaused]);

  const onTouchStart = (e: React.TouchEvent) => { setTouchEnd(null); setTouchStart(e.targetTouches[0].clientX); };
  const onTouchMove = (e: React.TouchEvent) => { setTouchEnd(e.targetTouches[0].clientX); };
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const d = touchStart - touchEnd;
    if (d > 50) paginate(1);
    if (d < -50) paginate(-1);
  };

  return (
    <div
      className="h-screen w-screen overflow-hidden bg-background text-foreground font-sans selection:bg-accent/20 touch-pan-y letterbox"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <ParallaxBackground />

      {/* Header */}
      <header className="fixed top-[3vh] w-full z-50 px-8 max-[767px]:px-5 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4 cursor-pointer group" onClick={() => setPage(0)}>
          <div className="relative flex items-center justify-center w-11 h-11 max-[767px]:w-9 max-[767px]:h-9 rounded-full backdrop-blur-2xl transition-all duration-700 shrink-0" style={{ background: 'rgba(255,255,255,0.03)', border: '0.5px solid rgba(255,255,255,0.08)' }}>
            <VaniLogo variant="icon" size="sm" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-base max-[767px]:text-sm text-foreground/80 tracking-wide leading-none">VANI</span>
            <span className="text-[9px] text-foreground/20 tracking-[0.15em] uppercase mt-0.5 hidden sm:block">
              Central University of Jammu
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-2 rounded-full hover:bg-white/[0.03] text-foreground/30 hover:text-foreground/50 transition-all duration-500"
          >
            {isPaused ? <Play className="w-3.5 h-3.5" strokeWidth={1} /> : <Pause className="w-3.5 h-3.5" strokeWidth={1} />}
          </button>

          <Button
            onClick={() => navigate("/portal")}
            className="bg-white/[0.04] hover:bg-white/[0.07] text-foreground/60 hover:text-foreground/80 backdrop-blur-2xl transition-all duration-700 text-xs tracking-[0.15em] uppercase px-5 py-2 h-auto font-mono"
            style={{ border: '0.5px solid rgba(255,255,255,0.08)' }}
          >
            Enter
            <ArrowRight className="w-3 h-3 ml-1.5" strokeWidth={1} />
          </Button>
        </div>
      </header>

      {/* Slides */}
      <div className="relative w-full h-full flex items-center justify-center">
        <AnimatePresence initial={true} custom={direction} mode="wait">
          <motion.div
            key={page}
            custom={direction}
            variants={SLIDE_VARIANTS}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute w-full h-full"
          >
            {slides[page]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Pills */}
      <div className="fixed bottom-[3vh] left-1/2 -translate-x-1/2 z-50 flex items-center gap-6 mb-4">
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => { setDirection(index > page ? 1 : -1); setPage(index); }}
              className={cn(
                "h-px rounded-full transition-all duration-700",
                index === page
                  ? "w-8 bg-foreground/40"
                  : "w-4 bg-foreground/10 hover:bg-foreground/20"
              )}
            />
          ))}
        </div>
      </div>

      {/* Footer text */}
      <div className="fixed bottom-[3vh] right-8 z-40 text-[9px] text-foreground/10 font-mono tracking-[0.15em] hidden md:block">
        TLS 1.3 · 256-BIT ENCRYPTION · ZERO-KNOWLEDGE
      </div>
    </div>
  );
};

export default LandingPage;
