import { posts } from "@/entities";
import { ResponseDto } from "@/shared";

export async function deletePost(id: string) {
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
  const post = posts.find((post) => post.id === id);

  if (!post) {
    return {
      status: 404,
      data: {
        message: "Post not found",
      }
    } as ResponseDto;
  }

  posts.splice(posts.indexOf(post), 1);

  // Result Checking
  if (posts.indexOf(post) !== -1) {
    return {
      status: 400,
      data: {
        message: "Failed to delete post",
      }
    } as ResponseDto;
  }

  // Create Response
  const result: ResponseDto = {
    status: 200,
    data: {
      message: "Post deleted successfully",
    }
  };

  // Return Response
  return result;
}
