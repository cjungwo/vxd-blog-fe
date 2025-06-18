import { CreatePostDto } from "@/entities";
import { ResponseDto } from "@/shared/dto/response.dto";
import { prisma } from "@/shared";
import { Prisma } from "@/generated/prisma";

export async function createPost(dto: CreatePostDto) {
  // Validation Guard
  if (!dto.title || !dto.content || !dto.author) {
    return {
      status: 400,
      data: {
        message: "Invalid post data",
      }
    } as ResponseDto;
  }

  // Business Logic
  const newPost: Prisma.PostCreateInput = await prisma.post.create({
    data: {
      title: dto.title,
      content: dto.content,
      author: dto.author,
    }
  });

  if (!newPost) {
    return {
      status: 400,
      data: {
        message: "Failed to create post",
      }
    } as ResponseDto;
  }

  // Create Response
  const result: ResponseDto = {
      status: 201,
      data: {
          id: newPost.id,
      }
  };

  // Return Response
  return result;
}
