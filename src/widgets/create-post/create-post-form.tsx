"use client";

import { CreatePostDto } from '@/entities';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  className?: string;
}

export const CreatePostForm = (props: Props) => {
  const router = useRouter();

  const user = "Unknown Author";
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    if (!title.trim() || !content.trim()) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [title, content]);
  

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const post: CreatePostDto = {
      title,
      content,
      author: user
    };

    fetch('/api/v1/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    })
    .then((resp) => {
      if (!resp.ok) {
        throw new Error('Failed to create post');
      }
      return resp.json();
    })
    .then(() => {
      toast.success('Post created successfully!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClose: () => {
          setTitle('');
          setContent('');
          setIsValid(false);
          router.push('/');
        }
      });
    })
    .catch(() => {
      toast.error('Error creating post. Please try again.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    });
  }

  return <div className={clsx(props.className, 'flex flex-col items-center gap-4 my-8')}>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    <h2 className="text-2xl font-bold mb-4">Create Post</h2>
    <form className="w-3/4 border border-gray-200 p-8 rounded-md" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block mb-2 text-lg text-white" htmlFor="title">Title</label>
        <input type="text" id="title" className="border w-full text-black border-gray-300 rounded-md p-2" value={title} onChange={(e) => setTitle(e.target.value)}/>
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-lg text-white" htmlFor="content">Content</label>
        <textarea id="content" className="border w-full text-black border-gray-300 rounded-md p-2" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
      </div>
      <div className="flex justify-end">
        <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2" onClick={() => router.back()}>Cancel</button>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md" disabled={!isValid}>Create</button>
      </div>
    </form>
  </div>;
};
