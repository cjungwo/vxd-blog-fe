export const bearerTokenPipe = (rawToken: string) => {
  const bearerSplit = rawToken.split(' ');

  if (bearerSplit.length !== 2) return {
    status: 401,
    data: {
      message: "Unauthorized token"
    }
  };

  const [bearer, token] = bearerSplit;

  if (bearer.toLowerCase() !== 'bearer') return {
    status: 401,
    data: {
      message: "Unauthorized token"
    }
  };

  return token;
}
