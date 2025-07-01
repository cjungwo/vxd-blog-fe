"use client";

import { AuthBtn, MainNav, Logo, ThemeBtn } from '@/features';
import clsx from 'clsx';

interface Props {
  className?: string;
}

export const Header = (props: Props) => {

  return <div className={clsx(props.className, 'flex justify-between items-center')}>
    <Logo />
    <MainNav />
    <div className="flex items-center space-x-8">
      <ThemeBtn />
      <AuthBtn />
    </div>
  </div>;
};
