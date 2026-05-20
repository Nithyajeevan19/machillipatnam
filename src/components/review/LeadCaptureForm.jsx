import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionReveal from "./SectionReveal";
import AnimatedButton from "./AnimatedButton";

const ENDPOINT = "https://script.google.com/macros/s/AKfycbzNw0TI2WJK4TpooAYbFofpYf1KxPBgpTHgGQ0pnFog1HfA81F4vPKN0iyaSNzJdte_/exec";

export default function LeadCaptureForm({ onSuccess, guestName, setGuestName, emotion, feedbackData }) {
  const [name, setName] = useState(guestName || "");
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState(1);
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleNameNext = () => {
    if (!name.trim()) {
      setNameError("We'd love to know your name ✨");
      return;
    }
    setNameError("");
    setGuestName(name.trim());
    setStep(2);
  };

  const handleSubmit = async () => {
    const phoneRegex = /^[+]?[\d\s-]{7,15}$/;
    if (!phone.trim() || !phoneRegex.test(phone.trim())) {
      setPhoneError("Please enter a valid phone number 📱");
      return;
    }
    setPhoneError("");
    setIsSubmitting(true);

    const ratingValue = emotion === "improve"
      ? "Needs Improvement"
      : (emotion ? emotion.charAt(0).toUpperCase() + emotion.slice(1) : "Positive");

    const reviewValue = feedbackData
      ? [feedbackData.issues.join(", "), feedbackData.feedback.trim()].filter(Boolean).join(" - ")
      : "";

    const dateObj = new Date();
    const formattedTime = `${dateObj.getMonth() + 1}/${dateObj.getDate()}/${dateObj.getFullYear()} ${dateObj.getHours().toString().padStart(2, '0')}:${dateObj.getMinutes().toString().padStart(2, '0')}`;

    if (emotion === "improve") {
      // For Needs Improvement: just capture name & phone, then go to FeedbackForm.
      setIsSuccess(true);
      setTimeout(() => onSuccess(name.trim(), phone.trim()), 1200);
      return;
    }

    // Use URLSearchParams so Google Apps Script e.parameter reads all fields reliably
    const params = new URLSearchParams();
    params.append("NAME",    name.trim());
    params.append("PHONE",   phone.trim());
    params.append("TIME",    formattedTime);
    params.append("Reviews", reviewValue);
    params.append("Rating",  ratingValue);
    params.append("sourcePage", "Ma Chilli Patnam");

    try {
      await fetch(ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        body: params,
      });
      setIsSuccess(true);
      setTimeout(() => onSuccess(name.trim(), phone.trim()), 1800);
    } catch {
      setIsSuccess(true);
      setTimeout(() => onSuccess(name.trim(), phone.trim()), 1800);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center"
        >
          <div className="w-16 h-16 rounded-full bg-deep-green/10 flex items-center justify-center mx-auto mb-6">
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="text-3xl"
            >
              ✨
            </motion.span>
          </div>
          <h2 className="font-display text-2xl font-semibold text-deep-green mb-2">
            Thanks, {name}!
          </h2>
          <p className="font-body text-sm text-muted-foreground">
            We've saved your details 💛
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <SectionReveal>
        <p className="font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground/50 text-center mb-1">
          Step {step} of 2
        </p>
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className={`h-1 rounded-full transition-all duration-500 ${step >= 1 ? "w-8 bg-deep-green/40" : "w-4 bg-gold/20"}`} />
          <div className={`h-1 rounded-full transition-all duration-500 ${step >= 2 ? "w-8 bg-deep-green/40" : "w-4 bg-gold/20"}`} />
        </div>
      </SectionReveal>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35 }}
            className="w-full max-w-sm"
          >
            <h2 className="font-display text-2xl font-semibold text-deep-green text-center mb-2">
              Before you go…
            </h2>
            <p className="font-body text-sm text-muted-foreground text-center mb-8">
              Tell us your name so we can make it personal
            </p>

            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); setNameError(""); }}
                placeholder="Your name"
                className={`
                  w-full p-4 rounded-2xl bg-ivory border font-body text-[15px] text-foreground
                  placeholder:text-muted-foreground/40 focus:outline-none transition-all duration-300
                  ${nameError
                    ? "border-terracotta/40 focus:ring-2 focus:ring-terracotta/10"
                    : "border-gold/15 focus:border-gold/40 focus:ring-2 focus:ring-gold/10"
                  }
                `}
              />
              <AnimatePresence>
                {nameError && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="font-body text-xs text-terracotta mt-2 ml-1"
                  >
                    {nameError}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-6">
              <AnimatedButton variant="primary" onClick={handleNameNext}>
                Continue
              </AnimatedButton>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35 }}
            className="w-full max-w-sm"
          >
            <h2 className="font-display text-2xl font-semibold text-deep-green text-center mb-2">
              Almost done, {name}
            </h2>
            <p className="font-body text-sm text-muted-foreground text-center mb-8">
              We'd love to stay in touch for something special
            </p>

            <div className="relative">
              <input
                type="tel"
                value={phone}
                onChange={(e) => { setPhone(e.target.value); setPhoneError(""); }}
                placeholder="Phone number"
                className={`
                  w-full p-4 rounded-2xl bg-ivory border font-body text-[15px] text-foreground
                  placeholder:text-muted-foreground/40 focus:outline-none transition-all duration-300
                  ${phoneError
                    ? "border-terracotta/40 focus:ring-2 focus:ring-terracotta/10"
                    : "border-gold/15 focus:border-gold/40 focus:ring-2 focus:ring-gold/10"
                  }
                `}
              />
              <AnimatePresence>
                {phoneError && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="font-body text-xs text-terracotta mt-2 ml-1"
                  >
                    {phoneError}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-6">
              <AnimatedButton
                variant="primary"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-cream/30 border-t-cream rounded-full"
                  />
                ) : (
                  "Save & Continue"
                )}
              </AnimatedButton>
            </div>

            <button
              onClick={() => setStep(1)}
              className="w-full mt-3 font-body text-sm text-muted-foreground text-center"
            >
              ← Back
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}