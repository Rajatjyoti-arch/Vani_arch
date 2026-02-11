import { motion, MotionValue, useTransform } from "framer-motion";
import bgUniversity from "@/assets/bg-university.jpg";
import bgClassroom from "@/assets/bg-classroom.jpg";
import bgBook from "@/assets/bg-book.jpg";

interface Props {
  scrollYProgress: MotionValue<number>;
}

export const ScrollBackgrounds = ({ scrollYProgress }: Props) => {
  // University: visible 0–0.35, fade out by 0.45
  const uniOpacity = useTransform(scrollYProgress, [0, 0.05, 0.30, 0.45], [0.15, 0.25, 0.25, 0]);
  const uniScale = useTransform(scrollYProgress, [0, 0.45], [1, 1.15]);

  // Classroom: fade in 0.30–0.40, visible 0.40–0.65, fade out by 0.75
  const classOpacity = useTransform(scrollYProgress, [0.30, 0.40, 0.60, 0.75], [0, 0.25, 0.25, 0]);
  const classScale = useTransform(scrollYProgress, [0.30, 0.75], [1, 1.15]);

  // Book: fade in 0.65–0.75, visible 0.75–1.0
  const bookOpacity = useTransform(scrollYProgress, [0.65, 0.75, 0.90, 1.0], [0, 0.25, 0.25, 0.15]);
  const bookScale = useTransform(scrollYProgress, [0.65, 1.0], [1, 1.15]);

  const images = [
    { src: bgUniversity, opacity: uniOpacity, scale: uniScale },
    { src: bgClassroom, opacity: classOpacity, scale: classScale },
    { src: bgBook, opacity: bookOpacity, scale: bookScale },
  ];

  return (
    <>
      {images.map((img, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{ opacity: img.opacity }}
        >
          <motion.img
            src={img.src}
            alt=""
            className="w-full h-full object-cover"
            style={{ scale: img.scale }}
            loading="eager"
          />
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>
      ))}
    </>
  );
};
