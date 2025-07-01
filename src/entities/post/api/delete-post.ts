import { DeletePostDto } from "@/entities";
import { prisma } from "@/shared";

export async function deletePost(dto: DeletePostDto) {
  // Validation Guard
  if (!dto.id) {
    throw new Error("Invalid post id", { cause: 400 });
  }

  // Business Logic
  const post = await prisma.post.findUnique({ where: { id: dto.id } });

  if (!post) {
    throw new Error("Post not found", { cause: 404 });
  }

  await prisma.post.delete({ where: { id: post.id } });

  // Return Response
  return post.id;
}
