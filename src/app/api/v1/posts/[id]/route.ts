import { UpdatePostDto, DeletePostDto, findPostById, updatePost, deletePost } from "@entities/post";
import { ApiParams, ResponseDto } from "@/shared";
import { NextRequest } from "next/server";
import { authGuard, validateBearerToken, verifyToken } from "@/entities/auth";
import { userGuard } from "@/entities/user";
import { JwtPayload } from "jsonwebtoken";

export async function GET(_: NextRequest, { params }: ApiParams) { 
  try {
    const { id } = await params;

    const post = await findPostById(id);

    return Response.json(new ResponseDto(200, {
      post,
    }));
  } catch (error) {
    return Response.json(new ResponseDto((error as Error).cause as number, {
      message: (error as Error).message
    }));
  }
}

export async function PATCH(request: NextRequest, { params }: ApiParams) { 
  try {
    const { id } = await params;
    const body = await request.json();

    const accessToken = authGuard(request);

    const validatedToken = validateBearerToken(accessToken);

    const verifiedToken = verifyToken(validatedToken);

    const { sub } = verifiedToken as JwtPayload;

    const isAuthorized = userGuard(id, sub!);

    if (!isAuthorized) throw new Error("User not authorized", { cause: 403 });

    const dto: UpdatePostDto = {
      id,
      ...body,
    };

    const post = await updatePost(dto);

    return Response.json(new ResponseDto(200, {
      post,
    }));
  } catch (error) {
    return Response.json(new ResponseDto((error as Error).cause as number, {
      message: (error as Error).message
    }));
  }
}

export async function DELETE(request: NextRequest, { params }: ApiParams) { 
  try {
    const { id } = await params;

    const accessToken = authGuard(request);

    const validatedToken = validateBearerToken(accessToken);

    const verifiedToken = verifyToken(validatedToken);

    const { sub } = verifiedToken as JwtPayload;

    const isAuthorized = userGuard(id, sub!);

    if (!isAuthorized) throw new Error("User not authorized", { cause: 403 });

    const dto: DeletePostDto = { id };

    const postId = await deletePost(dto);

    return Response.json(new ResponseDto(200, {
      postId,
    }));
  } catch (error) {
    return Response.json(new ResponseDto((error as Error).cause as number, {
      message: (error as Error).message
    }));
  }
}
