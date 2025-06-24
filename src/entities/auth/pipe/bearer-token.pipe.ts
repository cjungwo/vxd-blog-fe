import { ResponseDto } from "@/shared";

export const bearerTokenPipe = (rawToken: string) => {
  const bearerSplit = rawToken.split(' ');

  if (bearerSplit.length !== 2) return {
    status: 401,
    data: {
      message: "Invalid token"
    }
  } as ResponseDto;

  const [bearer, token] = bearerSplit;

  if (bearer.toLowerCase() !== 'bearer') return {
    status: 401,
    data: {
      message: "Invalid token"
    }
  } as ResponseDto;

  return token;
}
