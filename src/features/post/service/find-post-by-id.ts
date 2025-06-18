import { ResponseDto, prisma } from "@/shared";

export async function findPostById(id: string) {
  // Validation Guard
  if (!id) {
    return {
      status: 400,
      data: {
        message: "Invalid post id",
      }
    } as ResponseDto;
  }

  // Business Logic
  const post = await prisma.post.findUnique({ where: { id } });

  if (!post) {
    return {
      status: 404,
      data: {
        message: "Post not found",
      }
    } as ResponseDto;
  }

  // Create Response
  const result: ResponseDto = {
    status: 200,
    data: {
      post: post,
    }
  };

  // Return Response
  return result;
}
