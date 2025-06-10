import clsx from "clsx";
import Link from "next/link";

interface Props {
  className?: string;
}

export const CreatePostBtn = (props: Props) => {
  return <div className={clsx(props.className)}>
    <Link href="/create-post">Create Post</Link>
  </div>;
};
