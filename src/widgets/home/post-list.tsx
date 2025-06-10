"use client";

import clsx from 'clsx';
import { PostItem } from '@/features';
import { Post } from '@/entities';
import { useEffect, useState } from 'react';

interface Props {
  className?: string;
}

export const PostList = (props: Props) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch('/api/v1/posts').then((resp) => resp.json()).then((data) => setPosts(data));
  }, []);

  return <div className={clsx(props.className)}>
    {posts.map((post: Post) => (
      <PostItem className='mb-4' key={post.id} post={post} />
    ))}

  </div>;
};
