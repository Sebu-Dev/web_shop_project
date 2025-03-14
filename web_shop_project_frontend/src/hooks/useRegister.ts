import { register } from '@/api/LoginApi';
import { useUserSession } from '@/store/UserSessionStore';
import { UserType } from '@/types/User';
import { useMutation } from '@tanstack/react-query';

export const useRegister = () => {
  const { setUser } = useUserSession();
  return useMutation({
    mutationFn: register,
    onError: console.log,
    onSuccess: (data: UserType) => setUser(data),
  });
};
