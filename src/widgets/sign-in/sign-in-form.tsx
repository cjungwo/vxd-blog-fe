"use client";

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { baseUrl, useUserAuth } from '@/shared';

interface Props {
  className?: string;
}

export const SignInForm = (props: Props) => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAuthTokens } = useUserAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    fetch(`${baseUrl}/api/v1/auth/sign-in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa(`${email}:${password}`)}`,
      }
    })
    .then((resp) => {
      if (!resp.ok) {
        throw new Error('Failed to sign in ' + resp.status);
      }

      return resp.json();
    })
    .then((json) => {
      if (json.status !== 200) {
        throw new Error(json.data.message);
      }

      const { accessToken, refreshToken } = json.data;

      setAuthTokens({ 
        accessToken: accessToken, 
        refreshToken: refreshToken 
      });

      toast.success('User signed in successfully!', {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        onClose: () => {
          setEmail('');
          setPassword('');
          router.push('/');
        }
      });
    })
    .catch((error) => {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true
      });
    });
  };

  return <div className={clsx(props.className, 'flex flex-col w-1/2 mx-auto items-center justify-center')}>
    <ToastContainer
      position="top-right"
      autoClose={500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-4 w-full ">
      <label htmlFor="email" className='w-0 h-0 opacity-0'>Email</label>
      <input type="email" name="email" id="email" placeholder="Email" className="w-full border border-gray-300 rounded px-2 py-1 mb-2 text-black" value={email} autoComplete="current-email" onChange={(e) => setEmail(e.target.value)} />
      <label htmlFor="password" className='w-0 h-0 opacity-0'>Password</label>
      <input className="w-full border border-gray-300 rounded px-2 py-1 mb-2 text-black" type="password" name="password" id="password" placeholder="Password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit" className="w-full bg-blue-500 text-white mt-2 px-4 py-2 rounded">Sign In</button>
    </form>
  </div>;
};
