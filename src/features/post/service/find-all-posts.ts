import { ResponseDto } from "@/shared";
import { prisma } from "@/shared";

export async function findAllPosts() {
    const posts = await prisma.post.findMany();

    const result: ResponseDto = {
        status: 200,
        data: {
            posts: posts,
        }
    };
    
    return result;
}
