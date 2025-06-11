import clsx from 'clsx';
import { paths } from '@/shared/lib/router/paths';
import Link from 'next/link';

interface Props {
  className?: string;
}

export const MainNav = (props: Props) => {
  return <nav className={clsx(props.className)}>
    <ul className="flex gap-4">
      {paths.filter((path) => path.group?.includes('main')).map((path) => (
        <div key={path.name}>
          <Link href={path.path} className="text-white hover:text-gray-200">
            {path.name}
          </Link>
        </div>
      ))}
    </ul>
  </nav>;
};
