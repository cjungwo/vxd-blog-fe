import { signIn } from "@/features";
import { authGuard } from "@/features/auth/guard";
import { basicTokenPipe } from "@/features/auth/pipe/basic-token.pipe";
import { ResponseDto } from "@/shared";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const token = authGuard(req);

  if (token instanceof ResponseDto) return Response.json(token);

  const authToken = basicTokenPipe(token);

  if (authToken instanceof ResponseDto) return Response.json(authToken);

  const { email, password } = authToken;

  const result = await signIn(email, password);

  return Response.json(result);
}
