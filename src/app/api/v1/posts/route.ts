import { posts } from "@/entities";

export async function GET() {
    return new Response(JSON.stringify(posts));
}
