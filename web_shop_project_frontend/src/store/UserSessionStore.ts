import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { UpdateUserType, UserType } from '@/types/User';

type SessionState = {
  user: UserType | null;
  accessToken: string | null;
  refreshToken: string | null;
  setUser: (user: UserType) => void;
  updateUser: (update: Partial<UserType>) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
};

export const useUserSession = create<SessionState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,

      // Setzt den User beim Login vollständig
      setUser: (user: UserType) => set(() => ({ user })),

      // Aktualisiert nur bestimmte Eigenschaften, wenn user bereits existiert
      updateUser: (update: Partial<UpdateUserType>) =>
        set((state) => {
          return {
            user: state.user ? { ...state.user, ...update } : state.user,
          };
        }),

      setTokens: (accessToken: string, refreshToken: string) =>
        set(() => ({ accessToken: accessToken, refreshToken: refreshToken })),

      logout: () =>
        set(() => ({ user: null, accessToken: null, refreshToken: null })),
    }),
    {
      name: 'user-session',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
