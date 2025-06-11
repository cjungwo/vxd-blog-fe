import { CreatePostDto, Post, posts } from "@/entities";
import { generatePostId } from "@/shared";
import { ResponseDto } from "@/shared/dto/response.dto";

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
  const newPost: Post = {
      ...dto,
      id: generatePostId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
  };

  posts.push(newPost);

  // Result Checking
  const post = posts.find((post) => post.id === newPost.id);

  if (!post) {
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
          id: post.id,
      }
  };

  // Return Response
  return result;
}
