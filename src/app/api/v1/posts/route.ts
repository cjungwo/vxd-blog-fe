import { CreatePostDto, Post, posts } from "@/entities";
import { generatePostId } from "@/shared";

export async function GET() {
    return new Response(JSON.stringify(posts));
}

export async function POST(request: Request) {
    const body: CreatePostDto = await request.json();

    console.log("DEBUG: Success create post - ",body);

    if (!body.title || !body.content || !body.author) {
        const result = {
            status: 400,
            data: {
                message: "Invalid post data",
            }
        };
        
        return new Response(JSON.stringify(result));
    }

    const newPost: Post = {
        ...body,
        id: generatePostId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    posts.push(newPost);

    const post = posts.find((post) => post.id === newPost.id);

    const result = {
        status: 201,
        data: {
            id: post?.id,
        }
    };
    
    return new Response(JSON.stringify(result));
}
