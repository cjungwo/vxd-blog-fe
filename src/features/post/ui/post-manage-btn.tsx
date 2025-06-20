"use client";

import clsx from 'clsx';
import { UpdatePostBtn } from './update-post-btn';
import { DeletePostBtn } from './delete-post-btn';
import { Post } from '@/entities';

interface Props {
  className?: string;
  post: Post;
}

export const PostManageBtn = (props: Props) => {

  return <div className={clsx(props.className)}>
    <UpdatePostBtn className="mr-4" post={props.post} />
    <DeletePostBtn className="mr-2" postId={props.post.id} />
  </div>;
};
