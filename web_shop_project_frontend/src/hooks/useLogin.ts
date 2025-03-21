import { login } from '@/api/LoginApi';
import useCartStore from '@/store/useShoppingCartStore';
import { useUserSession } from '@/store/useUserSessionStore';
import { UserType } from '@/types/User';
import { useMutation } from '@tanstack/react-query';

export const useLogin = () => {
  const { setUser } = useUserSession();
  const { syncWithUser } = useCartStore();

  return useMutation({
    mutationFn: login,
    onMutate: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
    },
    onError: (error) => {
      console.log('Login failed:', error);
    },
    onSuccess: (response: UserType) => {
      setUser(response);
      syncWithUser();
    },
  });
};
