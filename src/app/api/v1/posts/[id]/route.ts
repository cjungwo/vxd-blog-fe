import { UpdatePostDto, DeletePostDto } from "@entities/post";
import { 
  authGuard, 
  authenticate, 
  bearerTokenPipe, 
  rbacGuard,
  tokenVerifyPipe,
} from "@entities/auth";
import { findPostById, updatePost, deletePost, compareAuthorUser } from "@features/post";
import { ApiParams, ResponseDto } from "@/shared";
import { NextRequest } from "next/server";

export async function GET(_: NextRequest, { params }: ApiParams) { 
  const { id } = await params;

  const result = await findPostById(id);

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

  const isAuthorized = await compareAuthorUser(id, authenticated.id);

  if (isAuthorized instanceof ResponseDto) return Response.json(isAuthorized);

  const dto: UpdatePostDto = {
    id,
    ...body,
  };

  const result = await updatePost(dto);

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

  const isAuthorized = rbacGuard(authenticated.role, "ADMIN");
  const isUserAuthorized = await compareAuthorUser(id, authenticated.id);

  if (
    isAuthorized instanceof ResponseDto 
    && isUserAuthorized instanceof ResponseDto
  ) return Response.json(isAuthorized);

  const dto: DeletePostDto = { id };

  const result = await deletePost(dto);

  return Response.json(result);
}

