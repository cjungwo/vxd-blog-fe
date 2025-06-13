import { SignUpForm } from "@/widgets";
import Link from "next/link";

export default function SignUpPage() {
   return <div className="flex flex-col items-center justify-start h-screen">
      <h2 className="text-4xl font-bold mt-8 mb-4">Sign Up</h2>
      <SignUpForm />
      <p className="text-sm mt-4">Already have an account? <Link href="/sign-in">Sign In</Link></p>
   </div>;
};
