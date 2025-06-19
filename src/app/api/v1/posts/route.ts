import { CreatePostDto } from "@/entities";
import { findAllPosts, createPost, authGuard, bearerTokenPipe } from "@/features";
import { ResponseDto } from "@/shared";
import { NextRequest } from "next/server";

export async function GET() {
    const result = await findAllPosts();
    return Response.json(result);
}

export async function POST(request: NextRequest) {
    const body: CreatePostDto = await request.json();

    const token = authGuard(request);

    if (token instanceof ResponseDto) return Response.json(token);

    const authToken = bearerTokenPipe(token);

    if (authToken instanceof ResponseDto) return Response.json(authToken);

    const { sub } = authToken as { sub: string };

    const result = await createPost({ ...body, sub });

    return Response.json(result);
}
