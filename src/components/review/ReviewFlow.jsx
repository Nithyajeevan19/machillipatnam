import { motion } from "framer-motion";
import SectionReveal from "./SectionReveal";
import AnimatedButton from "./AnimatedButton";

const GOOGLE_REVIEW_URL = "https://search.google.com/local/writereview?placeid=ChIJOUQtYwCVyzsRI5l-lkHLNZU";
const INSTAGRAM_URL = "https://www.instagram.com/machillipatnam_hyd";

export default function ReviewFlow({ emotion, onNext }) {
  const isLoved = emotion === "loved";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <SectionReveal>
        <div className="w-14 h-14 rounded-full bg-deep-green/8 flex items-center justify-center mx-auto mb-6">
          <span className="text-2xl">{isLoved ? "🌟" : "🙏"}</span>
        </div>

        <h2 className="font-display text-2xl font-semibold text-deep-green text-center mb-2">
          {isLoved ? "That means the world to us" : "Thank you for sharing"}
        </h2>
        <p className="font-body text-sm text-muted-foreground text-center mb-10 max-w-[280px] mx-auto leading-relaxed">
          {isLoved
            ? "Your kind words inspire our team every day. Would you help us share the love?"
            : "We appreciate your honesty. Here are a few ways to stay connected with us."}
        </p>
      </SectionReveal>

      <div className="w-full max-w-sm space-y-3">
        <SectionReveal delay={0.2}>
          <AnimatedButton
            variant="primary"
            icon="⭐"
            onClick={() => window.open(GOOGLE_REVIEW_URL, "_blank")}
          >
            Leave a Google Review
          </AnimatedButton>
        </SectionReveal>

        <SectionReveal delay={0.35}>
          <AnimatedButton
            variant="gold"
            icon="📸"
            onClick={() => window.open(INSTAGRAM_URL, "_blank")}
          >
            Follow us on Instagram
          </AnimatedButton>
        </SectionReveal>

        <SectionReveal delay={0.5}>
          <AnimatedButton
            variant="secondary"
            icon="💌"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: "Ma Chilli Patnam",
                  text: "Had an amazing dining experience at Ma Chilli Patnam! 🍽️✨",
                  url: window.location.href,
                });
              } else {
                window.open(INSTAGRAM_URL, "_blank");
              }
            }}
          >
            Share Your Visit
          </AnimatedButton>
        </SectionReveal>

        <SectionReveal delay={0.65}>
          <AnimatedButton
            variant="ghost"
            icon="🤝"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: "Ma Chilli Patnam",
                  text: "You should try Ma Chilli Patnam — the food is incredible! 🍛",
                  url: window.location.href,
                });
              }
            }}
          >
            Recommend to Friends
          </AnimatedButton>
        </SectionReveal>
      </div>

      <SectionReveal delay={0.8}>
        <button
          onClick={onNext}
          className="mt-8 font-body text-sm text-muted-foreground underline underline-offset-4 decoration-gold/30"
        >
          Continue
        </button>
      </SectionReveal>
    </div>
  );
}