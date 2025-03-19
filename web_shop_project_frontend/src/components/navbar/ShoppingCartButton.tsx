import { ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { ROUTES } from '../../config/Routes';
import { useNavigate } from 'react-router-dom';
import useCartStore from '@/store/useShoppingCartStore'; // Zustand importieren

export const ShoppingCartButton = () => {
  const navigate = useNavigate();
  const { cart } = useCartStore();

  const uniqueProductsCount = cart.length;

  const buttonStyle =
    uniqueProductsCount > 0
      ? 'text-amber-600  ' // Wenn Produkte im Warenkorb sind
      : 'text-gray-600 '; // wenn keine Produkte im Korb sind

  const glowEffect =
    uniqueProductsCount > 0
      ? {
          scale: 1.1,
          boxShadow: '0px 0px 20px rgba(255, 159, 0, 0.6)',
          transition: { type: 'spring', stiffness: 300, damping: 10 },
        }
      : {};

  const handleOnClick = () => {
    navigate(ROUTES.SHOPPING_CART);
  };

  return (
    <motion.button
      className={`relative cursor-pointer text-6xl ${buttonStyle} rounded-full p-2`}
      onClick={handleOnClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleOnClick(); // Klick auslösen, wenn "Enter" oder Leertaste gedrückt wird
        }
      }}
      aria-label="Warenkorb ansehen"
      role="button"
      tabIndex={0}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={glowEffect}
    >
      <ShoppingCart size={34} />

      {/* Anzeige der Anzahl der unterschiedlichen Produkte */}
      {uniqueProductsCount > 0 && (
        <div className="absolute top-0 right-0 rounded-full bg-red-500 px-2 py-1 text-xs text-white">
          {uniqueProductsCount}
        </div>
      )}
    </motion.button>
  );
};
