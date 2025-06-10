import { posts } from "@/entities";

export async function GET() {
    return new Response(JSON.stringify(posts));
}

export async function POST(request: Request) {
    const body = await request.json();

    console.log("DEBUG: Success create post - ",body);
    
    return new Response(JSON.stringify(body));
}
