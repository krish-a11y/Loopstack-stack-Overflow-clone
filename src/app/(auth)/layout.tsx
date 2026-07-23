"use client";
// layout which loads both the login and signin
import { useAuthStore } from "@/store/Auth";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

type childType = {
  children: React.ReactNode;
};

// it takes  the login  and register page as props
const Layout = ({ children }: childType) => {
  // extracting from the state store if the user is logged in or not
  const { sessions } = useAuthStore();
  //   for re-routing the user
  const router = useRouter();

  useEffect(() => {
    // if the user is logged in we will push him to the main page
    if (sessions) router.push("/");
  }, [sessions, router]);

  // if the user is already logged in we dont need to render the pages
  if (sessions) return null;

  //   redering the login/register pages
  return (
    <div className="min-h-screen bg-transparent">
      <div className="px-4 pb-10 pt-24 md:px-6 md:pt-28">{children}</div>
    </div>
  );
};

export default Layout;
