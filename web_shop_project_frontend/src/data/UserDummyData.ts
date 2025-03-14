import { UserType } from '@/types/User';

export const dummyUser: UserType = {
  id: 12345,
  adress: 'testadress',
  username: 'Test User',
  email: 'testuser@example.com', // Wird später in `username` umgewandelt, falls nötig
};
