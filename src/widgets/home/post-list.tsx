import clsx from 'clsx';
import { PostItem } from '@/features';
import { posts } from '@/entities';

interface Props {
  className?: string;
}

export const PostList = (props: Props) => {
  return <div className={clsx(props.className)}>
    {posts.map((post) => (
      <PostItem className='mb-4' key={post.id} post={post} />
    ))}
  </div>;
};
