import { updateUserApiCall } from '@/api/LoginApi';
import { useUserSession } from '@/store/useUserSessionStore';
import { UserType, UpdateUserType } from '@/types/User';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios'; // Typ für Axios-Fehler

interface ErrorResponse {
  message: string;
}

export const useUpdateUser = () => {
  const { setUser, user } = useUserSession();

  return useMutation({
    mutationFn: async (newUser: UpdateUserType) => {
      if (!user) {
        throw new Error('User not logged in');
      }
      const response = await updateUserApiCall(newUser);
      return response as UserType;
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.log(
        'Update failed:',
        error.response?.data?.message || error.message
      );
    },
    onSuccess: (data: UserType) => {
      setUser(data);
      console.log('Update successful:', data);
    },
  });
};
