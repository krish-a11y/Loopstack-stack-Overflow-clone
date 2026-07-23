"use client";
// card that shows a single answer given by a user, with a link back to the question it answers
import React, { useEffect, useRef, useState } from "react";
import { BorderBeam } from "./magicui/border-beam";
import Link from "next/link";
import { Models } from "appwrite";
import slugify from "@/utils/slugify";
import convertDateToRelativeTime from "@/utils/relativeTime";

interface Answer extends Models.Document {
  content: string;
  totalVotes: number;
  question: {
    $id: string;
    title: string;
  };
}

// strips basic markdown syntax so the preview reads as plain text
function stripMarkdown(markdown: string) {
  return markdown
    .replace(/```[\s\S]*?```/g, "") // code blocks
    .replace(/`([^`]+)`/g, "$1") // inline code
    .replace(/!\[.*?\]\(.*?\)/g, "") // images
    .replace(/\[(.*?)\]\(.*?\)/g, "$1") // links
    .replace(/[#*_>~-]/g, "") // headings, emphasis, blockquote, hr markers
    .replace(/\s+/g, " ")
    .trim();
}

const AnswerCard = ({ answer }: { answer: Answer }) => {
  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.clientHeight);
    }
  }, [ref]);

  const preview = stripMarkdown(answer.content);
  const truncated =
    preview.length > 220 ? `${preview.slice(0, 220)}…` : preview;

  return (
    <div
      ref={ref}
      className="relative flex flex-col gap-4 overflow-hidden rounded-xl border border-white/20 bg-white/5 p-4 duration-200 hover:bg-white/10 sm:flex-row"
    >
      <BorderBeam size={height} duration={12} delay={9} />
      <div className="relative shrink-0 text-sm sm:text-right">
        <p>{answer.totalVotes} votes</p>
      </div>
      <div className="relative w-full">
        <Link
          href={`/questions/${answer.question.$id}/${slugify(answer.question.title)}`}
          className="text-orange-500 duration-200 hover:text-orange-600"
        >
          <h2 className="text-xl">{answer.question.title}</h2>
        </Link>
        <p className="mt-2 text-sm text-neutral-300">{truncated}</p>
        <div className="mt-3 flex items-center gap-3 text-sm">
          <span className="ml-auto">
            answered {convertDateToRelativeTime(new Date(answer.$createdAt))}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AnswerCard;
