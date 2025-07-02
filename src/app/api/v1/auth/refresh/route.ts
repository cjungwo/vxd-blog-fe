import { validateBearerToken, refreshAccessToken } from "@entities/auth";
import { ResponseDto } from "@/shared";
import { extractToken } from "@entities/auth";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // 1. extract bearer token
    const authToken = extractToken(req, validateBearerToken);
    // --end--

    // 2. refresh access token
    const accessToken = await refreshAccessToken(authToken as string);

    return Response.json(new ResponseDto(200, {
      accessToken,
    }));
  } catch (error) {
    return Response.json(new ResponseDto((error as Error).cause as number, {
      message: (error as Error).message
    }));
  }
}
