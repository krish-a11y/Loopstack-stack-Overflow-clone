"use client";

import QuestionForm from "@/components/QuestionForm";
import { useAuthStore } from "@/store/Auth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const AskQuestionPage = () => {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,145,77,0.16),_transparent_35%),linear-gradient(135deg,_rgba(20,20,20,0.95),_rgba(8,8,8,1))] px-4 pb-20 pt-28 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.35em] text-orange-400">
            Ask the community
          </p>
          <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">
            Ask a public question
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
            Share a clear problem statement, add helpful context, and make it
            easy for others to answer.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/10 p-4 shadow-2xl backdrop-blur-xl sm:p-8">
          <QuestionForm />
        </div>
      </div>
    </div>
  );
};

export default AskQuestionPage;
