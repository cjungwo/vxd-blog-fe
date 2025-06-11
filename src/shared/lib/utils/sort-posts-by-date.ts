import { Post } from "@/entities";

export const sortPostsByDate = (posts: Post[]) => {
  return posts.sort((a: Post, b: Post) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
};
