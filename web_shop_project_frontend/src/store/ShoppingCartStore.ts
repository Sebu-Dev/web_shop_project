import { ProductType } from '@/types/ProductType';
import { create } from 'zustand';

interface CartState {
  cart: ProductType[];
  userId: string | null;
  addToCart: (item: ProductType) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  setUser: (userId: string | null) => void;
}

const LOCAL_STORAGE_KEY = 'guest_cart';

const useCartStore = create<CartState>((set) => ({
  // Initialzustand: Laden des Gast-Warenkorbs aus dem Local Storage
  cart: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]'),
  userId: null,

  addToCart: (item: ProductType) => {
    const quantity = item.quantity ?? 1;

    set((state) => {
      // Prüfen, ob das Produkt bereits im Warenkorb ist
      const newCart = state.cart.some((i) => i.id === item.id)
        ? state.cart.map((i) =>
            i.id === item.id
              ? { ...i, quantity: (i.quantity || 0) + quantity }
              : i
          )
        : [...state.cart, { ...item, quantity }];

      // Nur im Gastmodus den Warenkorb im Local Storage speichern
      if (!state.userId) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newCart));
      }

      return { cart: newCart };
    });
  },

  removeFromCart: (itemId: string) =>
    set((state) => {
      const newCart = state.cart.filter((item) => item.id !== itemId);
      if (!state.userId) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newCart));
      }
      return { cart: newCart };
    }),

  updateQuantity: (itemId: string, quantity: number) =>
    set((state) => {
      const newCart = state.cart.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      );
      if (!state.userId) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newCart));
      }
      return { cart: newCart };
    }),

  clearCart: () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    set({ cart: [] });
  },

  setUser: (userId: string | null) => {
    if (userId) {
      // Login: Lokalen Warenkorb in den User-Warenkorb überführen
      const guestCart = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_KEY) || '[]'
      );
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      set({ userId, cart: guestCart });
    } else {
      // Logout: Warenkorb zurücksetzen
      set({ userId: null, cart: [] });
    }
  },
}));

export default useCartStore;
