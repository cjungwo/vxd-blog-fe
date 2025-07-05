"use client";

import { PostList } from "@/widgets";
import { SubNav } from "@/widgets";
import { checkAuth } from "@/shared";
import { useEffect } from "react";

export default function Home() {
   useEffect(() => {
      checkAuth();
   }, []);

   return (
      <>
         <SubNav className="py-4" />
         <PostList />
      </>
   );
};
