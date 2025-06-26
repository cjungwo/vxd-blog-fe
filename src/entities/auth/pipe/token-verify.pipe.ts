import jwt from "jsonwebtoken";
import { ResponseDto } from "@/shared";

export const tokenVerifyPipe = (token: string, isRefreshToken: boolean = false) => {
  const secret = isRefreshToken ? process.env.REFRESH_TOKEN_SECRET : process.env.ACCESS_TOKEN_SECRET;

  const decodedToken = jwt.verify(token, secret!);

  if (!decodedToken) {
    return {
      status: 401,
      data: {
        message: "Invalid token"
      }
    } as ResponseDto;
  }

  return decodedToken;
}
