import { CreateUserDto, findUserByEmail } from "@entities/user";
import { authGuard, validateBearerToken, rbacGuard, verifyToken } from "@entities/auth";
import { findUsers, createUser, findUserById } from "@entities/user";
import { ResponseDto } from "@shared/model";
import { NextRequest } from "next/server";
import { JwtPayload } from "jsonwebtoken";
import { Role } from "@/generated/prisma";

export async function GET(req: NextRequest) {
  try {
    const accessToken = authGuard(req);

    const validatedToken = validateBearerToken(accessToken);

    const verifiedToken = verifyToken(validatedToken);

    const { sub } = verifiedToken as JwtPayload;

    if (!sub) throw new Error("Unauthorized", { cause: 401 });
    
    const authenticatedUser = await findUserById(sub);

    const isAuthorized = rbacGuard(authenticatedUser.role, Role.ADMIN);
    
    if (!isAuthorized) throw new Error("User not authorized", { cause: 403 });

    const users = await findUsers();

    return Response.json(new ResponseDto(200, {
      users,
      count: users.length,
    }));
  } catch (error) {
    return Response.json(new ResponseDto((error as Error).cause as number, {
      message: (error as Error).message
    }));
  }
}

export async function POST(req: NextRequest) {
  try {
    const accessToken = authGuard(req);

    const validatedToken = validateBearerToken(accessToken);

    const verifiedToken = verifyToken(validatedToken);

    const { sub } = verifiedToken as JwtPayload;

    if (!sub) throw new Error("Unauthorized", { cause: 401 });
    
    const authenticatedUser = await findUserById(sub);

    const isAuthorized = rbacGuard(authenticatedUser.role, Role.ADMIN);
    
    if (!isAuthorized) throw new Error("User not authorized", { cause: 403 });

    const body = await req.json();

    for (const key of Object.keys(body)) {
      if (!body[key as keyof typeof body]?.trim()) {
        throw new Error("Invalid user info", { cause: 401 });
      }
    }

    const vaildatedEmail = await findUserByEmail(body.email);
    
    if (vaildatedEmail) {
      throw new Error("User already exists", { cause: 400 });
    }
    
    const dto: CreateUserDto = {
      email: body.email,
      password: body.password,
      name: body.name,
      role: body.role,
    }

    const user = await createUser(dto);

    return Response.json(new ResponseDto(201, {
      user,
    }));
  } catch (error) {
    return Response.json(new ResponseDto((error as Error).cause as number, {
      message: (error as Error).message
    }));
  }
}
