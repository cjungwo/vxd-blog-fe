import { generateToken, verifyToken } from "../service";
import { findUserById } from "@entities/user";

export const refreshAccessToken = async (refreshToken: string) => {
  const verfiedToken = verifyToken(refreshToken, true);

  const { sub } = verfiedToken as { sub: string };

  const user = await findUserById(sub);

  const accessToken = generateToken(user, false);

  return accessToken;
}
