import { format } from 'date-fns';
import { posts } from "@/entities";
import { PostProps } from "@/shared";

export default async function PostPage({ params }: PostProps) {
  const postId = (await params)['post-id'];
  const post = posts.find((post) => post.id === postId);

  if (!post) {
    throw new Error('Post not found');
  }

  const formattedDate = format(new Date(post.createdAt), 'yyyy-MM-dd');

  return (
    <div className="my-4 ">
      <article>
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex text-gray-600 text-sm">
            <span>{post.author}</span>
            <span className="mx-2">·</span>
            <time dateTime={post.createdAt}>{formattedDate}</time>
          </div>
        </header>
        
        <div className="prose lg:prose-lg">
          <p className="text-lg leading-relaxed mb-6">
            {post.content.split('\n').map((paragraph, i) => (
              <span key={i}>
                {paragraph}
                <br />
              </span>
            ))}
          </p>
        </div>

        <footer className="mt-16 pt-6 border-t border-gray-200">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-xl font-medium mr-4">
              {post.author.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-medium">{post.author}</p>
              <p className="text-sm text-gray-600">Author</p>
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
}
