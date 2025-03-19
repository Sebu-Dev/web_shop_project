import { register } from '@/api/LoginApi';
import useCartStore from '@/store/ShoppingCartStore';
import { useUserSession } from '@/store/UserSessionStore';
import { UserType } from '@/types/User';
import { useMutation } from '@tanstack/react-query';

export const useRegister = () => {
  const { setUser } = useUserSession();
  const { syncWithUser } = useCartStore();

  return useMutation({
    mutationFn: register,

    onError: (error) => console.log('Registration failed:', error),
    onSuccess: (user: UserType) => {
      setUser(user);
      syncWithUser();
      console.log('Registration successful:', user);
    },
  });
};
