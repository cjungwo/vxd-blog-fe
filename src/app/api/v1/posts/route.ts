import { CreatePostDto } from "@/entities";
import { findAllPosts, createPost } from "@/features";

export async function GET() {
    const result = await findAllPosts();
    return new Response(JSON.stringify(result));
}

export async function POST(request: Request) {
    const dto: CreatePostDto = await request.json();

    const result = await createPost(dto);

    return new Response(JSON.stringify(result));
}
