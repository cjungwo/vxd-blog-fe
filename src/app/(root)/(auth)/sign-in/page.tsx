import { SignInForm } from "@/widgets";
import Link from "next/link";

export default function SignInPage() {
   return <div className="flex flex-col items-center justify-start h-screen">
      <h2 className="text-4xl font-bold mt-8 mb-4">Sign In</h2>
      <SignInForm />
      <p className="text-sm mt-4">Don&apos;t have an account? <Link href="/sign-up">Sign Up</Link></p>
   </div>;
};
