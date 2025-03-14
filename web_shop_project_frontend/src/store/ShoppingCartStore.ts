import { create } from 'zustand';
import { ProductType } from '@/types/ProductType';
import { useUserSession } from './UserSessionStore';

interface CartState {
  cart: ProductType[];
  userId: number | null;
  addToCart: (item: ProductType) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  syncWithUser: () => void;
}

const LOCAL_STORAGE_KEY = 'guest_cart';

const useCartStore = create<CartState>((set) => ({
  cart: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]'),
  userId: null,

  addToCart: (item: ProductType) => {
    set((state) => {
      const quantity = item.quantity ?? 1;
      const newCart = state.cart.some((i) => i.id === item.id)
        ? state.cart.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity ? i.quantity : 0 + quantity }
              : i
          )
        : [...state.cart, { ...item, quantity }];

      if (state.userId) {
        localStorage.setItem(`cart_${state.userId}`, JSON.stringify(newCart));
      } else {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newCart));
      }

      return { cart: newCart };
    });
  },

  removeFromCart: (itemId: string) => {
    set((state) => {
      const newCart = state.cart.filter((item) => item.id !== itemId);

      if (state.userId) {
        localStorage.setItem(`cart_${state.userId}`, JSON.stringify(newCart));
      } else {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newCart));
      }

      return { cart: newCart };
    });
  },

  updateQuantity: (itemId: string, quantity: number) => {
    set((state) => {
      const newCart = state.cart.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      );

      if (state.userId) {
        localStorage.setItem(`cart_${state.userId}`, JSON.stringify(newCart));
      } else {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newCart));
      }

      return { cart: newCart };
    });
  },

  clearCart: () => {
    set((state) => {
      if (state.userId) {
        localStorage.removeItem(`cart_${state.userId}`);
      } else {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
      return { cart: [] };
    });
  },

  syncWithUser: () => {
    const user = useUserSession.getState().user;
    if (user) {
      const guestCart = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_KEY) || '[]'
      );
      const userCart = JSON.parse(
        localStorage.getItem(`cart_${user.id}`) || '[]'
      );

      // Warenkörbe zusammenführen
      const mergedCart = [...guestCart, ...userCart].reduce((acc, item) => {
        const existing = acc.find(
          (product: ProductType) => product.id === item.id
        );
        if (existing) {
          existing.quantity += item.quantity;
        } else {
          acc.push(item);
        }
        return acc;
      }, [] as ProductType[]);

      localStorage.setItem(`cart_${user.id}`, JSON.stringify(mergedCart));
      localStorage.removeItem(LOCAL_STORAGE_KEY);

      set({ userId: user.id, cart: mergedCart });
    } else {
      // Kein User -> Warenkorb zurücksetzen
      set({
        userId: null,
        cart: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]'),
      });
    }
  },
}));

// Subscription: Auf Änderungen im User-Store hören
useUserSession.subscribe(() => {
  useCartStore.getState().syncWithUser();
});

export default useCartStore;
