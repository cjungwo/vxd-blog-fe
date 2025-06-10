import clsx from 'clsx';
import Link from 'next/link';
import { paths } from '@/shared/lib/router/paths';

interface Props {
   className?: string;
}

export const DevNav = (props: Props) => {
   return <div className={clsx(props.className)}>
      <div className="fixed right-8 bottom-8 bg-gray-600 p-4 rounded-lg">
         {paths.filter((path) => path.group?.includes('dev')).map((path) => (
            <div key={path.name}>
               <Link href={path.path} className="text-white">
                  {path.name}
               </Link>
            </div>
         ))}
      </div>
   </div>;
};
