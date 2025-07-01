import { authGuard, deleteAccount, validateBearerToken, verifyToken } from "@/entities";
import { ResponseDto } from "@/shared";
import { NextRequest } from "next/server";

export async function DELETE(request: NextRequest) {
  try {
    const accessToken = authGuard(request);

    const validatedToken = validateBearerToken(accessToken);

    const verifiedToken = verifyToken(validatedToken);

    const { sub } = verifiedToken as { sub: string };

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
