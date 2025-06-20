"use client";

import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { PostItem } from '@/features';
import { Post } from '@/entities';
import { sortPostsByDate } from '@/shared';

interface Props {
  className?: string;
}

export const PostList = (props: Props) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch('/api/v1/posts')
    .then((resp) => resp.json())
    .then((json) => {
      setPosts(json.data.posts);
    });
  }, []);

  return <div className={clsx(props.className)}>
    {sortPostsByDate(posts).map((post: Post) => (
      <PostItem className='mb-4' key={post.id} post={post} />
    ))}
  </div>;
};
