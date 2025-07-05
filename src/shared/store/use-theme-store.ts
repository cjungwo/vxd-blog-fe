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
  (set, get) => ({
    isReady: false,
    isDarkMode: false,
    toggleDarkMode: () => set(() => ({ isDarkMode: !get().isDarkMode })),
    setReady: () => set({ isReady: true }),
  }),
  {
    name: 'isDarkMode',
    onRehydrateStorage: () => (state) => {
      state?.setReady();
    },
  },
));
