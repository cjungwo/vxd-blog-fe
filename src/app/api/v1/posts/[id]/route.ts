import { UpdatePostDto, DeletePostDto, findPostById, updatePost, deletePost } from "@entities/post";
import { ApiParams, ResponseDto } from "@/shared";
import { NextRequest } from "next/server";
import { extractToken, validateBearerToken, verifyToken } from "@/entities/auth";
import { userGuard } from "@/entities/user";

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
    const authToken = extractToken(request, validateBearerToken);

    const accessToken = verifyToken(authToken as string);

    const { sub } = accessToken as { sub: string };

    const { id } = await params;

    const post = await findPostById(id);

    const isAuthorized = userGuard(post.authorId, sub!);
    
    if (!isAuthorized) throw new Error("User not authorized", { cause: 403 });
    
    const body = await request.json();

    const dto: UpdatePostDto = {
      id,
      ...body,
    };

    const updatedPost = await updatePost(dto);

    return Response.json(new ResponseDto(200, { updatedPost }));
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

    const { id } = await params;

    const post = await findPostById(id);

    const isAuthorized = userGuard(post.authorId, sub!);

    if (!isAuthorized) throw new Error("User not authorized", { cause: 403 });

    const dto: DeletePostDto = { id };

    const postId = await deletePost(dto);

    return Response.json(new ResponseDto(200, { postId }));
  } catch (error) {
    return Response.json(new ResponseDto((error as Error).cause as number, {
      message: (error as Error).message
    }));
  }
}
