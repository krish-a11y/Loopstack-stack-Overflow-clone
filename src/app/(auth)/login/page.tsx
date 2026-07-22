"use client";
import { useAuthStore } from "@/store/Auth";
import React, { useState } from "react";

function page() {
  const { login } = useAuthStore();

  // for tracking when the login of the user  is going on
  const [isLoading, setIsLoading] = useState(false);

  // for displaying the error if there are any
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      setError(() => "enter all the detials that are required");
      return;
    }

    setIsLoading(true);
    setError("");

    const response = await login(email.toString(), password.toString());
    if (response.error) {
      setError(() => response.error!.message);
    }

    setIsLoading(false);
  };
  return <div>page</div>;
}

export default page;
