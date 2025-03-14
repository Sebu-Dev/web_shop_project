import { login } from '@/api/LoginApi';
import { USE_DUMMY_MODE } from '@/config/config';
import { dummyUser } from '@/data/UserDummyData';
import useCartStore from '@/store/ShoppingCartStore';
import { useUserSession } from '@/store/UserSessionStore';
import { LoginResponse } from '@/types/User';
import { useMutation } from '@tanstack/react-query';

export const useLogin = () => {
  const { setUser, setTokens } = useUserSession();
  const { syncWithUser } = useCartStore();

  return useMutation({
    mutationFn: USE_DUMMY_MODE
      ? async (credentials: { username: string; password: string }) => {
          // Dummy-Modus
          console.log('Simulating login with:', credentials);
          const response: LoginResponse = {
            user: dummyUser,
            accessToken: 'dummy-access-token',
            refreshToken: 'dummy-refresh-token',
          };
          return response;
        }
      : login, // Backend-Modus: Nutze die echte API, die { username, password } erwartet

    onError: (error) => console.log('Login failed:', error),
    onSuccess: (data: LoginResponse) => {
      setUser(data.user);
      setTokens(data.accessToken, data.refreshToken);
      syncWithUser();
      console.log('Login successful:', data.user);
    },
  });
};
