import { login } from '@/api/LoginApi';
import { useUserSession } from '@/store/UserSessionStore';
import { UserType } from '@/types/User';
import { useMutation } from '@tanstack/react-query';

export const useLogin = () => {
  const { setUser } = useUserSession();
  return useMutation({
    mutationFn: login,
    onError: console.log,
    onSuccess: (data: UserType) => setUser(data),
  });
};
