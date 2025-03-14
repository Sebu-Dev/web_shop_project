import { register } from '@/api/LoginApi';
import { USE_DUMMY_MODE } from '@/config/config';
import useCartStore from '@/store/ShoppingCartStore';
import { useUserSession } from '@/store/UserSessionStore';
import { LoginResponse, UserType } from '@/types/User';
import { useMutation } from '@tanstack/react-query';

const dummyUser: UserType = {
  id: 12345,
  adress: 'testadress',
  username: 'Test User',
  email: 'testuser@example.com',
};

export const useRegister = () => {
  const { setUser, setTokens } = useUserSession();
  const { syncWithUser } = useCartStore();

  return useMutation({
    mutationFn: USE_DUMMY_MODE
      ? async (userData: UserType) => {
          // Dummy-Modus: Verwende userData und fülle fehlende Felder mit dummyUser
          console.log('Simulating registration with:', userData);
          const response: LoginResponse = {
            user: {
              ...dummyUser,
              username: userData.username,
              email: userData.email || dummyUser.email,
              adress: userData.adress || dummyUser.adress,
              id: userData.id || dummyUser.id,
            },
            accessToken: 'dummy-access-token',
            refreshToken: 'dummy-refresh-token',
          };
          return response;
        }
      : register, // Backend-Modus: Erwartet UserType

    onError: (error) => console.log('Registration failed:', error),
    onSuccess: (data: LoginResponse) => {
      setUser(data.user);
      setTokens(data.accessToken, data.refreshToken);
      syncWithUser();
      console.log('Registration successful:', data.user);
    },
  });
};
