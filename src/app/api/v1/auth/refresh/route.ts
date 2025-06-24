import { User } from "@entities/user";
import { authenticate, authGuard, bearerTokenPipe, generateToken, tokenVerifyPipe } from "@entities/auth";
import { ResponseDto } from "@shared/model";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const token = authGuard(req);

  if (token instanceof ResponseDto) return Response.json(token);

  const authToken = bearerTokenPipe(token);

  if (authToken instanceof ResponseDto) return Response.json(authToken);

  const refreshToken = tokenVerifyPipe(authToken, true);

  if (refreshToken instanceof ResponseDto) return Response.json(refreshToken);

  const { sub } = refreshToken as { sub: string };

  const user = await authenticate(sub);

  if (user instanceof ResponseDto) return Response.json(user);

  const result = generateToken(user as User, true);

  return Response.json(result);
}