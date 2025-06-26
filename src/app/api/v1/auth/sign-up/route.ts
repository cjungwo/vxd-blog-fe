import { CreateUserDto } from "@entities/user";
import { signUp, authGuard, basicTokenPipe } from "@entities/auth";
import { ResponseDto } from "@shared/model";
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

  const dto: CreateUserDto = {
    name: body.name,
    email,
    password,
    role: body.role,
  };

  const result = await signUp(dto);

  return Response.json(result);
}
