import { DeletePostDto } from "@/entities";
import { ResponseDto } from "@/shared";
import { prisma } from "@/shared";

export async function deletePost(dto: DeletePostDto) {
  // Validation Guard
  if (!dto.id) {
    return {
      status: 400,
      data: {
        message: "Invalid post id",
      }
    } as ResponseDto;
  }

  // Business Logic
  const post = await prisma.post.findUnique({ where: { id: dto.id } });

  if (!post) {
    return {
      status: 404,
      data: {
        message: "Post not found",
      }
    } as ResponseDto;
  }

  await prisma.post.delete({ where: { id: post.id } });

  // Create Response
  const result: ResponseDto = {
    status: 200,
    data: {
      id: post.id,
    }
  };

  // Return Response
  return result;
}
