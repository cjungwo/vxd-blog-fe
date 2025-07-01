"use client";

import clsx from 'clsx';
import { UpdatePostBtn } from './UpdatePostBtn';
import { DeletePostBtn } from './DeletePostBtn';

interface Props {
  className?: string;
  postId: string;
}

export const PostManageBtn = (props: Props) => {

  return <div className={clsx(props.className)}>
    <UpdatePostBtn className="mr-4" postId={props.postId} />
    <DeletePostBtn className="mr-2" postId={props.postId} />
  </div>;
};
