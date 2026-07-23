"use client";
// register page
import { useAuthStore } from "@/store/Auth";
import Link from "next/link";
import React, { useState } from "react";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "../../../lib/utils";

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};

function RegisterPage() {
  // for creating the account and logging in the user
  const { createAccount, login } = useAuthStore();

  // for tracking when the register  of the user  is going on
  const [isLoading, setIsLoading] = useState(false);

  // for displaying the error if there are any
  const [error, setError] = useState("");

  // Email validation function
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // handel submit function
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // preventing the default behavoiur of the form
    e.preventDefault();

    // exrtracting the form data
    const formData = new FormData(e.currentTarget);
    const firstname = formData.get("firstname");
    const lastname = formData.get("lastname");
    const email = formData.get("email");
    const password = formData.get("password");

    // validating the data throiwing the error if any data is missing
    if (!firstname || !lastname || !email || !password) {
      setError("Please fill all the details");
      return;
    }

    // Validate email format
    if (!isValidEmail(email.toString())) {
      setError("Please enter a valid email address (e.g., user@example.com)");
      return;
    }

    // Validate password length
    if (password.toString().length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    // as the register process is going setting is loading to be true
    setError("");
    setIsLoading(true);

    // creating new user
    const response = await createAccount(
      `${firstname} ${lastname}`,
      email.toString(), //for TS
      password.toString(),
    );

    // if there is any error while creating the user
    if (response.error) {
      setError(() => response.error!.message);
    } else {
      // as the user is created we will also do the login of the user
      const loginResponse = await login(email.toString(), password.toString());

      //  if any error happens while logging in the user
      if (loginResponse.error) {
        setError(() => loginResponse.error!.message);
      }
    }

    // as  the register process is over setting isloading to be true
    setIsLoading(false);
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-none border border-solid border-white/30 bg-white p-4 shadow-input dark:bg-black md:rounded-2xl md:p-8">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Welcome to LoopStack
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Sign up with LoopStack if you don&apos;t have an account.
        <br /> If you already have an account,{" "}
        <Link href="/login" className="text-orange-500 hover:underline">
          login
        </Link>{" "}
        to LoopStack
      </p>

      {error && (
        <div className="mt-6 rounded-lg border border-red-300 bg-red-50 p-4 dark:border-red-700 dark:bg-red-950">
          <p className="text-sm font-medium text-red-800 dark:text-red-200">
            {error}
          </p>
        </div>
      )}
      <form className="my-8" onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input
              id="firstname"
              name="firstname"
              placeholder="Tyler"
              type="text"
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input
              id="lastname"
              name="lastname"
              placeholder="Durden"
              type="text"
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            placeholder="projectmayhem@fc.com"
            type="email"
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            placeholder="••••••••"
            type="password"
          />
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Minimum 8 characters
          </p>
        </LabelInputContainer>

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
          disabled={isLoading}
        >
          Sign up &rarr;
          <BottomGradient />
        </button>

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

        <div className="flex flex-col space-y-4">
          <button
            className="group/btn relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black shadow-input dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="button"
            disabled={isLoading}
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              Google
            </span>
            <BottomGradient />
          </button>
          <button
            className="group/btn relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black shadow-input dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="button"
            disabled={isLoading}
          >
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              GitHub
            </span>
            <BottomGradient />
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
