import { ResponseDto } from "@/shared/dto/response.dto";
import { prisma } from "@/shared";
import { Post } from "@/generated/prisma";

export async function createPost({ title, content, sub }: { title: string, content: string, sub: string }) {
  // Validation Guard
  if (!title || !content || !sub) {
    return {
      status: 400,
      data: {
        message: "Invalid post data",
      }
    } as ResponseDto;
  }

  const user = await prisma.user.findUnique({ where: { id: sub } });

  if (!user) {
    return {
      status: 404,
      data: {
        message: "User not found",
      }
    } as ResponseDto;
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
        post: newPost,
      }
  };

  // Return Response
  return result;
}
