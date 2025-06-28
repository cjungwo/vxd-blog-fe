import bcrypt from "bcryptjs";
import { findUserByEmail } from "@entities/user";
import { generateToken } from "../generator";
import { AuthDto } from "../model";

export const signIn = async (dto: AuthDto): Promise<{ accessToken: string, refreshToken: string }> => {
  const user = await findUserByEmail(dto.email);

  if (!user) {
    throw new Error("Invalid auth info", { cause: 401 });
  }

  const isPass = await bcrypt.compare(dto.password, user.hash);

  if (!isPass) {
    throw new Error("Invalid auth info", { cause: 401 });
  }

  // Return
  return {
    accessToken: generateToken(user, false),
    refreshToken: generateToken(user, true),
  };
};
