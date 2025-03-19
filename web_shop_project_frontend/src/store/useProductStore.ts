import { create } from 'zustand';
import { ProductType } from '@/types/ProductType';

type UseProductState = {
  products: ProductType[];
  setProducts: (products: ProductType[]) => void;
  addProducts: (products: ProductType[]) => void;
  removeProduct: (product: ProductType) => void;
};

export const useProductStore = create<UseProductState>((set) => ({
  products: [],

  setProducts: (items) => set({ products: items }),
  addProducts: (items) =>
    set((state) => {
      {
        const products = [...state.products, ...items];
        return { products };
      }
    }),
  removeProduct: (item) =>
    set((state) => {
      {
        const products = [...state.products.filter((i) => i !== item)];
        return { products };
      }
    }),
}));
