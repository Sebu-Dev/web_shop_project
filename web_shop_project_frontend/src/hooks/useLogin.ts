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
    onError: (error) => console.log('Login failed:', error),
    onSuccess: (user: UserType) => {
      setUser(user);
      syncWithUser();
      console.log('Login successful:', user);
    },
  });
};
