import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Shield, Lock, Scale, Users, Eye, FileText,
  Server, Activity, Network, Building2, ChevronRight, Terminal, Play, Pause
} from "lucide-react";
import { VaniLogo } from "@/components/ui/VaniLogo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import cynoxLogo from "@/assets/cynox-logo.png";

// --- Types & Constants ---

const VARIANTS: Variants = {
  enter: (direction: number) => ({
    x: direction === 0 ? 0 : (direction > 0 ? 1000 : -1000),
    opacity: 0,
    scale: direction === 0 ? 1 : 0.95,
    filter: "blur(10px)",
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    scale: 1.05,
    filter: "blur(10px)",
  }),
};

const TEXT_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.8, ease: "easeOut" }
  }),
  center: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.8, ease: "easeOut" }
  })
};

// --- Components ---

const BackgroundGrid = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 bg-[#020617]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.05),transparent_70%)]" />
    <div className="absolute w-full h-full bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
    <motion.div
      animate={{ opacity: [0.1, 0.3, 0.1] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"
    />
  </div>
);

const OperationalBadge = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.5 }}
    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/30 border border-emerald-500/20 backdrop-blur-md"
  >
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
    </span>
    <span className="text-[10px] font-medium text-emerald-400 tracking-widest uppercase font-mono">
      System Operational
    </span>
  </motion.div>
);

// --- Slide 1: System / Identity ---
const SlideIdentity = () => {
  const [index, setIndex] = useState(0);
  const taglines = [
    "Truth without fear",
    "Anonymous, yet accountable",
    "Governance without bias"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % taglines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full w-full flex flex-col relative z-20 pt-32 pb-32 px-8 max-[767px]:pt-24 max-[767px]:pb-24 max-[767px]:px-4 overflow-hidden">

      {/* HERO ZONE: Centered content */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-7xl mx-auto relative z-20 gap-10 max-[767px]:gap-6">

        {/* 1. System Badge */}
        <div className="relative z-30">
          <OperationalBadge />
        </div>

        {/* 2. Title & Tagline Group */}
        <div className="flex flex-col items-center gap-8 max-[767px]:gap-4 relative z-20 w-full">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="text-[clamp(4rem,15vw,9rem)] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-500 leading-none m-0 text-center"
          >
            VANI
          </motion.h1>

          <div className="h-8 w-full flex justify-center items-center relative">
            <AnimatePresence mode="wait">
              <motion.p
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute text-2xl max-[767px]:text-sm text-cyan-400 font-light tracking-[0.2em] max-[767px]:tracking-[0.15em] uppercase whitespace-nowrap text-center px-4"
              >
                {taglines[index]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* 3. University Line */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
          className="flex items-center gap-3 max-[767px]:gap-2 text-slate-400 relative z-20"
        >
          <Building2 className="w-4 h-4 max-[767px]:w-3 max-[767px]:h-3" />
          <span className="text-sm max-[767px]:text-[10px] tracking-wider uppercase border-l border-slate-700 pl-3 max-[767px]:pl-2">
            Central University of Jammu
          </span>
        </motion.div>

      </div>

      {/* AMBIENT ZONE: Pulse Visualization - Hidden on small mobile to save space */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.6, y: 0 }}
        transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
        className="flex max-[639px]:hidden h-24 max-[767px]:h-16 w-full flex-col items-center justify-center shrink-0 z-10 opacity-60 mb-8 max-[767px]:mb-4"
      >
        <div className="flex items-end justify-center gap-1 h-12 max-[767px]:h-8 w-full">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                height: ["20%", "60%", "20%"],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 1 + Math.random(),
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.1,
              }}
              className="w-1 max-[767px]:w-0.5 bg-cyan-500/50 rounded-full"
            />
          ))}
        </div>
        <div className="flex items-center gap-2 text-[10px] max-[767px]:text-[8px] font-mono tracking-[0.2em] text-cyan-500/60 uppercase mt-2">
          <Activity className="w-3 h-3" />
          <span>System_Pulse // Active</span>
        </div>
      </motion.div>

      {/* FOOTER ZONE: Team Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-7xl mx-auto flex flex-row items-end justify-between gap-6 z-30 shrink-0 border-t border-slate-800/30 pt-6 pb-0 max-[767px]:flex-col max-[767px]:items-center max-[767px]:pt-4 max-[767px]:pb-16 max-[767px]:gap-4"
      >
        <div className="flex items-center gap-3 md:gap-4">
          <img src={cynoxLogo} alt="CYNOX" className="h-10 max-[767px]:h-8 transition-all duration-500 opacity-90 hover:opacity-100" />
          <div className="text-xs max-[767px]:text-[10px] text-slate-500 font-mono">
            <div>ENGINEERED BY</div>
            <div className="text-slate-300 tracking-widest">TEAM CYNOX</div>
          </div>
        </div>

        <div className="flex flex-wrap justify-end gap-x-4 gap-y-2 md:gap-8 text-xs max-[767px]:text-[10px] text-slate-400 font-mono uppercase tracking-wider text-right max-[767px]:justify-center max-[767px]:text-center">
          {["Rajatjyoti Biswas", "Priyanshu Gupta", "Sakshi", "Mantavya Kumar"].map((name) => (
            <span key={name} className="hover:text-cyan-400 transition-colors cursor-default whitespace-nowrap">
              {name}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

// --- Slide 2: Problem ---
const SlideProblem = () => (
  <div className="h-full w-full flex items-center justify-center relative z-10 px-8 max-[767px]:px-4 max-w-7xl mx-auto py-0 max-[767px]:pt-20 max-[767px]:pb-24">
    <div className="grid grid-cols-2 max-[767px]:grid-cols-1 gap-16 max-[767px]:gap-8 items-center w-full overflow-visible max-[767px]:overflow-y-auto max-h-full no-scrollbar">
      <div className="space-y-8 max-[767px]:space-y-6">
        <motion.div
          custom={0.2}
          variants={TEXT_VARIANTS}
          initial="hidden"
          animate="visible"
          className="text-left max-[767px]:text-center"
        >
          <h2 className="text-6xl max-[767px]:text-3xl font-bold text-white mb-4 max-[767px]:mb-3 leading-tight">
            Institutional <span className="text-red-500/80">Silence</span>
          </h2>
          <p className="text-lg max-[767px]:text-sm text-slate-400 max-w-md mx-0 max-[767px]:mx-auto leading-relaxed">
            The gap between grievance and resolution is widened by fear and bureaucracy.
          </p>
        </motion.div>

        <div className="space-y-6 max-[767px]:space-y-3">
          {[
            { icon: Shield, title: "Fear of Retaliation", desc: "Whistleblowers stay silent to protect their careers." },
            { icon: Network, title: "Broken Feedback Loops", desc: "Reports vanish into administrative voids." },
            { icon: Eye, title: "Lack of Transparency", desc: "Decisions made in the dark breed distrust." }
          ].map((item, i) => (
            <motion.div
              key={i}
              custom={0.4 + (i * 0.1)}
              variants={TEXT_VARIANTS}
              initial="hidden"
              animate="visible"
              className="flex items-start gap-4 max-[767px]:gap-3 p-4 max-[767px]:p-3 border-l-2 border-slate-800 hover:border-red-500/50 hover:bg-red-950/10 transition-all duration-300 group rounded-r-lg"
            >
              <item.icon className="w-6 h-6 max-[767px]:w-5 max-[767px]:h-5 text-slate-600 group-hover:text-red-400 transition-colors shrink-0 mt-0.5" />
              <div>
                <h3 className="text-slate-200 font-medium mb-1 text-base max-[767px]:text-sm">{item.title}</h3>
                <p className="text-sm max-[767px]:text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        custom={0.6}
        variants={TEXT_VARIANTS}
        initial="hidden"
        animate="visible"
        className="relative block max-[767px]:hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 blur-3xl" />
        <div className="relative bg-slate-900/50 border border-slate-800 backdrop-blur-xl p-8 max-[767px]:p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
            <Terminal className="w-5 h-5 text-cyan-400" />
            <span className="text-sm font-mono text-cyan-400">VANI_PROTOCOL_INIT</span>
          </div>

          <div className="space-y-6">
            <div className="group">
              <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-400" /> Cryptographic Anonymity
              </h4>
              <p className="text-sm text-slate-400 pl-6 border-l border-slate-800">
                Identity is hashed (SHA-256). We verify <em>who</em> you are without knowing <em>which</em> one you are.
              </p>
            </div>
            <div className="group">
              <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                <Server className="w-4 h-4 text-emerald-400" /> Immutable Evidence
              </h4>
              <p className="text-sm text-slate-400 pl-6 border-l border-slate-800">
                AES-256 encrypted submissions. Time-stamped. Tamper-proof.
              </p>
            </div>
            <div className="group">
              <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                <Scale className="w-4 h-4 text-emerald-400" /> AI-Assisted Resolution
              </h4>
              <p className="text-sm text-slate-400 pl-6 border-l border-slate-800">
                Unbiased algorithms categorize issues and mediate disputes.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
);

// --- Slide 3: Architecture ---
const SlideArchitecture = () => (
  <div className="h-full w-full flex flex-col items-center justify-center relative z-10 px-8 max-[767px]:px-4 py-0 max-[767px]:pt-20 max-[767px]:pb-24 overflow-hidden max-[767px]:overflow-y-auto no-scrollbar">
    <motion.div
      custom={0.2}
      variants={TEXT_VARIANTS}
      initial="hidden"
      animate="visible"
      className="text-center mb-16 max-[767px]:mb-8 shrink-0"
    >
      <h2 className="text-5xl max-[767px]:text-3xl font-bold text-white mb-4 max-[767px]:mb-2">Architecture of Trust</h2>
      <p className="text-base max-[767px]:text-sm text-slate-400 font-light tracking-wide max-w-lg mx-auto">End-to-end verifiable governance pipeline</p>
    </motion.div>

    <div className="grid grid-cols-4 max-[767px]:grid-cols-2 max-[639px]:grid-cols-1 gap-6 max-[767px]:gap-4 max-w-7xl w-full relative">
      {/* Connecting Line - Desktop Only */}
      <div className="block max-[767px]:hidden absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-900 to-transparent -translate-y-1/2 z-0" />

      {[
        { icon: Lock, title: "Secure Entry", desc: "Zero-knowledge proofs verify credentials." },
        { icon: FileText, title: "Submission", desc: "Grievance encrypted & metadata stripped." },
        { icon: Activity, title: "AI Processing", desc: "VANI AI analyzes & routes urgency." },
        { icon: Scale, title: "Resolution", desc: "Admins resolve. Outcome on public ledger." }
      ].map((step, i) => (
        <motion.div
          key={i}
          custom={0.4 + (i * 0.15)}
          variants={TEXT_VARIANTS}
          initial="hidden"
          animate="visible"
          className="relative z-10 bg-slate-950 border border-slate-800 p-6 max-[767px]:p-4 rounded-xl hover:border-cyan-500/30 transition-colors duration-500 group flex flex-col items-start text-left max-[767px]:items-center max-[767px]:text-center"
        >
          <div className="w-12 h-12 max-[767px]:w-10 max-[767px]:h-10 bg-slate-900 rounded-lg flex items-center justify-center mb-4 max-[767px]:mb-3 text-cyan-500 group-hover:text-cyan-400 group-hover:scale-110 transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.1)] shrink-0">
            <step.icon className="w-5 h-5 md:w-6 md:h-6" />
          </div>
          <div className="text-xs max-[767px]:text-[10px] font-mono text-cyan-700 mb-2 max-[767px]:mb-1 w-full">STEP 0{i + 1}</div>
          <h3 className="text-lg max-[767px]:text-base font-bold text-slate-200 mb-2 max-[767px]:mb-1">{step.title}</h3>
          <p className="text-sm max-[767px]:text-xs text-slate-500 leading-relaxed">{step.desc}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

// --- Slide 4: Principles / AI ---
const SlidePrinciples = () => (
  <div className="h-full w-full flex flex-col items-center justify-center relative z-10 px-8 max-[767px]:px-4 max-w-6xl mx-auto py-0 max-[767px]:pt-20 max-[767px]:pb-24 overflow-hidden max-[767px]:overflow-y-auto no-scrollbar">
    <motion.div
      custom={0.2}
      variants={TEXT_VARIANTS}
      initial="hidden"
      animate="visible"
      className="text-center mb-12 max-[767px]:mb-8 shrink-0"
    >
      <div className="inline-flex items-center gap-2 px-4 py-1.5 max-[767px]:px-3 max-[767px]:py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6 max-[767px]:mb-4">
        <span className="w-2 h-2 max-[767px]:w-1.5 max-[767px]:h-1.5 rounded-full bg-blue-400 animate-pulse" />
        <span className="text-xs max-[767px]:text-[10px] font-medium text-blue-300 tracking-wide uppercase">Powered by Google Gemini</span>
      </div>
      <h2 className="text-5xl max-[767px]:text-3xl font-bold text-white mb-6 max-[767px]:mb-4">Core Intelligence</h2>
    </motion.div>

    <div className="grid grid-cols-3 max-[767px]:grid-cols-2 max-[639px]:grid-cols-1 gap-8 max-[767px]:gap-4 w-full mb-16 max-[767px]:mb-8">
      {[
        { icon: Users, title: "Anonymous Identity", desc: "SHA-256 hashing creates irreversible identity tokens." },
        { icon: Server, title: "Secure Evidence", desc: "Military-grade encryption protects all documentation." },
        { icon: Activity, title: "Real-time Analytics", desc: "Live dashboards track institutional health & sentiment." }
      ].map((item, i) => (
        <motion.div
          key={i}
          custom={0.4 + (i * 0.1)}
          variants={TEXT_VARIANTS}
          initial="hidden"
          animate="visible"
          className="bg-slate-900/40 border border-slate-800/60 p-8 max-[767px]:p-5 rounded-2xl hover:bg-slate-900/60 transition-colors flex flex-col items-start text-left max-[767px]:items-center max-[767px]:text-center"
        >
          <item.icon className="w-8 h-8 max-[767px]:w-6 max-[767px]:h-6 text-slate-400 mb-4 max-[767px]:mb-3 shrink-0" />
          <h3 className="text-xl max-[767px]:text-lg font-semibold text-slate-200 mb-3 max-[767px]:mb-2">{item.title}</h3>
          <p className="text-sm max-[767px]:text-xs text-slate-500 leading-relaxed">{item.desc}</p>
        </motion.div>
      ))}
    </div>

    <motion.div
      custom={0.8}
      variants={TEXT_VARIANTS}
      initial="hidden"
      animate="visible"
      className="flex flex-row max-[639px]:flex-col items-center gap-4 max-[767px]:gap-3 opacity-60 hover:opacity-100 transition-opacity shrink-0"
    >
      <span className="text-xs max-[767px]:text-[10px] text-slate-500 uppercase tracking-widest text-center">Official Technology Partner</span>
      <div className="block max-[639px]:hidden h-4 max-[767px]:h-3 w-px bg-slate-700" />
      <span className="text-sm max-[767px]:text-xs font-semibold bg-gradient-to-r from-blue-400 via-purple-400 to-red-400 bg-clip-text text-transparent text-center">
        Google Cloud AI
      </span>
    </motion.div>
  </div>
);

// --- Main Landing Page Component ---

const LandingPage = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Touch handling state
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const slides = React.useMemo(() => [
    <SlideIdentity />,
    <SlideProblem />,
    <SlideArchitecture />,
    <SlidePrinciples />
  ], []);

  const paginate = useCallback((newDirection: number) => {
    setPage((prev) => {
      const nextPage = prev + newDirection;
      if (nextPage < 0) return slides.length - 1;
      if (nextPage >= slides.length) return 0;
      return nextPage;
    });
    setDirection(newDirection);
  }, [slides.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") paginate(1);
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") paginate(-1);
      if (e.key === " ") setIsPaused(prev => !prev);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [paginate]);

  // Auto-play
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      paginate(1);
    }, 5000); // 5 seconds per slide
    return () => clearInterval(timer);
  }, [paginate, isPaused]);

  // Touch handlers
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) paginate(1);
    if (isRightSwipe) paginate(-1);
  };

  return (
    <div
      className="h-screen w-screen overflow-hidden bg-[#020617] text-slate-200 font-sans selection:bg-cyan-500/30 touch-pan-y"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <BackgroundGrid />

      {/* Header */}
      <header className="fixed top-0 w-full z-50 px-6 max-[767px]:px-4 py-4 max-[767px]:py-3 flex justify-between items-center bg-gradient-to-b from-[#020617] via-[#020617]/80 to-transparent backdrop-blur-none max-[767px]:backdrop-blur-[2px]">
        <div className="flex items-center gap-4 max-[767px]:gap-3 cursor-pointer group" onClick={() => setPage(0)}>
          <div className="relative flex items-center justify-center w-14 h-14 max-[767px]:w-10 max-[767px]:h-10 rounded-full bg-slate-900/50 border border-slate-800 group-hover:border-cyan-500/50 transition-colors shrink-0">
            <VaniLogo variant="icon" size="md" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg max-[767px]:text-base text-slate-100 tracking-wide leading-none">VANI</span>
            <span className="text-[10px] max-[767px]:text-[8px] text-slate-500 font-medium uppercase tracking-wider group-hover:text-cyan-400/70 transition-colors block max-[639px]:hidden">Central University of Jammu</span>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-1.5 md:p-2 rounded-full hover:bg-slate-800/50 text-slate-400 hover:text-cyan-400 transition-colors"
            title={isPaused ? "Resume Slideshow" : "Pause Slideshow"}
          >
            {isPaused ? <Play className="w-4 h-4 max-[767px]:w-3 max-[767px]:h-3" /> : <Pause className="w-4 h-4 max-[767px]:w-3 max-[767px]:h-3" />}
          </button>

          <Button
            onClick={() => navigate("/portal")}
            className="bg-cyan-950/50 hover:bg-cyan-900/50 text-cyan-400 border border-cyan-800/50 backdrop-blur-sm transition-all duration-300 group text-sm max-[767px]:text-xs px-4 py-2 max-[767px]:px-3 max-[767px]:py-1.5 h-auto whitespace-nowrap"
          >
            ENTER SYSTEM
            <ChevronRight className="w-4 h-4 max-[767px]:w-3 max-[767px]:h-3 ml-1 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </header>

      {/* Main Slide Area */}
      <div className="relative w-full h-full flex items-center justify-center">
        <AnimatePresence initial={true} custom={direction} mode="wait">
          <motion.div
            key={page}
            custom={direction}
            variants={VARIANTS}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.4 },
              filter: { duration: 0.4 }
            }}
            className="absolute w-full h-full"
          >
            {slides[page]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Pills */}
      <div className="fixed bottom-8 max-[767px]:bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-3 max-[767px]:gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > page ? 1 : -1);
              setPage(index);
            }}
            className={cn(
              "h-1 rounded-full transition-all duration-300 backdrop-blur-sm",
              index === page
                ? "w-12 max-[767px]:w-8 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
                : "w-8 max-[767px]:w-4 bg-slate-800 hover:bg-slate-700"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Footer Info */}
      <div className="fixed bottom-6 right-6 z-40 text-[10px] text-slate-600 font-mono block max-[767px]:hidden">
        SECURE CONNECTION // TLS 1.3 // 256-BIT ENCRYPTION
      </div>
    </div>
  );
};

export default LandingPage;
