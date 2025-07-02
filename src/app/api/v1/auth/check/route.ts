import { checkAccessToken, validateBearerToken, verifyToken } from "@entities/auth";
import { ResponseDto } from "@/shared";
import { JwtPayload } from "jsonwebtoken";
import { extractToken } from "@entities/auth";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const authToken = extractToken(request, validateBearerToken);

    const accessToken = verifyToken(authToken as string);

    const user = await checkAccessToken(accessToken as JwtPayload);

    return Response.json(new ResponseDto(200, {
      user,
    }));
  } catch (error) {
    return Response.json(new ResponseDto((error as Error).cause as number, {
      message: (error as Error).message
    }));
  }
}
