import { createOrder } from '@/api/OrderApi';
import { useMutation } from '@tanstack/react-query';

export const usePostOrder = () => {
  return useMutation({
    mutationFn: createOrder,
    onError: (error) => console.log('Registration failed:', error),
    onSuccess: () => {
      console.log('Order successful:');
    },
  });
};
