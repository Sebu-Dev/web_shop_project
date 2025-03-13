import { Product } from '@/types/ProcudtType';
import { create } from 'zustand';

interface CartState {
  cart: Product[];
  addToCart: (item: Product) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

const useCartStore = create<CartState>((set, get) => ({
  cart: [],
  addToCart: (item: Product) => {
    const currentState = get();
    const quantity = item.quantity ?? 1;

    // Prüfen, ob das Produkt bereits im Warenkorb ist
    if (currentState.cart.some((i) => i.id === item.id)) {
      // Falls ja, die Menge des Produkts erhöhen
      set((state) => ({
        cart: state.cart.map((i) =>
          i.id === item.id
            ? { ...i, quantity: (i.quantity || 0) + quantity }
            : i
        ),
      }));
    } else {
      // Falls nein, das Produkt mit der angegebenen Menge (oder 1) hinzufügen
      set((state) => ({
        cart: [...state.cart, { ...item, quantity }],
      }));
    }
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
