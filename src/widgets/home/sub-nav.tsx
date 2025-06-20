"use client";

import { Breadcrumb, CreatePostBtn } from '@/features';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

interface Props {
  className?: string;
  title?: string;
}

export const SubNav = (props: Props) => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return <div className={clsx(props.className, "flex items-center justify-between")}>
    <Breadcrumb pathname={pathname} title={props.title} />

    {isHomePage ? <CreatePostBtn /> : null}
  </div>;
};
