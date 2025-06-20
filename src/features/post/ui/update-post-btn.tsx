import clsx from "clsx";
import Link from "next/link";
import { Post } from "@/entities";

interface Props {
  className?: string;
  post: Post;
}

export const UpdatePostBtn = (props: Props) => {
  return <div className={clsx(props.className)}>
    <Link href={`/posts/${props.post.id}/update`}>Update</Link>
  </div>;
};
