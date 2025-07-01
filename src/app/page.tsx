'use client';

import { PostList } from "@/widgets";
import { SubNav } from "@/widgets";

export default function Home() {
   return (
      <>
         <SubNav className="py-4" />
         <PostList />
      </>
   );
};
