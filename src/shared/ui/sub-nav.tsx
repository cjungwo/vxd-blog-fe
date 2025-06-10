"use client";

import { Breadcrumb, CreatePostBtn, UpdatePostBtn } from '@/features';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

interface Props {
  className?: string;
}

export const SubNav = (props: Props) => {
  const pathname = usePathname();

  const isHomePage = pathname === "/";
  const isPostDetailPage = pathname?.startsWith("/posts/");

  return <div className={clsx(props.className, "flex items-center justify-between")}>
    <Breadcrumb pathname={pathname} />

    {isHomePage ? <CreatePostBtn /> : isPostDetailPage ? <UpdatePostBtn /> : null}
  </div>;
};
