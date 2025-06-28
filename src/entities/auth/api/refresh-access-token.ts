import { findUserById, User } from "@entities/user";
import { generateToken } from "../generator";
import { verifyToken } from "../utils";

export const refreshAccessToken = async (refreshToken: string) => {
  const verfiedToken = verifyToken(refreshToken, true);

  const { sub } = verfiedToken as { sub: string };

  const user: User = await findUserById(sub);

  const accessToken = generateToken(user, false);

  return accessToken;
}
