import { checkAccessToken, validateBearerToken, verifyToken } from "@entities/auth";
import { ResponseDto } from "@/shared";
import { JwtPayload } from "jsonwebtoken";

export async function GET(request: Request) {
  try {
    const bearerToken = request.headers.get('Authorization');

    if (!bearerToken) {
      throw new Error("Unauthorized token format", { cause: 401 });
    }

    const authToken = validateBearerToken(bearerToken);

    const accessToken = verifyToken(authToken);

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
