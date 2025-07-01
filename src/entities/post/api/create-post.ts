import { prisma } from "@/shared";
import { Post } from "@/generated/prisma";

export async function createPost({ title, content, sub }: { title: string, content: string, sub: string }) {
  // Validation Guard
  if (!title || !content || !sub) {
    throw new Error("Invalid post data", { cause: 400 });
  }

  const user = await prisma.user.findUnique({ where: { id: sub } });

  if (!user) {
    throw new Error("User not found", { cause: 404 });
  }

  // Business Logic
  const newPost: Post = await prisma.post.create({
    data: {
      title,
      content,
      author: {
        connect: {
          id: sub,
        },
      },
    }
  });

  if (!newPost) {
    throw new Error("Failed to create post", { cause: 400 });
  }

  return newPost;
}
