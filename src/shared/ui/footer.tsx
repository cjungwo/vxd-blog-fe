import { SocialBtn } from '@/features';
import { socialBtnPaths } from '@/shared';
import clsx from 'clsx';

interface Props {
  className?: string;
}

export const Footer = (props: Props) => {
  return <div className={clsx(props.className, 'flex flex-col items-center justify-center')}>
    <div className="flex items-center space-x-4 mb-4">
      {socialBtnPaths.map((path) => (
        <SocialBtn key={path.href} href={path.href} icon={path.icon} label={path.label} />
      ))}
    </div>
    <p className="text-gray-500">© 2025 VXD Blog. All rights reserved.</p>
  </div>;
};
