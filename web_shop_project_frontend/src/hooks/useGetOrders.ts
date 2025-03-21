// useGetOrders Hook
import { useQuery } from '@tanstack/react-query';
import { getOrders } from '@/api/OrderApi';
import { orderDummyData } from '@/data/OrderDummyData';
import { Order } from '@/types/OrderType';
import { OrderError } from '@/types/Erorrs';

export const useGetOrders = (userId: string) => {
  return useQuery<Order[], OrderError>({
    queryKey: ['orders', userId],
    queryFn: async () => {
      try {
        // Optional: Simuliere Ladezeit
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const orders = await getOrders(userId);
        console.log('Orders loading successful:', orders);
        return orders; // Erwartet Order[] mit OrderItem[]
      } catch (error) {
        console.error('Fetching orders failed:', error);
        // Dummy-Daten sollten ebenfalls an den neuen Order-Typ angepasst sein
        return orderDummyData.map((dummy) => ({
          ...dummy,
          items: dummy.items.map((item) => ({
            id: item.id || 0, // Sicherstellen, dass id vorhanden ist
            productId: item.id, // Annahme: Produkt-ID entspricht item.id
            quantity: item.quantity || 1, // Default-Wert, da nicht optional
            price: item.price,
            name: item.name,
            description: item.description,
            image: item.image,
          })),
        }));
      }
    },
    retry: 2, // Versuche es 2 Mal bei Fehlschlag
    staleTime: 1 * 60 * 1000, // Daten gelten 1 Minute als frisch
    enabled: !!userId, // Nur ausführen, wenn userId vorhanden ist
  });
};
