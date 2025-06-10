import { Header, PostList, Footer } from "@/widgets";

export default async function Home() {
   return (
      <div className="min-h-screen mx-4">
         <Header className="py-4" />
         <PostList className="py-4" />
         <Footer className="py-4" />
      </div>
   );
};
