import { format } from 'date-fns';
import { interpunct, PostProps } from "@/shared";
import { SubNav } from "@/widgets";
import { Post } from '@/entities';
import { PostManageBtn } from '@/features';
import { baseUrl } from '@/shared/lib/consts';

export default async function PostPage({ params }: PostProps) {
  const postId = (await params)['post-id'];

  const post: Post = await fetch(`${baseUrl}/api/v1/posts/${postId}`)
    .then(response => response.json())
    .then(data => {
      if (data.status !== 200) {
        throw new Error(data.data.message);
      }

      return data.data.post;
    })
    .catch(error => {
      console.error('Error fetching post:', error);
      throw error;
    });

  if (!post) {
    throw new Error('Post not found');
  }

  const formattedDate = format(post.createdAt, 'yyyy-MM-dd');

  return (
    <>
      <SubNav title={post.title} className="py-4" />
      <div className="my-4">
        <article>
          <header className="mb-12">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <div className="flex justify-between items-center">
              <div className="flex text-gray-600 text-sm">
                <span>{post.author?.name ?? 'Unknown Author'}</span>
                <span className="mx-2">{interpunct}</span>
                <time dateTime={formattedDate}>{formattedDate}</time>
                <span className="mx-2">{interpunct}</span>
                <span className="font-medium mr-1">{1}</span> views
              </div>
              <PostManageBtn postId={post.id} className="flex justify-end items-center" />
            </div>
          </header>
        
          <main className="prose lg:prose-lg">
            <p className="text-lg leading-relaxed mb-6">
              {post.content.split('\n').map((paragraph: string, i: number) => (
                <span key={i}>
                  {paragraph}
                  <br />
                </span>
              ))}
            </p>
          </main>

          <footer className="mt-16 pt-6 border-t border-gray-200">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-xl font-medium mr-4">
                {post.author?.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-medium">{post.author?.name ?? 'Unknown Author'}</p>
                <p className="text-sm text-gray-600">Author</p>
              </div>
            </div>
          </footer>
      </article>
    </div>
  </>
  );
}
