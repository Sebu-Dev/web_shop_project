import { create } from 'zustand';

type LoginPopupState = {
  isPopupOpen: boolean;
  isLogin: boolean;
  showLogin: () => void;
  showRegister: () => void;
  closePopup: () => void;
  switchToRegister: () => void;
  switchToLogin: () => void;
};

export const useLoginPopup = create<LoginPopupState>((set) => ({
  isPopupOpen: false, // State to track if popup is open
  isLogin: true, // State to track login vs register form

  showLogin: () => set({ isPopupOpen: true, isLogin: true }),
  showRegister: () => set({ isPopupOpen: true, isLogin: false }),
  closePopup: () => set({ isPopupOpen: false }),
  switchToRegister: () => set({ isLogin: false }),
  switchToLogin: () => set({ isLogin: true }),
}));
