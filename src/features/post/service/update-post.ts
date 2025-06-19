import { UpdatePostDto } from "@/entities";
import { ResponseDto } from "@/shared";
import { prisma } from "@/shared";

export async function updatePost(dto: UpdatePostDto) {
  // Validation Guard
  if (!dto.id) {
    return {
      status: 400,
      data: {
        message: "Invalid post data",
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

  const updatedPost = await prisma.post.update({ where: { id: post.id }, data: { title: dto.title, content: dto.content } });

  // Create Response
  const result: ResponseDto = {
    status: 200,
    data: {
      post: updatedPost,
    }
  };

  // Return Response
  return result;
}
