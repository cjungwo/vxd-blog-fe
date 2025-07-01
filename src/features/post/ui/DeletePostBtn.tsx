"use client";

import { baseUrl } from "@/shared";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useUserAuth } from "@/shared";

interface Props {
  className?: string;
  postId: string;
}

export const DeletePostBtn = (props: Props) => {
  const router = useRouter();
  const { accessToken } = useUserAuth();

  const handleDelete = () => {
    fetch(`${baseUrl}/api/v1/posts/${props.postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    })
    .then(response => response.json())
    .then((json) => {
      if (json.status !== 200) {
        throw new Error(json.data.message);
      }

      router.push('/');
    })
    .catch(error => {
      console.error('Error deleting post:', error);
      throw error;
    });
  };

  return <div className={clsx(props.className)}>
    <button onClick={handleDelete}>Delete</button>
  </div>;
};