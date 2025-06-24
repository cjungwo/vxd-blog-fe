import { authGuard, basicTokenPipe, generateToken } from "@entities/auth";
import { ResponseDto } from "@shared/model";
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { findUserByEmail } from "@/entities/user";

export const signIn = async (req: NextRequest): Promise<Response> => {
  const token = authGuard(req);

  if (token instanceof ResponseDto) return Response.json(token, { status: token.status });

  const authToken = basicTokenPipe(token);

  if (authToken instanceof ResponseDto) return Response.json(authToken, { status: authToken.status });

  const { email, password } = authToken;

  return Response.json(await result(email, password));
}

const result = async (email: string, password: string): Promise<ResponseDto> => {
  // Authentication
  const user = await findUserByEmail(email);

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
  } as ResponseDto;
};
