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
      await new Promise((resolve) => setTimeout(resolve, 1000));
    },
    onError: (error) => {
      console.log('Login failed:', error);
    },
    onSuccess: (response) => {
      if (response && 'id' in response && 'username' in response) {
        const user = response as UserType;
        setUser(user);
        syncWithUser();
      } else {
        throw new Error('Ungültige Anmeldedaten oder Serverfehler');
      }
    },
  });
};
