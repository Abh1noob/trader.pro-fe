"use client";

import { api } from "@/app/api";
import { Button } from "@/components/button";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import { auth } from "@/lib/firebase";
import { cn } from "@/lib/utils";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      const token = await auth.currentUser?.getIdToken();
      await api.post(
        "/auth/login",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      router.push("/home");
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email and password to login
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            required
          />
        </div>

        <Button type="submit" className="w-full">
          Login
        </Button>
        <span className="relative z-50 px-2 text-white text-center text-xs">
          or continue with
        </span>
        <div
          className={cn(
            "relative inline-flex items-center justify-center whitespace-nowrap rounded-md border px-3 py-2 text-center text-sm font-medium shadow-sm transition-all duration-100 ease-in-out",
            "border-transparent",
            "text-white dark:text-gray-900",
            "bg-indigo-600 dark:bg-indigo-500",
            "hover:bg-indigo-500 dark:hover:bg-indigo-600",
            "disabled:bg-indigo-100 disabled:text-gray-400",
            "disabled:dark:bg-indigo-800 disabled:dark:text-indigo-400"
          )}
          onClick={handleGoogleSignIn}
        >
          <FcGoogle className="mr-2 h-4 w-4" />
          Login with Google
        </div>
      </div>
      <Link href={"/auth/signup"} className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <span className="underline underline-offset-4">Sign up</span>
      </Link>
    </form>
  );
}
