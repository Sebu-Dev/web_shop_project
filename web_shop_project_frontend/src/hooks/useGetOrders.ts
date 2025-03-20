import { getOrders } from '@/api/OrderApi';
import { orderDummyData } from '@/data/OrderDummyData';
import { Order } from '@/types/OrderType';
import { useQuery } from '@tanstack/react-query';

type OrderError = {
  message: string;
};
export const useGetOrders = () => {
  return useQuery<Order[], OrderError>({
    queryKey: ['orders'],
    queryFn: async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const orders = await getOrders();
        console.log('Orders loading successful:', orders);
        return orders;
      } catch (error) {
        console.error('Fetching orders failed:', error);
        return orderDummyData;
      }
    },

    retry: 2, // Versuche es 2 Mal bei Fehlschlag
    staleTime: 1 * 60 * 1000, // Daten gelten 1 Minuten als frisch
  });
};
