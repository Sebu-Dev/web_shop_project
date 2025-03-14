import { motion, AnimatePresence } from 'framer-motion';
import { User } from 'lucide-react';
import { useState } from 'react';
import { LoginForm } from '../authentification/LoginForm';
import { RegistrationForm } from '../authentification/RegistrationForm';
import { Popup } from '../ui-components/Popup';
import { useUserSession } from '@/store/UserSessionStore';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';

export const UserButton = () => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useUserSession();

  const handleLogoutClick = () => {
    try {
      logout();
    } catch (error) {
      console.error('Logout fehlgeschlagen:', error);
    }
    setDropdownOpen(false);
  };

  const closePopup = () => {
    setShowLoginPopup(false);
  };

  const switchToRegister = () => {
    setIsLogin(false);
  };

  const switchToLogin = () => {
    setIsLogin(true);
  };

  // Hover-Effekt für DropdownMenuItem
  const itemVariants = {
    hover: { backgroundColor: '#f1f5f9', transition: { duration: 0.2 } },
  };

  return (
    <div className="relative">
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <motion.div
            className="cursor-pointer text-6xl"
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              if (!user) {
                setShowLoginPopup(true);
                setIsLogin(true);
                setDropdownOpen(false);
              }
            }}
          >
            {!user ? <User size={40} /> : <User color="teal" size={40} />}
          </motion.div>
        </DropdownMenuTrigger>

        {user && (
          <div>
            <DropdownMenuContent
              align="end"
              className="z-50 min-w-[180px] rounded-md bg-white p-2 shadow-md"
            >
              <DropdownMenuLabel className="text-sm font-medium text-gray-700">
                Mein Konto
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="my-1 border-t border-gray-200" />
              <motion.div whileHover="hover" variants={itemVariants}>
                <DropdownMenuItem
                  onClick={() => setDropdownOpen(false)}
                  className="cursor-pointer rounded-sm px-2 py-1 text-sm text-gray-700 focus:outline-none"
                >
                  Profil
                </DropdownMenuItem>
              </motion.div>
              <motion.div whileHover="hover" variants={itemVariants}>
                <DropdownMenuItem
                  onClick={() => setDropdownOpen(false)}
                  className="cursor-pointer rounded-sm px-2 py-1 text-sm text-gray-700 focus:outline-none"
                >
                  Rechnungen
                </DropdownMenuItem>
              </motion.div>
              <motion.div whileHover="hover" variants={itemVariants}>
                <DropdownMenuItem
                  onClick={handleLogoutClick}
                  className="cursor-pointer rounded-sm px-2 py-1 text-sm text-red-600 focus:outline-none"
                >
                  Logout
                </DropdownMenuItem>
              </motion.div>
            </DropdownMenuContent>
          </div>
        )}
      </DropdownMenu>

      <AnimatePresence>
        {showLoginPopup && !dropdownOpen && (
          <Popup isOpen={showLoginPopup} onClose={closePopup}>
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
