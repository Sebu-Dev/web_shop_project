import { updateUserApiCall } from '@/api/LoginApi';
import { useUserSession } from '@/store/useUserSessionStore';
import { UserType, UpdateUserType } from '@/types/User';
import { useMutation } from '@tanstack/react-query';

export const useUpdateUser = () => {
  const { setUser, user } = useUserSession();

  return useMutation({
    mutationFn: async (newUser: UpdateUserType) => {
      if (user === null) {
        throw 'user not logged in';
      }
      const response = await updateUserApiCall(newUser);
      return response;
    },
    onError: (error) => console.log('update failed:', error),
    onSuccess: (data: UserType) => {
      setUser(data);
      console.log('update successful:', data);
    },
  });
};
