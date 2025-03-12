import { Product } from '@/types/ProcudtType';
import { create } from 'zustand';

interface CartState {
  cart: Product[];
  addToCart: (item: Product) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

const useCartStore = create<CartState>((set) => ({
  cart: [],
  addToCart: (item: Product) =>
    set((state) => ({
      cart: [...state.cart, { ...item, quantity: 1 }],
    })),
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
