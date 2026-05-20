import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionReveal from "./SectionReveal";
import AnimatedButton from "./AnimatedButton";

const ENDPOINT = "https://script.google.com/macros/s/AKfycbzNw0TI2WJK4TpooAYbFofpYf1KxPBgpTHgGQ0pnFog1HfA81F4vPKN0iyaSNzJdte_/exec";

const issueChips = [
  "Food taste", "Service", "Wait time", "Cleanliness",
  "Ambience", "Pricing", "Staff behavior", "Order issue", "Other",
];

export default function FeedbackForm({ onSubmit, guestName, guestPhone }) {
  const [selectedIssues, setSelectedIssues] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleIssue = (issue) => {
    setSelectedIssues((prev) =>
      prev.includes(issue) ? prev.filter((i) => i !== issue) : [...prev, issue]
    );
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const reviewValue = [
      selectedIssues.join(", "),
      feedback.trim()
    ].filter(Boolean).join(" - ");

    const dateObj = new Date();
    const formattedTime = `${dateObj.getMonth() + 1}/${dateObj.getDate()}/${dateObj.getFullYear()} ${dateObj.getHours().toString().padStart(2, '0')}:${dateObj.getMinutes().toString().padStart(2, '0')}`;

    // Use URLSearchParams so Google Apps Script e.parameter reads all fields reliably
    const params = new URLSearchParams();
    params.append("NAME",    guestName || "");
    params.append("PHONE",   guestPhone || "");
    params.append("TIME",    formattedTime);
    params.append("Reviews", reviewValue);
    params.append("Rating",  "Needs Improvement");
    params.append("sourcePage", "Ma Chilli Patnam");

    try {
      await fetch(ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        body: params,
      });
      onSubmit();
    } catch (e) {
      console.error(e);
      onSubmit();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <SectionReveal>
        <div className="w-14 h-14 rounded-full bg-terracotta/8 flex items-center justify-center mx-auto mb-6">
          <span className="text-2xl">💭</span>
        </div>

        <h2 className="font-display text-2xl font-semibold text-deep-green text-center mb-2">
          We hear you
        </h2>
        <p className="font-body text-sm text-muted-foreground text-center mb-8 max-w-[280px] mx-auto leading-relaxed">
          Your feedback stays private and helps us serve you better. We genuinely want to improve.
        </p>
      </SectionReveal>

      <div className="w-full max-w-sm">
        <SectionReveal delay={0.2}>
          <p className="font-body text-xs text-muted-foreground/70 uppercase tracking-[0.15em] mb-3">
            What could we improve?
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {issueChips.map((issue) => (
              <motion.button
                key={issue}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleIssue(issue)}
                className={`
                  px-4 py-2 rounded-full font-body text-[13px] border transition-all duration-200
                  ${selectedIssues.includes(issue)
                    ? "bg-deep-green/10 border-deep-green/25 text-deep-green"
                    : "bg-ivory border-gold/15 text-muted-foreground hover:border-gold/30"
                  }
                `}
              >
                {issue}
              </motion.button>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal delay={0.35}>
          <p className="font-body text-xs text-muted-foreground/70 uppercase tracking-[0.15em] mb-3">
            Tell us more (optional)
          </p>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Share your thoughts with us..."
            rows={4}
            className="w-full p-4 rounded-2xl bg-ivory border border-gold/15 font-body text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-gold/40 focus:ring-2 focus:ring-gold/10 resize-none transition-all duration-300"
          />
        </SectionReveal>

        <SectionReveal delay={0.5}>
          <div className="mt-6">
            <AnimatedButton
              variant="primary"
              onClick={handleSubmit}
              disabled={isSubmitting || (selectedIssues.length === 0 && !feedback.trim())}
            >
              {isSubmitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-cream/30 border-t-cream rounded-full mx-auto"
                />
              ) : (
                "Submit Feedback"
              )}
            </AnimatedButton>
          </div>
          <p className="font-body text-[11px] text-muted-foreground/50 text-center mt-4">
            🔒 This feedback is private and only seen by our team
          </p>
        </SectionReveal>
      </div>
    </div>
  );
}