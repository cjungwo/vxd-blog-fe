import { CreatePostDto } from "@/entities";
import { findAllPosts, createPost } from "@/features";
import { NextRequest } from "next/server";

export async function GET() {
    const result = await findAllPosts();
    return Response.json(result);
}

export async function POST(request: NextRequest) {
    const dto: CreatePostDto = await request.json();

    const result = await createPost(dto);

    return Response.json(result);
}
