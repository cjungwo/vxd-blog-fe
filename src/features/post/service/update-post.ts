import { posts, UpdatePostDto } from "@/entities";
import { ResponseDto } from "@/shared/dto/response.dto";

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
  const post = posts.find((post) => post.id === dto.id);

  if (!post) {
    return {
      status: 404,
      data: {
        message: "Post not found",
      }
    } as ResponseDto;
  }

  if (dto.title) {
    post.title = dto.title;
  }

  if (dto.content) {
    post.content = dto.content;
  }

  if (dto.author) {
    post.author = dto.author;
  }

  // Create Response
  const result: ResponseDto = {
    status: 200,
    data: {
      post: post,
    }
  }

  // Return Response
  return result;
}
