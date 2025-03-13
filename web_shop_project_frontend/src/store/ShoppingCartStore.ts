import { ProductType } from '@/types/ProductType';
import { create } from 'zustand';

interface CartState {
  cart: ProductType[];
  addToCart: (item: ProductType) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

const useCartStore = create<CartState>((set) => ({
  cart: [],
  addToCart: (item: ProductType) => {
    const quantity = item.quantity ?? 1;

    // Falls ja, die Menge des Produkts erhöhen
    set((state) => {
      // Prüfen, ob das Produkt bereits im Warenkorb ist
      if (state.cart.some((i) => i.id === item.id)) {
        return {
          cart: state.cart.map((i) =>
            i.id === item.id
              ? { ...i, quantity: (i.quantity || 0) + quantity }
              : i
          ),
        };
      } else {
        // Falls nein, das Produkt mit der angegebenen Menge (oder 1) hinzufügen
        return {
          cart: [...state.cart, { ...item, quantity }],
        };
      }
    });
  },
  removeFromCart: (itemId: string) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== itemId),
    })),
  updateQuantity: (itemId: string, quantity: number) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      ),
    })),
  clearCart: () => set({ cart: [] }),
}));

export default useCartStore;
