import { motion } from "framer-motion";

const elements = [
  { size: "w-2 h-2", top: "top-[15%]", left: "left-[10%]", delay: 0, duration: 5 },
  { size: "w-1.5 h-1.5", top: "top-[35%]", left: "right-[15%]", delay: 1.2, duration: 4.5 },
  { size: "w-1 h-1", top: "top-[60%]", left: "left-[20%]", delay: 0.8, duration: 5.5 },
  { size: "w-2.5 h-2.5", top: "top-[80%]", left: "right-[25%]", delay: 2, duration: 4 },
  { size: "w-1.5 h-1.5", top: "top-[45%]", left: "left-[80%]", delay: 0.5, duration: 6 },
];

export default function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((el, i) => (
        <motion.div
          key={i}
          className={`absolute ${el.size} ${el.top} ${el.left} rounded-full bg-gold/20`}
          animate={{
            y: [0, -8, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: el.duration,
            delay: el.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}