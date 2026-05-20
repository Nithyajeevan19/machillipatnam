/*
 * Ma Chilli Patnam — Premium Mobile Review Experience
 *
 * Design Assumptions:
 * - Mobile-only layout (max-w-md centered, no desktop optimizations)
 * - Color palette: deep green, cream/ivory, antique gold, warm beige, terracotta accents
 * - Typography: Playfair Display (display), Inter (body)
 * - Flow: Hero → Emotion → Branch (positive→review, negative→feedback) → Lead Capture → Social → Quiz → End
 * - Data submitted to Google Apps Script endpoint via POST (no-cors)
 * - Google Review place ID is placeholder — replace with actual Ma Chilli Patnam place ID
 */

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FloatingElements from "../components/review/FloatingElements";
import HeroBanner from "../components/review/HeroBanner";
import EmotionButtons from "../components/review/EmotionButtons";
import ReviewFlow from "../components/review/ReviewFlow";
import FeedbackForm from "../components/review/FeedbackForm";
import LeadCaptureForm from "../components/review/LeadCaptureForm";
import SocialShareCard from "../components/review/SocialShareCard";
import OptionalQuiz from "../components/review/OptionalQuiz";
import SuccessState from "../components/review/SuccessState";

const STEPS = {
  HERO: "hero",
  EMOTION: "emotion",
  REVIEW: "review",
  FEEDBACK: "feedback",
  LEAD: "lead",
  SOCIAL: "social",
  QUIZ: "quiz",
  END: "end",
};

export default function Home() {
  const [currentStep, setCurrentStep] = useState(STEPS.HERO);
  const [emotion, setEmotion] = useState(null);
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [feedbackData, setFeedbackData] = useState(null);

  const handleEmotionSelect = (id) => {
    setEmotion(id);
    setTimeout(() => {
      // Both flows go to LEAD first!
      setCurrentStep(STEPS.LEAD);
    }, 350);
  };

  const handleFeedbackSubmit = () => {
    // For Needs Improvement, submitting the feedback goes straight to the END (Thank You)
    setCurrentStep(STEPS.END);
  };

  const handleLeadSuccess = (name, phone) => {
    setGuestName(name);
    setGuestPhone(phone);
    if (emotion === "improve") {
      // Lead captured successfully, show FEEDBACK form next
      setCurrentStep(STEPS.FEEDBACK);
    } else {
      // For positive reviews, show Google review links next
      setCurrentStep(STEPS.REVIEW);
    }
  };

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <div className="relative min-h-screen bg-background overflow-hidden no-scrollbar">
      <FloatingElements />

      <div className="relative z-10 max-w-md mx-auto">
        <AnimatePresence mode="wait">
          {currentStep === STEPS.HERO && (
            <motion.div key="hero" {...pageVariants} transition={{ duration: 0.4 }}>
              <HeroBanner onStart={() => setCurrentStep(STEPS.EMOTION)} />
            </motion.div>
          )}

          {currentStep === STEPS.EMOTION && (
            <motion.div key="emotion" {...pageVariants} transition={{ duration: 0.4 }}>
              <EmotionButtons selected={emotion} onSelect={handleEmotionSelect} />
            </motion.div>
          )}

          {currentStep === STEPS.REVIEW && (
            <motion.div key="review" {...pageVariants} transition={{ duration: 0.4 }}>
              <ReviewFlow emotion={emotion} onNext={() => setCurrentStep(STEPS.SOCIAL)} />
            </motion.div>
          )}

          {currentStep === STEPS.FEEDBACK && (
            <motion.div key="feedback" {...pageVariants} transition={{ duration: 0.4 }}>
              <FeedbackForm 
                onSubmit={handleFeedbackSubmit} 
                guestName={guestName}
                guestPhone={guestPhone}
              />
            </motion.div>
          )}

          {currentStep === STEPS.LEAD && (
            <motion.div key="lead" {...pageVariants} transition={{ duration: 0.4 }}>
              <LeadCaptureForm
                onSuccess={handleLeadSuccess}
                guestName={guestName}
                setGuestName={setGuestName}
                emotion={emotion}
                feedbackData={feedbackData}
              />
            </motion.div>
          )}

          {currentStep === STEPS.SOCIAL && (
            <motion.div key="social" {...pageVariants} transition={{ duration: 0.4 }}>
              <SocialShareCard
                guestName={guestName}
                onNext={() => setCurrentStep(STEPS.QUIZ)}
              />
            </motion.div>
          )}

          {currentStep === STEPS.QUIZ && (
            <motion.div key="quiz" {...pageVariants} transition={{ duration: 0.4 }}>
              <OptionalQuiz
                guestName={guestName}
                onFinish={() => setCurrentStep(STEPS.END)}
              />
            </motion.div>
          )}

          {currentStep === STEPS.END && (
            <motion.div key="end" {...pageVariants} transition={{ duration: 0.4 }}>
              <SuccessState guestName={guestName} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}