import { UpdatePostDto } from "@/entities";
import { prisma } from "@/shared";

export async function updatePost(dto: UpdatePostDto) {
  // Validation Guard
  if (!dto.id) {
    throw new Error("Invalid post data", { cause: 400 });
  }

  // Business Logic
  const post = await prisma.post.findUnique({ where: { id: dto.id } });

  if (!post) {
    throw new Error("Post not found", { cause: 404 });
  }

  const updatedPost = await prisma.post.update({ where: { id: post.id }, data: { title: dto.title, content: dto.content } });

  return updatedPost;
}
