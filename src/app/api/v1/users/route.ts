import { CreateUserDto } from "@entities/user";
import { authGuard, authenticate, bearerTokenPipe, rbacGuard, tokenVerifyPipe } from "@entities/auth";
import { findUsers, createUser } from "@entities/user";
import { ResponseDto } from "@shared/model";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const token = authGuard(req);
  if (token instanceof ResponseDto) return Response.json(token);

  const authToken = bearerTokenPipe(token);
  if (authToken instanceof ResponseDto) return Response.json(authToken);
  
  const { sub } = JSON.parse(authToken);

  const authenticatedUser = await authenticate(sub);
  if (authenticatedUser instanceof ResponseDto) return Response.json(authenticatedUser);

  const isAuthorized = await rbacGuard(authenticatedUser.role, "ADMIN");
  if (isAuthorized instanceof ResponseDto) return Response.json(isAuthorized);

  const result: ResponseDto = await findUsers();

  return Response.json(result);
}

export async function POST(req: NextRequest) {
  const token = authGuard(req);
  const body = await req.json();

  if (token instanceof ResponseDto) return Response.json(token);

  const authToken = bearerTokenPipe(token);
  if (authToken instanceof ResponseDto) return Response.json(authToken);

  const accessToken = tokenVerifyPipe(authToken);
  if (accessToken instanceof ResponseDto) return Response.json(accessToken);

  const { sub } = accessToken as { sub: string };

  const authenticatedUser = await authenticate(sub);
  if (authenticatedUser instanceof ResponseDto) return Response.json(authenticatedUser);

  const isAuthorized = rbacGuard(authenticatedUser.role, "ADMIN");
  if (isAuthorized instanceof ResponseDto) return Response.json(isAuthorized);

  const dto: CreateUserDto = {
    name: body.name,
    email: body.email,
    password: body.password,
    role: body.role,
  }

  const result = await createUser(dto);

  return Response.json(result);
}
