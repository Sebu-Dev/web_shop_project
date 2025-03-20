import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api/ProductApi';
import { useProductStore } from '../store/useProductStore';
import { ProductType } from '../types/ProductType';
import { dummyProducts } from '@/data/ProductDummyData';

export const useGetProducts = () => {
  const { setProducts } = useProductStore();

  return useQuery<ProductType[], Error>({
    queryKey: ['products'],
    queryFn: async () => {
      try {
        // Künstliche Verzögerung von 1 Sekunden zum Testen des Ladezustands
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const products = await getProducts();
        setProducts(products);
        console.log('Product loading successful:', products);
        return products;
      } catch (error) {
        console.error('Fetching products failed:', error);
        // Dummy-Daten nur im Fehlerfall zurückgeben
        return dummyProducts;
      }
    },
  });
};
