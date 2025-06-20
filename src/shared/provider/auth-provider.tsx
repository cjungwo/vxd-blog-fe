'use client';

import { 
  ReactNode, 
  createContext, 
  useEffect, 
  useState, 
  useCallback 
} from 'react';

type AuthContextType = {
  accessToken: string | null;
  refreshToken: string | null;
  setAuthTokens: (tokens: { accessToken: string | null; refreshToken: string | null }) => void;
  clearAuth: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<{
    accessToken: string | null;
    refreshToken: string | null;
  }>({
    accessToken: null,
    refreshToken: null,
  });

  // Load tokens from localStorage on mount
  useEffect(() => {
    const loadTokens = () => {
      setAuthState({
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken'),
      });
    };

    // Handle case when running on server-side
    if (typeof window !== 'undefined') {
      loadTokens();
    }
  }, []);

  const setAuthTokens = useCallback(({ accessToken, refreshToken }: { 
    accessToken: string | null; 
    refreshToken: string | null 
  }) => {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    } else {
      localStorage.removeItem('accessToken');
    }

    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    } else {
      localStorage.removeItem('refreshToken');
    }

    setAuthState({ accessToken, refreshToken });
  }, []);

  const clearAuth = useCallback(() => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setAuthState({ accessToken: null, refreshToken: null });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        accessToken: authState.accessToken,
        refreshToken: authState.refreshToken,
        setAuthTokens,
        clearAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
