import { register } from '@/api/LoginApi';
import { USE_DUMMY_MODE } from '@/config/config';
import useCartStore from '@/store/ShoppingCartStore';
import { useUserSession } from '@/store/UserSessionStore';
import { UserType, RegisterUserInput } from '@/types/User';
import { useMutation } from '@tanstack/react-query';

export const useRegister = () => {
  const { setUser, setTokens } = useUserSession();
  const { syncWithUser } = useCartStore();

  return useMutation({
    mutationFn: USE_DUMMY_MODE
      ? async (userData: RegisterUserInput) => {
          console.log('Simulating registration with:', userData);
          const response: UserType = {
            user: {
              id: Math.floor(Math.random() * 10000) + 1,
              username: userData.username,
              email: userData.email,
              address: userData.address,
            },
            accessToken: 'dummy-access-token-' + Date.now(),
            refreshToken: 'dummy-refresh-token-' + Date.now(),
          };
          return response;
        }
      : register, // Echter API-Call bleibt erhalten

    onError: (error) => console.log('Registration failed:', error),
    onSuccess: (data: UserType) => {
      setUser(data.user);
      setTokens(data.accessToken, data.refreshToken);
      syncWithUser();
      console.log('Registration successful:', data.user);
    },
  });
};
