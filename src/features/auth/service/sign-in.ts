import bcrypt from "bcryptjs";

import { users } from "@/entities";
import { ResponseDto } from "@/shared";
import { generateToken } from "../generator/token.generator";

export const signIn = async (email: string, password: string) => {
  console.log(users);

  // Authentication
  const user = users.find((user) => user.email === email);

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
