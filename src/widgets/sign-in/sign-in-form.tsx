"use client";

import clsx from 'clsx';

interface Props {
  className?: string;
}

export const SignInForm = (props: Props) => {
  return <div className={clsx(props.className, 'flex flex-col w-1/2 mx-auto items-center justify-center')}>
    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2 p-4 w-full ">
      <label htmlFor="username" className='w-0 h-0 opacity-0'>Username</label>
      <input type="text" name="username" id="username" placeholder="Username" className="w-full border border-gray-300 rounded px-2 py-1 mb-2 text-black" />
      <label htmlFor="password" className='w-0 h-0 opacity-0'>Password</label>
      <input type="password" name="password" id="password" placeholder="Password" className="w-full border border-gray-300 rounded px-2 py-1 mb-2 text-black" />
      <button type="submit" className="w-full bg-blue-500 text-white mt-2 px-4 py-2 rounded">Sign In</button>
    </form>
  </div>;
};
