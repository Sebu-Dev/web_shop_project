import { ROUTES } from '@/config/Routes';
import { motion, type TargetAndTransition } from 'framer-motion';
import { Rocket } from 'lucide-react';

export const Logo = ({
  whileHover = { scale: 1.1 },
  whileTap = { scale: 0.9 },
  className = 'mx-10 h-10 w-10', // Standardgröße für das Icon
}: {
  whileHover?: TargetAndTransition;
  whileTap?: TargetAndTransition;
  className?: string;
}) => (
  <a href={ROUTES.HOME}>
    <motion.div
      whileHover={whileHover}
      whileTap={whileTap}
      transition={{ type: 'spring', stiffness: 300, damping: 10 }}
      className={className}
    >
      <Rocket className="text-primary h-full w-full" color="#007a8a" />
    </motion.div>
  </a>
);
