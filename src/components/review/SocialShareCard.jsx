import { motion } from "framer-motion";
import SectionReveal from "./SectionReveal";
import AnimatedButton from "./AnimatedButton";

const INSTAGRAM_URL = "https://www.instagram.com/machillipatnam_hyd";

export default function SocialShareCard({ guestName, onNext }) {
  const handleShareStory = () => {
    if (navigator.share) {
      navigator.share({
        title: "Ma Chilli Patnam",
        text: `Just had an incredible meal at Ma Chilli Patnam! 🍛✨ #MaChilliPatnam`,
        url: window.location.href,
      });
    } else {
      window.open(INSTAGRAM_URL, "_blank");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <SectionReveal>
        {/* Share card preview */}
        <div className="w-full max-w-sm mx-auto mb-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-deep-green via-deep-green to-charcoal p-6 pt-8 pb-10">
            {/* Decorative elements inside card */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-terracotta/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-gold/50" />
                <p className="font-body text-[10px] tracking-[0.2em] uppercase text-cream/40">
                  A Culinary Experience
                </p>
              </div>

              <h3 className="font-display text-3xl font-semibold text-cream leading-tight">
                Ma Chilli
              </h3>
              <p className="font-display text-lg text-gold/70 italic mt-0.5">
                Patnam
              </p>

              <div className="flex items-center gap-1.5 mt-5">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-sm text-saffron">★</span>
                ))}
              </div>

              <p className="font-body text-[13px] text-cream/60 mt-3 leading-relaxed">
                {guestName
                  ? `${guestName} had an exceptional dining experience`
                  : "An exceptional dining experience"}
              </p>

              <div className="flex items-center gap-2 mt-6">
                <div className="w-6 h-px bg-gold/20" />
                <p className="font-body text-[9px] tracking-[0.15em] uppercase text-cream/30">
                  Hyderabad
                </p>
                <div className="w-6 h-px bg-gold/20" />
              </div>
            </div>
          </div>
        </div>
      </SectionReveal>

      <SectionReveal delay={0.2}>
        <p className="font-display text-lg font-medium text-deep-green text-center mb-1">
          Share the love
        </p>
        <p className="font-body text-sm text-muted-foreground text-center mb-6 max-w-[260px] mx-auto">
          Let your friends know about your experience
        </p>
      </SectionReveal>

      <div className="w-full max-w-sm space-y-3">
        <SectionReveal delay={0.3}>
          <AnimatedButton variant="primary" icon="📱" onClick={handleShareStory}>
            Share to Story
          </AnimatedButton>
        </SectionReveal>

        <SectionReveal delay={0.4}>
          <AnimatedButton
            variant="gold"
            icon="📷"
            onClick={() => window.open(INSTAGRAM_URL, "_blank")}
          >
            Tag us on Instagram
          </AnimatedButton>
        </SectionReveal>

        <SectionReveal delay={0.5}>
          <button
            onClick={onNext}
            className="w-full mt-4 font-body text-sm text-muted-foreground text-center underline underline-offset-4 decoration-gold/30"
          >
            Continue
          </button>
        </SectionReveal>
      </div>
    </div>
  );
}