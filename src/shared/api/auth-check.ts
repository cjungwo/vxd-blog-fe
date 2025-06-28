import { authRefresh } from "../api/auth-refresh";

export const authCheck = async (accessToken: string, refreshToken: string) => {
  return fetch(`${process.env.NEXT_PUBLIC_WEB_BASE_URL}/api/v1/auth/check`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  })
  .then(res => {
    if (!res.ok) {
      throw new Error('Failed to check auth');
    }
    
    return res.json()
  })
  .then(json => {
    if (json.status === 401 && json.data.message === 'Expired token') {
      return authRefresh(refreshToken)
    } else {
      return { accessToken: json.data.accessToken as string, refreshToken: null }
    }
  }).catch(error => {
    console.error('ERROR: ', error);
  });
};
