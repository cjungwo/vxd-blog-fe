import bcrypt from "bcryptjs";

import { ResponseDto } from "@/shared";
import { generateToken } from "../generator/token.generator";
import { prisma } from "@/shared";
import { User } from "@/entities";

export const signIn = async (email: string, password: string) => {

  // Authentication
  const user: User | null = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return {
      status: 401,
      data: {
        message: "User not found",
      }
    } as ResponseDto;
  }

  const isPass = await bcrypt.compare(password, user.hash);

  if (!isPass) {
    return {
      status: 401,
      data: {
        message: "Invalid password",
      }
    } as ResponseDto;
  }

  // Return
  return {
    status: 200,
    data: {
      accessToken: generateToken(user, false),
      refreshToken: generateToken(user, true),
    }
  };
}
