export default function PostPage({
  params,
}: {
  params: {
    postId: string;
  };
}) {
  return <div>Post {params.postId}</div>;
}