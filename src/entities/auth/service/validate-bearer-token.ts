export const validateBearerToken = (rawToken: string): string => {
  const bearerSplit = rawToken.split(' ');

  if (bearerSplit.length !== 2) throw new Error("Invalid token", { cause: 401 });

  const [bearer, token] = bearerSplit;

  if (bearer.toLowerCase() !== 'bearer') throw new Error("Invalid token", { cause: 401 });

  return token;
}
