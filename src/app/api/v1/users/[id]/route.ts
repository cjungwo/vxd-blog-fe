import { UpdateUserDto } from "@/entities";
import { deleteUser, findUserById, updateUser } from "@features/user";
import { authenticate, authGuard, bearerTokenPipe, rbacGuard, tokenVerifyPipe } from "@entities/auth";
import { ApiParams, ResponseDto } from "@shared/model";
import { NextRequest } from "next/server";
import { compareAuthorUser } from "@/features/post";

export async function GET(request: NextRequest, { params }: ApiParams) { 
  const { id } = await params;

  const token = authGuard(request);
  if (token instanceof ResponseDto) return Response.json(token);

  const authToken = bearerTokenPipe(token);
  if (authToken instanceof ResponseDto) return Response.json(authToken);

  const accessToken = tokenVerifyPipe(authToken);
  if (accessToken instanceof ResponseDto) return Response.json(accessToken);

  const { sub } = accessToken as { sub: string };
  
  const authenticated = await authenticate(sub);
  if (authenticated instanceof ResponseDto) return Response.json(authenticated);

  const isAuthorized = await rbacGuard(authenticated.role, "ADMIN");
  const isUserAuthorized = await compareAuthorUser(id, authenticated.id);
  if (
    isAuthorized instanceof ResponseDto 
    && isUserAuthorized instanceof ResponseDto
  ) return Response.json(isAuthorized);
  
  const result = await findUserById(id);

  return Response.json(result);
}

export async function PATCH(request: NextRequest, { params }: ApiParams) { 
  const { id } = await params;
  const body = await request.json();

  const token = authGuard(request);
  if (token instanceof ResponseDto) return Response.json(token);

  const authToken = bearerTokenPipe(token);
  if (authToken instanceof ResponseDto) return Response.json(authToken);

  const accessToken = tokenVerifyPipe(authToken);
  if (accessToken instanceof ResponseDto) return Response.json(accessToken);

  const { sub } = accessToken as { sub: string };

  const authenticated = await authenticate(sub);
  if (authenticated instanceof ResponseDto) return Response.json(authenticated);

  const isAuthorized = await rbacGuard(authenticated.role, "ADMIN");
  const isUserAuthorized = await compareAuthorUser(id, authenticated.id);
  if (
    isAuthorized instanceof ResponseDto 
    && isUserAuthorized instanceof ResponseDto
  ) return Response.json(isAuthorized);

  const dto: UpdateUserDto = {
    id,
    ...body,
  };
  
  const result = await updateUser(dto);

  return Response.json(result);
}

export async function DELETE(request: NextRequest, { params }: ApiParams) { 
  const { id } = await params;

  const token = authGuard(request);
  if (token instanceof ResponseDto) return Response.json(token);

  const authToken = bearerTokenPipe(token);
  if (authToken instanceof ResponseDto) return Response.json(authToken);

  const accessToken = tokenVerifyPipe(authToken);
  if (accessToken instanceof ResponseDto) return Response.json(accessToken);

  const { sub } = accessToken as { sub: string };
  const authenticated = await authenticate(sub);
  if (authenticated instanceof ResponseDto) return Response.json(authenticated);

  const isAuthorized = await rbacGuard(authenticated.role, "ADMIN");
  const isUserAuthorized = await compareAuthorUser(id, authenticated.id);
  if (
    isAuthorized instanceof ResponseDto 
    && isUserAuthorized instanceof ResponseDto
  ) return Response.json(isAuthorized);
  
  const result = await deleteUser(id);

  return Response.json(result);
}
