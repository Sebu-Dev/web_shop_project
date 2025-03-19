import { login } from '@/api/LoginApi';
import { USE_DUMMY_MODE } from '@/config/config';
import useCartStore from '@/store/ShoppingCartStore';
import { useUserSession } from '@/store/UserSessionStore';
import { UserType } from '@/types/User';
import { useMutation } from '@tanstack/react-query';

const dummyUser = {
  id: 12345,
  adress: 'testadress',
  username: 'Test User',
  email: 'testuser@example.com',
};

export const useLogin = () => {
  const { setUser } = useUserSession();
  const { syncWithUser } = useCartStore();

  return useMutation({
    mutationFn: USE_DUMMY_MODE
      ? async (credentials: { username: string; password: string }) => {
          console.log('Simulating login with:', credentials);
          const response: UserType = {
            user: {
              ...dummyUser,
              username: credentials.username,
              address: '',
            },
          };
          return response;
        }
      : login, // Echter API-Call bleibt erhalten

    onError: (error) => console.log('Login failed:', error),
    onSuccess: (data: UserType) => {
      setUser(data.user);
      syncWithUser();
      console.log('Login successful:', data.user);
    },
  });
};
