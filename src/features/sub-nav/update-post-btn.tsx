"use client";

import clsx from "clsx";
import Link from "next/link";

interface Props {
  className?: string;
}

export const UpdatePostBtn = (props: Props) => {
  return <div className={clsx(props.className)}>
    <Link href="/update-post">Update Post</Link>
  </div>;
};