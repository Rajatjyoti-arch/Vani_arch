import { motion, MotionValue, useTransform } from "framer-motion";
import bgUniversity from "@/assets/bg-university.jpg";
import bgClassroom from "@/assets/bg-classroom.jpg";
import bgBook from "@/assets/bg-book.jpg";

interface Props {
  scrollYProgress: MotionValue<number>;
}

export const ScrollBackgrounds = ({ scrollYProgress }: Props) => {
  // University: visible 0–0.35, fade out by 0.45 — brighter & smoother
  const uniOpacity = useTransform(scrollYProgress, [0, 0.08, 0.28, 0.42], [0.25, 0.45, 0.45, 0]);
  const uniScale = useTransform(scrollYProgress, [0, 0.45], [1, 1.08]);

  // Classroom: fade in 0.28–0.42, visible 0.42–0.62, fade out by 0.72
  const classOpacity = useTransform(scrollYProgress, [0.28, 0.42, 0.58, 0.72], [0, 0.45, 0.45, 0]);
  const classScale = useTransform(scrollYProgress, [0.28, 0.72], [1, 1.08]);

  // Book: fade in 0.62–0.72, visible 0.72–1.0
  const bookOpacity = useTransform(scrollYProgress, [0.62, 0.72, 0.88, 1.0], [0, 0.45, 0.45, 0.3]);
  const bookScale = useTransform(scrollYProgress, [0.62, 1.0], [1, 1.08]);

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
            className="w-full h-full object-cover blur-sm"
            style={{ scale: img.scale }}
            loading="eager"
          />
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-black/45" />
        </motion.div>
      ))}
    </>
  );
};
