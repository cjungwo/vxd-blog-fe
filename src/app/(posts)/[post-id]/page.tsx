import { PostProps } from "@/shared";

export default async function PostPage({ params }: PostProps) {
  const postId = (await params)['post-id'];

  return <div>Post {postId}</div>;
}
