import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const headlines = [
  { text: "Innovation", start: 0.15, end: 0.35 },
  { text: "Design", start: 0.4, end: 0.6 },
  { text: "Power", start: 0.7, end: 0.9 },
];

export const ScrollytellingSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1.2]);

  // Background transition: deep black → dark navy
  const bgR = useTransform(scrollYProgress, [0, 1], [8, 10]);
  const bgG = useTransform(scrollYProgress, [0, 1], [8, 18]);
  const bgB = useTransform(scrollYProgress, [0, 1], [12, 42]);

  return (
    <div ref={containerRef} className="relative" style={{ height: "300vh" }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundColor: useTransform(
              [bgR, bgG, bgB],
              ([r, g, b]) => `rgb(${r}, ${g}, ${b})`
            ),
          }}
        />

        {/* Ambient glows */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.4, 0.8]),
          }}
        >
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-sovereign-violet/10 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-sovereign-cyan/10 blur-[120px]" />
        </motion.div>

        {/* 3D Card */}
        <motion.div
          className="relative z-10 w-64 h-80 md:w-80 md:h-96 rounded-2xl flex items-center justify-center"
          style={{
            rotateY: rotate,
            scale,
            perspective: 1200,
            background:
              "linear-gradient(135deg, hsl(262 60% 55% / 0.3), hsl(192 80% 55% / 0.15), hsl(213 80% 35% / 0.3))",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow:
              "0 25px 80px -20px hsl(262 60% 55% / 0.25), inset 0 1px 0 rgba(255,255,255,0.08)",
            backdropFilter: "blur(24px)",
          }}
        >
          {/* Card inner shine */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.06] via-transparent to-transparent" />
          <div className="relative text-center space-y-3 px-6">
            <div className="w-12 h-12 mx-auto rounded-xl bg-sovereign-violet/20 flex items-center justify-center">
              <div className="w-5 h-5 rounded-md bg-gradient-to-br from-sovereign-violet to-sovereign-cyan" />
            </div>
            <p className="text-[10px] font-mono text-foreground/30 tracking-[0.25em] uppercase">
              VANI Protocol
            </p>
          </div>
        </motion.div>

        {/* Scroll-driven headlines */}
        {headlines.map(({ text, start, end }) => (
          <motion.h2
            key={text}
            className="absolute z-20 font-serif text-6xl md:text-8xl font-light pointer-events-none select-none"
            style={{
              opacity: useTransform(
                scrollYProgress,
                [start - 0.05, start, end, end + 0.05],
                [0, 1, 1, 0]
              ),
              y: useTransform(
                scrollYProgress,
                [start - 0.05, start, end, end + 0.05],
                [30, 0, 0, -30]
              ),
              background:
                "linear-gradient(90deg, hsl(262 60% 65%), hsl(192 80% 60%))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {text}
          </motion.h2>
        ))}

        {/* Progress indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 h-px bg-gradient-to-r from-transparent via-sovereign-violet to-transparent"
          style={{
            width: useTransform(scrollYProgress, [0, 1], ["0%", "40%"]),
            opacity: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]),
          }}
        />
      </div>
    </div>
  );
};
