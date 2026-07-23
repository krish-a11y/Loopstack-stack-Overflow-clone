"use client";
import { useAuthStore } from "@/store/Auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function LoginPage() {
  const { login } = useAuthStore();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      setError("Please fill in all the required details.");
      return;
    }

    setIsLoading(true);
    setError("");

    const response = await login(email.toString(), password.toString());

    if (response.error) {
      setError(response.error.message);
    } else {
      router.push("/");
    }

    setIsLoading(false);
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-none border border-solid border-white/30 bg-white p-4 shadow-input dark:bg-black md:rounded-2xl md:p-8">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Welcome back
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Sign in to continue to LoopStack.
      </p>

      {error && (
        <p className="mt-6 text-center text-sm text-red-500 dark:text-red-400">
          {error}
        </p>
      )}

      <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
        <div className="flex w-full flex-col space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            className="text-black"
            id="email"
            name="email"
            placeholder="you@example.com"
            type="email"
          />
        </div>

        <div className="flex w-full flex-col space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            className="text-black"
            id="password"
            name="password"
            placeholder="••••••••"
            type="password"
          />
        </div>

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Login"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-neutral-600 dark:text-neutral-300">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-orange-500 hover:underline">
          Create one
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;
