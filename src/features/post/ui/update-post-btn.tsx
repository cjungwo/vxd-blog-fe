import clsx from "clsx";
import Link from "next/link";

interface Props {
  className?: string;
  postId: string;
}

export const UpdatePostBtn = (props: Props) => {
  return <div className={clsx(props.className)}>
    <Link href={`/posts/${props.postId}/update`}>Update</Link>
  </div>;
};
