import { motion } from "framer-motion";
import SectionReveal from "./SectionReveal";

export default function SuccessState({ guestName }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <SectionReveal>
        <div className="text-center">
          {/* Celebration */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="w-20 h-20 rounded-full bg-deep-green/8 flex items-center justify-center mx-auto mb-6"
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-4xl"
            >
              🙏
            </motion.span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-display text-2xl font-semibold text-deep-green mb-2"
          >
            {guestName ? `Thank you, ${guestName}` : "Thank you"}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="font-body text-sm text-muted-foreground max-w-[260px] mx-auto leading-relaxed"
          >
            Your time means the world to us. We look forward to welcoming you again soon.
          </motion.p>

          {/* Ornamental close */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex items-center justify-center gap-3 mt-10"
          >
            <div className="w-10 h-px bg-gold/25" />
            <svg width="10" height="10" viewBox="0 0 12 12" className="text-gold/40">
              <path d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5Z" fill="currentColor" />
            </svg>
            <div className="w-10 h-px bg-gold/25" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="font-display text-lg text-brass/60 italic mt-4"
          >
            Ma Chilli Patnam
          </motion.p>
        </div>
      </SectionReveal>
    </div>
  );
}