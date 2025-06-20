import clsx from 'clsx';
import Link from 'next/link';
import { Post } from '@/entities';
import { format } from 'date-fns';

interface Props {
  className?: string;
  post: Post;
}

export const PostItem = ({ className, post }: Props) => {
  return (
    <article className={clsx(
      'group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900',
      className
    )}>
      <Link href={`/posts/${post.id}`} className="absolute inset-0 z-0" aria-label={`Read more about ${post.title}`}>
        <span className="sr-only">Read more</span>
      </Link>
      
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {format(new Date(post.createdAt), 'MMM d, yyyy')}
          </span>
        </div>
        
        <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {post.title}
        </h3>
        
        <p className="mb-4 text-gray-600 dark:text-gray-300 line-clamp-2">
          {post.content.substring(0, 160)}...
        </p>
        
        <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-medium text-gray-600 dark:text-gray-300">
              {post.author?.name.charAt(0).toUpperCase() || 'U'}
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {post.author?.name || 'Unknown Author'}
            </span>
          </div>
          
          <span className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
            Read more
            <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </span>
        </div>
      </div>
    </article>
  );
};
