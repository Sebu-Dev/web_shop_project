import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api/ProductApi';
import { useProductStore } from '../store/useProductStore';
import { ProductType } from '../types/ProductType';
import { dummyProducts } from '@/data/ProductDummyData';

export const useGetProducts = () => {
  const { setProducts } = useProductStore();

  const query = useQuery<ProductType[], Error>({
    queryKey: ['products'], // Wichtiger Query-Schlüssel
    queryFn: async () => {
      try {
        const products = await getProducts();
        setProducts(products);
        console.log('Product loading successful:', products);
        return products;
      } catch (error) {
        console.error('Fetching products failed:', error);
        throw error;
      }
    },
    initialData: dummyProducts,
    initialDataUpdatedAt: 0,
  });

  return query;
};
