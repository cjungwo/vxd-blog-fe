import { ResponseDto } from "@/shared";
import { AuthDto, validateBasicToken, signIn, extractToken } from "@entities/auth";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // 1. extract basic token
    const authToken = extractToken(req, validateBasicToken);

    // 2. sign in
    const result = await signIn(authToken as AuthDto);

    return Response.json(new ResponseDto(200, {
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    }));
  } catch (error) {
    return Response.json(new ResponseDto((error as Error).cause as number, {
      message: (error as Error).message
    }));
  }
}
