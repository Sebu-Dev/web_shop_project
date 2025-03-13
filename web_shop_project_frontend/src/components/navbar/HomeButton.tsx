import { Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/config/Routes';

export const HomeButton = () => {
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <motion.div
      className="cursor-pointer text-6xl"
      whileTap={{ scale: 0.9 }}
      onClick={handleOnClick}
    >
      <Home size={34} />
    </motion.div>
  );
};
