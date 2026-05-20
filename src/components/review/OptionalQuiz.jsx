import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionReveal from "./SectionReveal";
import QuizResultCard from "./QuizResultCard";

const vibes = [
  { id: "royal", emoji: "👑", label: "The Royal Feast", desc: "You love a grand spread with rich, bold flavors" },
  { id: "spice", emoji: "🌶️", label: "The Spice Seeker", desc: "Bring the heat — the spicier, the better" },
  { id: "soul", emoji: "🍛", label: "The Soul Food Lover", desc: "Comfort classics that remind you of home" },
  { id: "explorer", emoji: "🧭", label: "The Culinary Explorer", desc: "Always trying something new on the menu" },
];

const results = {
  royal: {
    title: "The Royal Feast",
    emoji: "👑",
    desc: "You dine like royalty — bold flavors, generous portions, and an experience that feels special. Ma Chilli Patnam was made for guests like you.",
    color: "from-deep-green to-charcoal",
  },
  spice: {
    title: "The Spice Seeker",
    emoji: "🌶️",
    desc: "You live for that perfect kick of heat. Our chefs love a guest who appreciates the fire in every bite. Come back for our specials — they're made for you.",
    color: "from-terracotta/80 to-deep-green",
  },
  soul: {
    title: "The Soul Food Lover",
    emoji: "🍛",
    desc: "You crave the warmth of home-cooked flavors elevated to perfection. Our recipes carry the soul of authentic cooking, just for you.",
    color: "from-brass to-deep-green",
  },
  explorer: {
    title: "The Culinary Explorer",
    emoji: "🧭",
    desc: "You love discovering new flavors and hidden gems on the menu. Keep exploring — there's always something new at Ma Chilli Patnam.",
    color: "from-deep-green to-brass/80",
  },
};

export default function OptionalQuiz({ guestName, onFinish }) {
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (id) => {
    setSelected(id);
    setTimeout(() => setShowResult(true), 400);
  };

  if (showResult && selected) {
    return <QuizResultCard result={results[selected]} guestName={guestName} onFinish={onFinish} />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <SectionReveal>
        <p className="font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground/50 text-center mb-3">
          Just for fun
        </p>
        <h2 className="font-display text-2xl font-semibold text-deep-green text-center mb-2">
          What's your dining vibe?
        </h2>
        <p className="font-body text-sm text-muted-foreground text-center mb-8 max-w-[260px] mx-auto">
          Pick the one that speaks to you
        </p>
      </SectionReveal>

      <div className="w-full max-w-sm space-y-3">
        {vibes.map((vibe, index) => (
          <SectionReveal key={vibe.id} delay={0.1 * (index + 1)}>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => handleSelect(vibe.id)}
              className={`
                w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300
                ${selected === vibe.id
                  ? "bg-deep-green/10 border-deep-green/25"
                  : "bg-ivory border-gold/15 hover:border-gold/30"
                }
              `}
            >
              <span className="text-2xl">{vibe.emoji}</span>
              <div className="text-left">
                <p className="font-body font-medium text-[14px] text-deep-green">{vibe.label}</p>
                <p className="font-body text-[12px] text-muted-foreground mt-0.5">{vibe.desc}</p>
              </div>
            </motion.button>
          </SectionReveal>
        ))}
      </div>

      <SectionReveal delay={0.6}>
        <button
          onClick={onFinish}
          className="mt-8 font-body text-sm text-muted-foreground underline underline-offset-4 decoration-gold/30"
        >
          Skip this
        </button>
      </SectionReveal>
    </div>
  );
}