'use client';

import { User } from '@/entities';
import { 
  ReactNode, 
  createContext, 
  useEffect, 
  useState, 
  useCallback, 
  useMemo
} from 'react';

type AuthContextType = {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  loading: boolean;
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
  
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const accessToken = useMemo(() => {
    return authState.accessToken;
  }, [authState.accessToken]);

  const refreshToken = useMemo(() => {
    return authState.refreshToken;
  }, [authState.refreshToken]);

  const setAuthTokens = useCallback(({ accessToken, refreshToken }: { 
    accessToken: string | null; 
    refreshToken: string | null 
  }) => {
    try {
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
    } catch (error) {
      console.error('Failed to set auth tokens:', error);
    }
  }, []);

  const clearAuth = useCallback(() => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setAuthState({ accessToken: null, refreshToken: null });
  }, []);


  useEffect(() => {
    const loadTokens = () => {
      setAuthState({
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken'),
      });
    };

    loadTokens();
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      if (!authState.accessToken) {
        setUser(null)
        setLoading(false)
        return
      }
      
      fetch(`${process.env.NEXT_PUBLIC_WEB_BASE_URL}/api/v1/auth/check`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authState.accessToken}`,
        },
      }).then(res => {
        if (!res.ok) {
          throw new Error('Failed to check auth');
        }
        return res.json()
      }).then(json => {
        if (json.status === 401 && json.data.message === 'Expired token') {
          fetch(`${process.env.NEXT_PUBLIC_WEB_BASE_URL}/api/v1/auth/refresh`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authState.refreshToken}`,
            },
          }).then(res => {
            if (!res.ok) {
              throw new Error('Failed to refresh token');
            }
            return res.json()
          }).then(json => {
            if (json.status !== 200) {
              throw new Error(json.data.message);
            }

            setAuthTokens({ accessToken: json.data.accessToken, refreshToken: null })
            setUser(json.data.user)
            setLoading(false)
          })
        }

        setUser(json.data.user)
        setLoading(false)
      }).catch(error => {
        console.error('ERROR: ', error);
        setUser(null)
        setLoading(false)
        clearAuth()
      });
    };

    if (typeof window !== 'undefined') {
      checkAuth();
    }
  }, [authState, clearAuth, setAuthTokens]);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        user,
        loading,
        setAuthTokens,
        clearAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
