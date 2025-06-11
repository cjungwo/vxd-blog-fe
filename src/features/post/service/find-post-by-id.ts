import { posts } from "@/entities";

export async function findPostById(id: string) {
  // Validation Guard
  if (!id) {
    return {
      status: 400,
      data: {
        message: "Invalid post id",
      }
    };
  }

  // Business Logic
  const post = posts.find((post) => post.id === id);

  if (!post) {
    return {
      status: 404,
      data: {
        message: "Post not found",
      }
    };
  }

  // Create Response
  const result = {
    status: 200,
    data: {
      post: post,
    }
  }

  // Return Response
  return result;
}
