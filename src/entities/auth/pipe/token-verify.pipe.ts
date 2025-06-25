import jwt from "jsonwebtoken";
import { ResponseDto } from "@/shared";

export const tokenVerifyPipe = async (token: string, isRefreshToken: boolean = false) => {
  const secret = isRefreshToken ? process.env.REFRESH_TOKEN_SECRET : process.env.ACCESS_TOKEN_SECRET;

  const decodedToken = await jwt.verify(token, secret!);

  if (!decodedToken) return {
    status: 401,
    data: {
      message: "Expired token"
    }
  } as ResponseDto;

  return decodedToken;
}
