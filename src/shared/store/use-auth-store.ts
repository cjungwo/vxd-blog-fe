import { create } from 'zustand';
import { User } from '@/generated/prisma';
import { persist } from 'zustand/middleware';

type State = {
  isReady: boolean;
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
}

type AuthActions = {
  setReady: () => void;
  checkAuth: () => void
  clearAuth: () => void
  updateAccessToken: (accessToken: State['accessToken']) => void
}

type AuthAction = {
  type: keyof AuthActions
  accessToken?: State['accessToken']
}

const authReducer = (state: State, action: AuthAction) => {
  switch (action.type) {
    case 'setReady':
      return { isReady: true };
    case 'checkAuth':
      return { loading: true };
    case 'clearAuth':
      return { accessToken: null, refreshToken: null };
    case 'updateAccessToken':
      return { accessToken: action.accessToken };
    default:
      return state;
  }
}

type StoreState = State & {
  dispatch: (action: AuthAction) => void;
};

export const useAuthStore = create<StoreState>()(
  persist(
    (set) => ({
      isReady: false,
      user: null,
      accessToken: null,
      refreshToken: null,
      loading: true,
      dispatch: (action: AuthAction) => set((state) => authReducer(state, action)),
    }),
    {
      name: 'auth',
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isReady = true;
        }
      },
    }
  )
);
