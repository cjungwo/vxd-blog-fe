import clsx from 'clsx';
import Link from 'next/link';

interface Props {
  className?: string;
  pathname?: string | null;
  title?: string;
}

export const Breadcrumb = (props: Props) => {
  const { pathname, title } = props;

  const paths = pathname?.split("/") || [];

  if (paths.length === 0) {
    throw new Error("Invalid pathname");
  }

  const items = paths.map((path, index) => {
    if (path === "" || path === "posts") {
      return null;
    }

    const pathName = title ?? path;
    
    return (
      <Link href={title ? `/posts/${path}` : `/${path}`} key={index} className='before:content-[">"] before:mr-2 px-2 py-1'>
        <span>{pathName}</span>
      </Link>
    )
  })


  return <div className={clsx(props.className)}>
    <Link href="/" className='py-1'>Home</Link>
    {items}
  </div>;
};
