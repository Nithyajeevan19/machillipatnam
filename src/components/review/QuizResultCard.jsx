import { motion } from "framer-motion";
import SectionReveal from "./SectionReveal";
import AnimatedButton from "./AnimatedButton";

const INSTAGRAM_URL = "https://www.instagram.com/machillipatnam_hyd";

export default function QuizResultCard({ result, guestName, onFinish }) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `I'm ${result.title}!`,
        text: `I just found out my dining vibe at Ma Chilli Patnam — I'm ${result.title}! ${result.emoji} #MaChilliPatnam`,
        url: window.location.href,
      });
    } else {
      window.open(INSTAGRAM_URL, "_blank");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <SectionReveal>
        <div className={`w-full max-w-sm mx-auto rounded-3xl bg-gradient-to-br ${result.color} p-6 pt-8 pb-8 relative overflow-hidden`}>
          <div className="absolute top-0 right-0 w-28 h-28 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2" />

          <div className="relative z-10">
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="text-5xl block mb-4"
            >
              {result.emoji}
            </motion.span>

            <p className="font-body text-[10px] tracking-[0.2em] uppercase text-cream/40 mb-2">
              {guestName ? `${guestName}, you are` : "You are"}
            </p>

            <h3 className="font-display text-2xl font-semibold text-cream mb-3">
              {result.title}
            </h3>

            <p className="font-body text-[13px] text-cream/65 leading-relaxed">
              {result.desc}
            </p>

            <div className="flex items-center gap-2 mt-6">
              <div className="w-6 h-px bg-gold/20" />
              <p className="font-body text-[9px] tracking-[0.15em] uppercase text-cream/30">
                Ma Chilli Patnam
              </p>
              <div className="w-6 h-px bg-gold/20" />
            </div>
          </div>
        </div>
      </SectionReveal>

      <div className="w-full max-w-sm mt-6 space-y-3">
        <SectionReveal delay={0.3}>
          <AnimatedButton variant="primary" icon="📱" onClick={handleShare}>
            Share Your Vibe
          </AnimatedButton>
        </SectionReveal>

        <SectionReveal delay={0.4}>
          <AnimatedButton variant="ghost" onClick={onFinish}>
            Finish
          </AnimatedButton>
        </SectionReveal>
      </div>
    </div>
  );
}