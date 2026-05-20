import { motion } from "framer-motion";

export default function AnimatedButton({
  children,
  onClick,
  variant = "primary",
  className = "",
  disabled = false,
  icon,
}) {
  const variants = {
    primary: "bg-deep-green text-cream border border-gold/20",
    secondary: "bg-ivory text-deep-green border border-gold/30",
    ghost: "bg-transparent text-deep-green border border-gold/20",
    gold: "bg-gold/15 text-deep-green border border-gold/40",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.01 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full py-4 px-6 rounded-2xl font-body font-medium text-[15px]
        flex items-center justify-center gap-2.5
        transition-colors duration-300
        disabled:opacity-50 disabled:pointer-events-none
        ${variants[variant]}
        ${className}
      `}
    >
      {icon && <span className="text-lg">{icon}</span>}
      {children}
    </motion.button>
  );
}