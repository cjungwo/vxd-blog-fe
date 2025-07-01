import { prisma } from "@/shared";
import { Post } from "@/generated/prisma";

export async function findAllPosts() {
    const posts: Post[] = await prisma.post.findMany({
        include: {
            author: true,
        },
    });

    return posts;
}
