import { motion, type TargetAndTransition } from "framer-motion";
import logo from "../assets/logo.png";

export const Logo = ({
  whileHover = { scale: 1.1 }, // Standardwert für Hover
  whileTap = { scale: 0.9 }, // Standardwert für Tap
  className = "mx-2 h-10 md:w-20", // Standard Tailwind-Klasse
}: {
  whileHover?: TargetAndTransition;
  whileTap?: TargetAndTransition;
  className?: string;
}) => (
  <a href="https://sebu-dev.github.io/portfolio/">
    <motion.img
      src={logo}
      alt="logo"
      className={className}
      whileHover={whileHover} // Anpassung für Hover-Animation
      whileTap={whileTap} // Anpassung für Tap-Animation
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
    />
  </a>
);
