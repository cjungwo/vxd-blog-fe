import { ResponseDto } from "@/shared";

export const authGuard = (req: Request): string | ResponseDto => {
  const token = req.headers.get('Authorization');

  if (!token) return {
    status: 401,
    data: {
      message: "Unauthorized token"
    }
  } as ResponseDto;

  return token;
}
