// src/lib/authUtils.ts
import { useAuthStore } from '@/shared/store/use-auth-store';
import { baseUrl } from '@/shared';

export const clearAuth = () => {
  useAuthStore.persist.clearStorage();
  useAuthStore.setState((state) => ({
    ...state,
    ...{
      user: null,
      accessToken: '',
      refreshToken: '',
      loading: false,
    },
  }));
};

export const checkAuth = async () => {
  const { accessToken, dispatch, isReady } = useAuthStore.getState();

  try {
    if (!isReady) return;

    if (!accessToken) {
      clearAuth();
      return;
    };

    const user = await fetch(`${baseUrl}/api/v1/auth/check`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    }).then(res => {
      if (!res.ok) {
        clearAuth();
        throw new Error('Failed to check auth');
      }
      return res.json();
    }).then(json => {
      if (json.status !== 200) {
        clearAuth();
        throw new Error(json.data.message);
      }
      return json.data.user;
    });

    if (!user) {
      clearAuth();
      return;
    }

    dispatch({ type: 'saveAuth', user });

    return user;
  } catch (e) {
    console.error('Error checking auth:', e);
    clearAuth();

    return null;
  }
};

export const refreshAccessToken = async () => {
  const { refreshToken, dispatch } = useAuthStore.getState();

  try {
    const newAccessToken = await fetch(`${baseUrl}/api/v1/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${refreshToken}`,
      },
    }).then(res => {
      if (!res.ok) {
        clearAuth();
        throw new Error('Failed to refresh token');
      }
      return res.json();
    }).then(json => {
      if (json.status !== 200) {
        clearAuth();
        throw new Error(json.data.message);
      }
      return json.data.accessToken;
    });

    dispatch({ type: 'refreshAccessToken', accessToken: newAccessToken });

    return newAccessToken;
  } catch (e) {
    console.error('Error refreshing access token:', e);
    clearAuth();
    return null;
  }
};
