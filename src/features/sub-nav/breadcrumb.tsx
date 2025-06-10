import clsx from 'clsx';
import Link from 'next/link';

interface Props {
  className?: string;
  pathname?: string | null;
}

export const Breadcrumb = (props: Props) => {
  const { pathname } = props;

  const paths = pathname?.split("/") || [];

  if (paths.length === 0) {
    throw new Error("Invalid pathname");
  }

  const items = paths.map((path, index) => {
    if (path === "") {
      return null;
    }

    return (
      <Link href={path} key={index} className='before:content-[">"] before:mr-2 px-2 py-1'>
        <span>{path}</span>
      </Link>
    )
  })


  return <div className={clsx(props.className)}>
    <Link href="/" className='py-1'>Home</Link>
    {items}
  </div>;
};
