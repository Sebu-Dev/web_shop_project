// @/hooks/usePostOrder.ts
import { useMutation } from '@tanstack/react-query';
import { createOrder } from '@/api/OrderApi';
import { OrderRequest, Order } from '@/types/OrderType';

export const usePostOrder = () => {
  return useMutation<Order, Error, OrderRequest>({
    mutationFn: createOrder,
    onError: (error) => console.log('Order creation failed:', error),
    onSuccess: (data) => {
      console.log('Order created successfully:', data);
    },
  });
};
