import { motion } from 'framer-motion';
import { User as UserIcon } from 'lucide-react';
import { useState } from 'react';
import { useUserSession } from '@/store/UserSessionStore';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { Link } from 'react-router-dom';
import { useLoginPopup } from '@/store/LoginPopupStore';

export const UserButton = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useUserSession();
  const { showLogin } = useLoginPopup();

  const handleLogoutClick = () => {
    try {
      logout();
    } catch (error) {
      console.error('Logout fehlgeschlagen:', error);
    }
    setDropdownOpen(false);
  };

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
                showLogin();
                setDropdownOpen(false);
              }
            }}
          >
            {!user ? (
              <UserIcon size={40} />
            ) : (
              <UserIcon color="teal" size={40} />
            )}
          </motion.div>
        </DropdownMenuTrigger>

        {user && (
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
                asChild
                className="cursor-pointer rounded-sm px-2 py-1 text-sm text-gray-700 focus:outline-none"
              >
                <Link to="/user" onClick={() => setDropdownOpen(false)}>
                  Profil
                </Link>
              </DropdownMenuItem>
            </motion.div>
            <motion.div whileHover="hover" variants={itemVariants}>
              <DropdownMenuItem
                asChild
                className="cursor-pointer rounded-sm px-2 py-1 text-sm text-gray-700 focus:outline-none"
              >
                <Link to="/user/orders" onClick={() => setDropdownOpen(false)}>
                  Rechnungen
                </Link>
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
        )}
      </DropdownMenu>
    </div>
  );
};
