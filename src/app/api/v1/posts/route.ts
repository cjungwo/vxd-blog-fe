import { CreatePostDto, findAllPosts, createPost } from "@entities/post";
import { extractToken, validateBearerToken, verifyToken } from "@entities/auth";
import { ResponseDto } from "@shared/model";
import { NextRequest } from "next/server";

export async function GET() {
    const posts = await findAllPosts();
    return Response.json(new ResponseDto(200, {
        posts,
        count: posts.length,
    }));
}

export async function POST(request: NextRequest) {
    try {
        const authToken = extractToken(request, validateBearerToken);

        const accessToken = verifyToken(authToken as string);

        const { sub } = accessToken as { sub: string };

        const body: CreatePostDto = await request.json();

        const post = await createPost({ ...body, sub });

        return Response.json(new ResponseDto(201, {
            post,
        }));
    } catch (error) {
        return Response.json(new ResponseDto((error as Error).cause as number, {
            message: (error as Error).message
        }));
    }
}
