import { prisma } from "@/shared";

export async function findPostById(id: string) {
  // Validation Guard
  if (!id) {
    throw new Error("Invalid post id", { cause: 400 });
  }

  // Business Logic
  const post = await prisma.post.findUnique({
    where: { id }, 
    include: { 
      author: {
        select: {
          name: true,
        },
      } 
    }
  });

  if (!post) {
    throw new Error("Post not found", { cause: 404 });
  }

  return post;
}
