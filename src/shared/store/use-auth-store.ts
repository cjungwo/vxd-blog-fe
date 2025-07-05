// src/stores/useAuthStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/generated/prisma';

type State = {
  isReady: boolean;
  user: User | null;
  accessToken: string;
  refreshToken: string;
  loading: boolean;
};

type AuthAction =
  | { type: 'setReady' }
  | { type: 'clearAuth' }
  | { type: 'saveAuth'; user: User; accessToken?: string; refreshToken?: string }
  | { type: 'refreshAccessToken'; accessToken: string };

const initialState: State = {
  isReady: false,
  user: null,
  accessToken: '',
  refreshToken: '',
  loading: true,
};

const authReducer = (state: State, action: AuthAction): State => {
  switch (action.type) {
    case 'setReady':
      return { ...state, isReady: true };
    case 'clearAuth':
      return { ...initialState, isReady: true, loading: false };
    case 'saveAuth':
      return {
        ...state,
        user: action.user,
        accessToken: action.accessToken || state.accessToken,
        refreshToken: action.refreshToken || state.refreshToken,
        loading: false,
      };
    case 'refreshAccessToken':
      return {
        ...state,
        accessToken: action.accessToken,
      };
    default:
      return state;
  }
};

type StoreState = State & {
  dispatch: (action: AuthAction) => void;
};

export const useAuthStore = create<StoreState>()(
  persist(
    (set) => ({
      ...initialState,
      dispatch: (action: AuthAction) =>
        set((state) => authReducer(state, action)),
    }),
    {
      name: 'auth',
      onRehydrateStorage: () => (state) => {
        state?.dispatch({ type: 'setReady' });
      },
    }
  )
);
