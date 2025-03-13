import { motion, AnimatePresence } from 'framer-motion';
import { User } from 'lucide-react';
import { useState } from 'react';
import { LoginForm } from '../authentification/LoginForm';
import { RegistrationForm } from '../authentification/RegistrationForm';
import { Popup } from '../ui-components/Popup';

export const LoginButton = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleOnClick = () => {
    setShowPopup(true);
    setIsLogin(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const switchToRegister = () => {
    setIsLogin(false);
  };

  const switchToLogin = () => {
    setIsLogin(true);
  };

  return (
    <div>
      <motion.div
        className="cursor-pointer text-6xl"
        whileTap={{ scale: 0.9 }}
        onClick={handleOnClick}
      >
        <User size={34} />
      </motion.div>

      <AnimatePresence>
        {showPopup && (
          <Popup isOpen={showPopup} onClose={closePopup}>
            <motion.div
              key={isLogin ? 'login' : 'register'}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {isLogin ? (
                <LoginForm
                  onSwitchToRegister={switchToRegister}
                  onClose={closePopup}
                />
              ) : (
                <RegistrationForm
                  onSwitchToLogin={switchToLogin}
                  onClose={closePopup}
                />
              )}
            </motion.div>
          </Popup>
        )}
      </AnimatePresence>
    </div>
  );
};
