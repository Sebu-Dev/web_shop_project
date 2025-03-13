import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { User } from '@/types/User';

type SessionState = {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  setUser: (user: User) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
};

export const useUserSession = create<SessionState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      setUser: (user: User) => set(() => ({ user })),
      setTokens: (accessToken: string, refreshToken: string) =>
        set(() => ({ accessToken, refreshToken })),
      logout: () =>
        set(() => ({ user: null, accessToken: null, refreshToken: null })),
    }),
    {
      name: 'user-session', // Key für localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);
