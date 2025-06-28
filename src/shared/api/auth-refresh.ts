export const authRefresh = async (refreshToken: string) => {
  return fetch(`${process.env.NEXT_PUBLIC_WEB_BASE_URL}/api/v1/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${refreshToken}`,
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

    return { accessToken: json.data.accessToken as string, refreshToken: null }
  })
};