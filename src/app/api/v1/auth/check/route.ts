import { findUserById } from "@entities/user";
import { authGuard, bearerTokenPipe, tokenVerifyPipe } from "@entities/auth";
import { ResponseDto } from "@shared/model";

export async function GET(request: Request) {
  const token = authGuard(request);

  if (token instanceof ResponseDto) return Response.json(token);

  const authToken = bearerTokenPipe(token);

  if (authToken instanceof ResponseDto) return Response.json(authToken);

  const accessToken = tokenVerifyPipe(authToken);

  if (accessToken instanceof ResponseDto) return Response.json(accessToken);

  const { sub } = accessToken as { sub: string };

  const user = await findUserById(sub);

  if (!user) {
    return Response.json({
      status: 401,
      data: {
        message: "User not authenticated",
      }
    });
  }

  return Response.json({
    status: 200,
    data: {
      user,
    }
  });
}
