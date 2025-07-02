import { deleteAccount, validateBearerToken, verifyToken } from "@/entities";
import { ResponseDto } from "@/shared";
import { extractToken } from "@entities/auth";
import { NextRequest } from "next/server";

export async function DELETE(request: NextRequest) {
  try {
    const authToken = extractToken(request, validateBearerToken);

    const accessToken = verifyToken(authToken as string);

    const { sub } = accessToken as { sub: string };

    const userId = await deleteAccount(sub);

    return Response.json(new ResponseDto(200, {
      userId,
    }));
  } catch (error) {
    return Response.json(new ResponseDto((error as Error).cause as number, {
      message: (error as Error).message
    }));
  }
}
