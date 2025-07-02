"use client";

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

interface Props {
  className?: string;
}

export const SignUpForm = (props: Props) => {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch('/api/v1/auth/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa(`${email}:${password}`)}`,
      },
      body: JSON.stringify({ name }),
    })
    .then((resp) => {
      if (!resp.ok) {
        throw new Error('Failed to sign up');
      }

      return resp.json();
    })
    .then((json) => {
      if (json.data.message) {
        throw new Error(json.data.message);
      }

      if (json.status !== 201) {
        throw new Error(json.data.message);
      }

      toast.success('User signed up successfully!', {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        onClose: () => {
          setName('');
          setEmail('');
          setPassword('');
          router.push('/sign-in');
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
    <label htmlFor="name" className='w-0 h-0 opacity-0'>Name</label>
    <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="w-full border border-gray-300 rounded px-2 py-1 mb-2 text-black" required/>
      <label htmlFor="email" className='w-0 h-0 opacity-0'>Email</label>
      <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full border border-gray-300 rounded px-2 py-1 mb-2 text-black" required/>
      <label htmlFor="password" className='w-0 h-0 opacity-0'>Password</label>
      <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full border border-gray-300 rounded px-2 py-1 mb-2 text-black" required/>
      <button type="submit" className="w-full bg-blue-500 text-white mt-2 px-4 py-2 rounded">Sign Up</button>
    </form>
  </div>;
};
