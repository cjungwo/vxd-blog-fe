import { UpdateUserDto, userGuard, deleteUser, findUserById, updateUser  } from "@entities/user";
import { extractToken, rbacGuard, validateBearerToken, verifyToken } from "@entities/auth";
import { ApiParams, ResponseDto } from "@shared/model";
import { NextRequest } from "next/server";
import { Role } from "@/generated/prisma";

export async function GET(request: NextRequest, { params }: ApiParams) { 
  try {
    const authToken = extractToken(request, validateBearerToken);

    const accessToken = verifyToken(authToken as string);

    const { sub } = accessToken as { sub: string };

    if (!sub) throw new Error("Unauthorized", { cause: 401 });
    
    const authenticated = await findUserById(sub);

    const isAuthorized = rbacGuard(authenticated.role, Role.ADMIN);

    const { id } = await params;

    const isUserAuthorized = userGuard(id, authenticated.id);
    
    if (!isAuthorized && !isUserAuthorized) throw new Error("User not authorized", { cause: 403 });
    
    const user = await findUserById(id);

    return Response.json(new ResponseDto(200, {
      user,
    }));
  } catch (error) {
    return Response.json(new ResponseDto((error as Error).cause as number, {
      message: (error as Error).message
    }));
  }
}

export async function PATCH(request: NextRequest, { params }: ApiParams) { 
  try {
    const authToken = extractToken(request, validateBearerToken);

    const accessToken = verifyToken(authToken as string);

    const { sub } = accessToken as { sub: string };

    if (!sub) throw new Error("Unauthorized", { cause: 401 });
    
    const authenticated = await findUserById(sub);

    const isAuthorized = rbacGuard(authenticated.role, Role.ADMIN);

    const { id } = await params;

    const isUserAuthorized = userGuard(id, authenticated.id);
    
    if (!isAuthorized && !isUserAuthorized) throw new Error("User not authorized", { cause: 403 });
    
    const body = await request.json();

    const dto: UpdateUserDto = {
      id,
      ...body,
    };
    
    const user = await updateUser(dto);

    return Response.json(new ResponseDto(200, {
      user,
    }));
  } catch (error) {
    return Response.json(new ResponseDto((error as Error).cause as number, {
      message: (error as Error).message
    }));
  }
}

export async function DELETE(request: NextRequest, { params }: ApiParams) { 
  try {
    const authToken = extractToken(request, validateBearerToken);

    const accessToken = verifyToken(authToken as string);

    const { sub } = accessToken as { sub: string };

    if (!sub) throw new Error("Unauthorized", { cause: 401 });
    
    const authenticated = await findUserById(sub);

    const isAuthorized = rbacGuard(authenticated.role, Role.ADMIN);

    const { id } = await params;

    const isUserAuthorized = userGuard(id, authenticated.id);
    
    if (!isAuthorized && !isUserAuthorized) throw new Error("User not authorized", { cause: 403 });
    
    const user = await deleteUser(id);

    return Response.json(new ResponseDto(200, {
      user,
    }));
  } catch (error) {
    return Response.json(new ResponseDto((error as Error).cause as number, {
      message: (error as Error).message
    }));
  }
}
