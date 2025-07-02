import { AuthDto } from "@/entities";
import { NextRequest } from "next/server";

export const extractToken = (req: NextRequest, validateToken: (rawToken: string) => AuthDto | string): AuthDto | string => {
  // 1. extract basic token
  const rawToken = req.headers.get('Authorization');

  if (!rawToken) {
    throw new Error("Unauthorized token", { cause: 401 });
  }

  const token = validateToken(rawToken);

  return token;
}