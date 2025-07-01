export const userGuard = (authorId: string, sub: string): boolean => {
  if (authorId !== sub) {
    return false;
  }

  return true;
}
