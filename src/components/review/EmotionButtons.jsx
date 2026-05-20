import { motion } from "framer-motion";
import SectionReveal from "./SectionReveal";

const emotions = [
  {
    id: "loved",
    emoji: "✨",
    label: "Loved it",
    sublabel: "An exceptional experience",
    color: "bg-deep-green/8 border-deep-green/20 hover:bg-deep-green/12",
    activeColor: "bg-deep-green/15 border-deep-green/40",
  },
  {
    id: "okay",
    emoji: "🍃",
    label: "It was okay",
    sublabel: "A pleasant time",
    color: "bg-gold/8 border-gold/20 hover:bg-gold/12",
    activeColor: "bg-gold/15 border-gold/40",
  },
  {
    id: "improve",
    emoji: "💬",
    label: "Needs improvement",
    sublabel: "We'd love your honest thoughts",
    color: "bg-terracotta/6 border-terracotta/15 hover:bg-terracotta/10",
    activeColor: "bg-terracotta/12 border-terracotta/30",
  },
];

export default function EmotionButtons({ selected, onSelect }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <SectionReveal>
        <p className="font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground/60 text-center mb-3">
          Your experience
        </p>
        <h2 className="font-display text-2xl font-semibold text-deep-green text-center mb-2">
          How did it feel?
        </h2>
        <p className="font-body text-sm text-muted-foreground text-center mb-10 max-w-[260px] mx-auto">
          Tap the one that best describes your visit today
        </p>
      </SectionReveal>

      <div className="w-full max-w-sm space-y-4">
        {emotions.map((emotion, index) => (
          <SectionReveal key={emotion.id} delay={0.15 * (index + 1)}>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelect(emotion.id)}
              className={`
                w-full flex items-center gap-4 p-5 rounded-2xl border transition-all duration-300
                ${selected === emotion.id ? emotion.activeColor : emotion.color}
              `}
            >
              <span className="text-2xl">{emotion.emoji}</span>
              <div className="text-left">
                <p className="font-body font-medium text-[15px] text-deep-green">
                  {emotion.label}
                </p>
                <p className="font-body text-xs text-muted-foreground mt-0.5">
                  {emotion.sublabel}
                </p>
              </div>
              {selected === emotion.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-auto w-5 h-5 rounded-full bg-deep-green/15 flex items-center justify-center"
                >
                  <div className="w-2 h-2 rounded-full bg-deep-green" />
                </motion.div>
              )}
            </motion.button>
          </SectionReveal>
        ))}
      </div>
    </div>
  );
}