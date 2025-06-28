export const authGuard = (req: Request): string => {
  const token = req.headers.get('Authorization');

  if (!token) {
    throw new Error("Unauthorized token format", { cause: 401 });
  }

  return token;
}
