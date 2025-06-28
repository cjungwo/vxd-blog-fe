import { ResponseDto } from "@/shared";
import { AuthDto, validateBasicToken, signIn } from "@entities/auth";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const basicToken: string | null = req.headers.get('Authorization');

    if (!basicToken) {
      throw new Error("Unauthorized token format", { cause: 401 });
    }

    const dto: AuthDto = validateBasicToken(basicToken);

    const result = await signIn(dto);

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
