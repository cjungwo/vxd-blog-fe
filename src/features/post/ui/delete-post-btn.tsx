"use client";

import clsx from "clsx";
import Link from "next/link";

interface Props {
  className?: string;
  postId: string;
}

export const DeletePostBtn = (props: Props) => {
  return <div className={clsx(props.className)}>
    <Link href={`/posts/${props.postId}/delete`}>Delete</Link>
  </div>;
};