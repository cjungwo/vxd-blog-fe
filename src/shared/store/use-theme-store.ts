import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type State = {
  isReady: boolean;
  isDarkMode: boolean;
}

type Action = {
  setReady: () => void;
  toggleDarkMode: () => void;
}

export const useThemeStore = create(persist<State & Action>(
  (set) => ({
    isReady: false,
    isDarkMode: false,
    toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
    setReady: () => set({ isReady: true }),
  }),
  {
    name: 'isDarkMode',
    onRehydrateStorage: () => (state) => {
      state?.setReady();
    },
  },
));
