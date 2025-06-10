"use client";

import clsx from 'clsx';
import { useRouter } from 'next/navigation';

interface Props {
  className?: string;
}

export const AuthBtn = (props: Props) => {
  const router = useRouter();

  const handleSignIn = () => {
    router.push('/sign-in');
  };

  const handleSignUp = () => {
    router.push('/sign-up');
  };

  return <div className={clsx(props.className)}>
    <div>
      <button onClick={handleSignIn}>Sign In</button>
      <span className="mx-2">/</span>
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  </div>;
};
