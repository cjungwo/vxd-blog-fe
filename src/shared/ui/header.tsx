"use client";

import { MainNav, AuthBtn, AvatarBtn, Title } from '@/features';
import clsx from 'clsx';

import { useState } from 'react';

interface Props {
  className?: string;
}

export const Header = (props: Props) => {
  const [isSignIn] = useState(false);

  return <div className={clsx(props.className, 'flex justify-between items-center')}>
    <Title />
    <MainNav />
    {isSignIn ? <AvatarBtn /> : <AuthBtn />}
  </div>;
};
