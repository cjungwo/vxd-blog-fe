import { ResponseDto } from "@/shared";
import { AuthDto, validateBasicToken, signIn, extractToken } from "@entities/auth";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // 1. extract basic token
    const authToken = extractToken(req, validateBasicToken);

    // 2. sign in
    const result = await signIn(authToken as AuthDto);

    const responseDto: ResponseDto = {
      status: 200,
      data: {
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      }
    };

    return Response.json(responseDto);
  } catch (error) {
    return Response.json(new ResponseDto((error as Error).cause as number, {
      message: (error as Error).message
    }));
  }
}
