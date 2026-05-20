import { motion } from "framer-motion";
import SectionReveal from "./SectionReveal";

export default function HeroBanner({ onStart }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gold/8 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-48 h-48 bg-terracotta/5 rounded-full blur-2xl" />

      <SectionReveal delay={0.2}>
        {/* Ornamental line */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-8 h-px bg-gold/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-gold/50" />
          <div className="w-8 h-px bg-gold/40" />
        </div>

        {/* Restaurant Logo Image */}
        <div className="flex justify-center mb-4 max-w-[240px] mx-auto">
          <img 
            src="/logo.png" 
            alt="Ma Chilli Patnam Logo" 
            className="w-full h-auto object-contain mix-blend-multiply"
          />
        </div>

        {/* Ornamental divider */}
        <div className="flex items-center justify-center gap-2 my-6">
          <div className="w-12 h-px bg-gold/30" />
          <svg width="12" height="12" viewBox="0 0 12 12" className="text-gold/50">
            <path d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5Z" fill="currentColor" />
          </svg>
          <div className="w-12 h-px bg-gold/30" />
        </div>
      </SectionReveal>

      <SectionReveal delay={0.6}>
        <p className="font-display text-lg text-charcoal/70 text-center leading-relaxed max-w-[280px] italic">
          "How was your experience with us today?"
        </p>
        <p className="font-body text-sm text-muted-foreground text-center mt-3 max-w-[260px]">
          We'd love to hear about your visit. It only takes a moment.
        </p>
      </SectionReveal>

      <SectionReveal delay={1}>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="mt-10 bg-deep-green text-cream px-10 py-4 rounded-2xl font-body font-medium text-[15px] border border-gold/15 shadow-lg shadow-deep-green/10"
        >
          Share Your Experience
        </motion.button>
      </SectionReveal>

      {/* Bottom ornament */}
      <SectionReveal delay={1.2}>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
          <div className="w-6 h-px bg-gold/20" />
          <p className="font-body text-[10px] text-muted-foreground/50 tracking-[0.2em] uppercase">
            kajaguda,Hyderabad
          </p>
          <div className="w-6 h-px bg-gold/20" />
        </div>
      </SectionReveal>
    </div>
  );
}