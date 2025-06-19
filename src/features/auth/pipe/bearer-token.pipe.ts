import jwt from "jsonwebtoken";
import { ResponseDto } from "@/shared";

export const bearerTokenPipe = (rawToken: string) => {
  const bearerSplit = rawToken.split(' ');

  if (bearerSplit.length !== 2) return {
    status: 401,
    data: {
      message: "Unauthorized token"
    }
  } as ResponseDto;

  const [bearer, token] = bearerSplit;

  if (bearer.toLowerCase() !== 'bearer') return {
    status: 401,
    data: {
      message: "Unauthorized token"
    }
  } as ResponseDto;

  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);

  if (!decodedToken) return {
    status: 401,
    data: {
      message: "Unauthorized token"
    }
  } as ResponseDto;

  return decodedToken;
}
