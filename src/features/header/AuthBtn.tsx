"use client";

import clsx from 'clsx';
import { ProfileBtn } from './ProfileBtn';
import { AuthNavBtn } from './AuthNavBtn';
import { useUserAuth } from '@/shared';

interface Props {
  className?: string;
}

export const AuthBtn = (props: Props) => {
  const { accessToken } = useUserAuth();
  
  return <div className={clsx(props.className)}>
    {accessToken ? <ProfileBtn /> : <AuthNavBtn />}
  </div>;
};
