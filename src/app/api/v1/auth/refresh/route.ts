import { validateBearerToken, refreshAccessToken } from "@entities/auth";
import { ResponseDto } from "@/shared";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const bearerToken = req.headers.get('Authorization');

    if (!bearerToken) throw new Error("Unauthorized token format", { cause: 401 });

    const authToken = validateBearerToken(bearerToken);

    const result = await refreshAccessToken(authToken);

    const responseDto: ResponseDto = {
      status: 201,
      data: {
        accessToken: result,
      }
    };

    return Response.json(responseDto);
  } catch (error) {
    return Response.json(new ResponseDto((error as Error).cause as number, {
      message: (error as Error).message
    }));
  }
}
