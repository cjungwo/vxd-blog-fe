import { signUp, authGuard, basicTokenPipe } from "@/features";
import { ResponseDto } from "@/shared";
import { NextRequest } from "next/server";

export async function GET() {
  return Response.json("Hello Sign Up");
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const token = authGuard(req);

  if (token instanceof ResponseDto) return Response.json(token);

  const authToken = basicTokenPipe(token);
  
  if (authToken instanceof ResponseDto) return Response.json(authToken);
  
  const { email, password } = authToken;

  const result = await signUp(email, password, body.name);

  return Response.json(result);
}
