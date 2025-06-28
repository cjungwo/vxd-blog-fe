import { findUserById } from "@entities/user";
import { JwtPayload } from "jsonwebtoken";

export const checkAccessToken = async (accessToken: JwtPayload) => {
  const { sub } = accessToken;

  const user = await findUserById(sub!);

  if (!user) {
    throw new Error("User not found", { cause: 404 });
  }
}
