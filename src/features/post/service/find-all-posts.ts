import { ResponseDto } from "@/shared";
import { prisma } from "@/shared";
import { Post } from "@/generated/prisma";

export async function findAllPosts() {
    const posts: Post[] = await prisma.post.findMany({
        include: {
            author: true,
        },
    });

    const result: ResponseDto = {
        status: 200,
        data: {
            posts: posts,
        }
    };
    
    return result;
}
