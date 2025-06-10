import clsx from 'clsx';
import Link from 'next/link';

interface Props {
  className?: string;
}

export const Title = (props: Props) => {
  return <div className={clsx(props.className)}>
    <Link href="/"><h1 className="text-2xl font-bold">VXD Blog</h1></Link>
  </div>;
};
