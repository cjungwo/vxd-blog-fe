import { CreatePostDto, findAllPosts, createPost } from "@entities/post";
import { authGuard, validateBearerToken, verifyToken } from "@entities/auth";
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
        const body: CreatePostDto = await request.json();

        const token = authGuard(request);

        const authToken = validateBearerToken(token);

        const accessToken = verifyToken(authToken);

        const { sub } = accessToken as { sub: string };

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
