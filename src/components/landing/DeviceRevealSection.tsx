import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { VaniLogo } from "@/components/ui/VaniLogo";

export const DeviceRevealSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Device body fades away
  const deviceOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 0.85], [1, 1, 0.3, 0]);
  // Device border radius shrinks to 0
  const deviceRadius = useTransform(scrollYProgress, [0, 0.7], [24, 0]);
  // Screen expands from centered laptop size to full viewport
  const screenScale = useTransform(scrollYProgress, [0, 0.4, 1], [1, 1, 3.5]);
  const screenWidth = useTransform(scrollYProgress, [0, 0.5, 1], ["60%", "80%", "110%"]);
  const screenHeight = useTransform(scrollYProgress, [0, 0.5, 1], ["55%", "70%", "110%"]);
  // Screen border fades
  const screenBorderOpacity = useTransform(scrollYProgress, [0.5, 0.8], [1, 0]);
  // Content inside screen fades in
  const screenContentOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
  // Notch fades
  const notchOpacity = useTransform(scrollYProgress, [0.2, 0.5], [1, 0]);
  // Heading text
  const headingOpacity = useTransform(scrollYProgress, [0, 0.15, 0.4, 0.55], [1, 1, 0, 0]);
  const headingY = useTransform(scrollYProgress, [0, 0.4], [0, -60]);
  // Reveal text after expansion
  const revealOpacity = useTransform(scrollYProgress, [0.7, 0.9], [0, 1]);
  // Progress bar
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  // Background glow
  const bgGlow = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.3, 0.6]);

  return (
    <div ref={containerRef} className="relative" style={{ height: "400vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {/* Background */}
        <div className="absolute inset-0 bg-[hsl(220,16%,4%)]" />
        
        {/* Ambient glow that builds */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: bgGlow }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[radial-gradient(ellipse_at_center,hsl(262,60%,55%,0.12),transparent_60%)]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-[radial-gradient(ellipse_at_center,hsl(192,80%,55%,0.08),transparent_60%)]" />
        </motion.div>

        {/* Heading above device */}
        <motion.div
          className="absolute z-20 top-[12%] left-1/2 -translate-x-1/2 text-center"
          style={{ opacity: headingOpacity, y: headingY }}
        >
          <p className="text-[10px] font-mono text-foreground/30 tracking-[0.3em] uppercase mb-4">
            Introducing
          </p>
          <h2 className="font-serif text-5xl md:text-7xl font-light">
            <span className="bg-gradient-to-r from-foreground via-sovereign-violet to-sovereign-cyan bg-clip-text text-transparent">
              VANI
            </span>
          </h2>
          <p className="text-sm text-foreground/25 tracking-[0.2em] uppercase font-mono mt-4">
            The Governance Platform
          </p>
        </motion.div>

        {/* Device container */}
        <motion.div
          className="relative z-10 flex items-center justify-center"
          style={{
            width: screenWidth,
            height: screenHeight,
          }}
        >
          {/* Device body (bezel) */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: deviceOpacity,
              borderRadius: deviceRadius,
            }}
          >
            {/* Outer bezel */}
            <div
              className="absolute inset-0 rounded-[inherit]"
              style={{
                background: "linear-gradient(145deg, hsl(220 15% 15%), hsl(220 15% 8%))",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 40px 100px -20px rgba(0,0,0,0.8), 0 0 60px -10px hsl(262 60% 55% / 0.1)",
              }}
            />
            {/* Inner bezel highlight */}
            <div
              className="absolute inset-[3px] rounded-[inherit]"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 30%)",
              }}
            />
          </motion.div>

          {/* Screen */}
          <motion.div
            className="absolute inset-[6px] md:inset-[8px] overflow-hidden"
            style={{
              borderRadius: useTransform(scrollYProgress, [0, 0.7], [18, 0]),
            }}
          >
            {/* Screen border */}
            <motion.div
              className="absolute inset-0 pointer-events-none z-20"
              style={{
                opacity: screenBorderOpacity,
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
                borderRadius: "inherit",
              }}
            />

            {/* Screen background - the "app" */}
            <div className="absolute inset-0 bg-[hsl(220,16%,5%)]">
              {/* Fake UI inside the screen */}
              <div className="absolute inset-0 flex flex-col">
                {/* Fake top bar */}
                <motion.div
                  className="flex items-center justify-between px-4 py-2 border-b border-white/[0.04]"
                  style={{ opacity: notchOpacity }}
                >
                  <div className="flex items-center gap-2">
                    <VaniLogo variant="icon" size="sm" />
                    <span className="text-[8px] font-mono text-foreground/30 tracking-widest uppercase">VANI Console</span>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-sovereign-rose/40" />
                    <div className="w-2 h-2 rounded-full bg-sovereign-gold/40" />
                    <div className="w-2 h-2 rounded-full bg-sovereign-emerald/40" />
                  </div>
                </motion.div>

                {/* Dashboard mockup content */}
                <motion.div
                  className="flex-1 p-4 md:p-6 space-y-4"
                  style={{ opacity: screenContentOpacity }}
                >
                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-2 md:gap-3">
                    {[
                      { label: "Reports", value: "247", color: "from-sovereign-violet/20 to-sovereign-violet/5" },
                      { label: "Resolved", value: "89%", color: "from-sovereign-emerald/20 to-sovereign-emerald/5" },
                      { label: "Active", value: "31", color: "from-sovereign-cyan/20 to-sovereign-cyan/5" },
                    ].map((stat, i) => (
                      <div
                        key={i}
                        className={`rounded-lg p-3 bg-gradient-to-b ${stat.color}`}
                        style={{ border: "0.5px solid rgba(255,255,255,0.04)" }}
                      >
                        <div className="text-[8px] md:text-[10px] font-mono text-foreground/30 uppercase tracking-wider">{stat.label}</div>
                        <div className="text-lg md:text-2xl font-serif text-foreground/70 mt-1">{stat.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Fake chart area */}
                  <div className="rounded-lg p-3 md:p-4 flex-1 min-h-[80px]" style={{ background: "rgba(255,255,255,0.015)", border: "0.5px solid rgba(255,255,255,0.04)" }}>
                    <div className="text-[8px] md:text-[10px] font-mono text-foreground/25 uppercase tracking-wider mb-3">Sentiment Analysis</div>
                    <div className="flex items-end gap-1 h-12 md:h-20">
                      {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85, 50, 95].map((h, i) => (
                        <motion.div
                          key={i}
                          className="flex-1 rounded-sm bg-gradient-to-t from-sovereign-violet/30 to-sovereign-cyan/20"
                          style={{
                            height: `${h}%`,
                            opacity: useTransform(scrollYProgress, [0.35 + i * 0.02, 0.4 + i * 0.02], [0, 1]),
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Fake list */}
                  <div className="space-y-1.5">
                    {["Grievance #1247 — Under Review", "Grievance #1246 — Resolved", "Grievance #1245 — Escalated"].map((text, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center gap-2 px-3 py-2 rounded-md text-[8px] md:text-[10px] font-mono text-foreground/25"
                        style={{
                          background: "rgba(255,255,255,0.01)",
                          border: "0.5px solid rgba(255,255,255,0.03)",
                          opacity: useTransform(scrollYProgress, [0.45 + i * 0.05, 0.5 + i * 0.05], [0, 1]),
                        }}
                      >
                        <div className={`w-1.5 h-1.5 rounded-full ${i === 0 ? "bg-sovereign-gold/60" : i === 1 ? "bg-sovereign-emerald/60" : "bg-sovereign-rose/60"}`} />
                        {text}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Reveal text after expansion */}
        <motion.div
          className="absolute z-20 bottom-[15%] left-1/2 -translate-x-1/2 text-center"
          style={{ opacity: revealOpacity }}
        >
          <p className="text-sm text-foreground/40 tracking-[0.2em] uppercase font-mono">
            Your institution. Transparent.
          </p>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] z-50 bg-gradient-to-r from-sovereign-violet via-sovereign-cyan to-sovereign-emerald"
          style={{ width: progressWidth }}
        />

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
        >
          <span className="text-[9px] font-mono text-foreground/15 tracking-[0.2em] uppercase">Scroll</span>
          <motion.div
            className="w-px h-6 bg-gradient-to-b from-foreground/15 to-transparent"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </div>
  );
};
