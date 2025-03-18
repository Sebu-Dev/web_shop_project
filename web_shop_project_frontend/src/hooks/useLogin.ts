import { login } from '@/api/LoginApi';
import { USE_DUMMY_MODE } from '@/config/config';
import useCartStore from '@/store/ShoppingCartStore';
import { useUserSession } from '@/store/UserSessionStore';
import { LoginResponse } from '@/types/User';
import { useMutation } from '@tanstack/react-query';

const dummyUser = {
  id: 12345,
  adress: 'testadress',
  username: 'Test User',
  email: 'testuser@example.com',
};

export const useLogin = () => {
  const { setUser, setTokens } = useUserSession();
  const { syncWithUser } = useCartStore();

  return useMutation({
    mutationFn: USE_DUMMY_MODE
      ? async (credentials: { username: string; password: string }) => {
          console.log('Simulating login with:', credentials);
          const response: LoginResponse = {
            user: {
              ...dummyUser,
              username: credentials.username,
            },
            accessToken: 'dummy-access-token-' + Date.now(),
            refreshToken: 'dummy-refresh-token-' + Date.now(),
          };
          return response;
        }
      : login, // Echter API-Call bleibt erhalten

    onError: (error) => console.log('Login failed:', error),
    onSuccess: (data: LoginResponse) => {
      setUser(data.user);
      setTokens(data.accessToken, data.refreshToken);
      syncWithUser();
      console.log('Login successful:', data.user);
    },
  });
};
