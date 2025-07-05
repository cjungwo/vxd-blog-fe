"use client";

import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { ProfileBtn } from './ProfileBtn';
import { AuthNavBtn } from './AuthNavBtn';
import { useAuthStore } from '@/shared';

interface Props {
  className?: string;
}

export const AuthBtn = (props: Props) => {
  const [mounted, setMounted] = useState(false);
  const { accessToken } = useAuthStore();
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return <div className={clsx(props.className)} />;
  }
  
  return (
    <div className={clsx(props.className)}>
      {accessToken ? <ProfileBtn /> : <AuthNavBtn />}
    </div>
  );
};
