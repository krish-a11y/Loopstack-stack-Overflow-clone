import Pagination from "@/components/Pagination";
import AnswerCard from "@/components/AnswerCard";
import {
  answerCollection,
  db,
  questionCollection,
  voteCollection,
} from "@/models/name";
import { databases } from "@/models/server/config";
import { Query } from "node-appwrite";
import React from "react";

const Page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ userId: string; userSlug: string }>;
  searchParams: Promise<{ page?: string }>;
}) => {
  const { userId } = await params;
  const resolvedSearchParams = await searchParams;
  resolvedSearchParams.page ||= "1";

  const queries = [
    Query.equal("authorId", userId),
    Query.orderDesc("$createdAt"),
    Query.offset((+resolvedSearchParams.page - 1) * 25),
    Query.limit(25),
  ];

  const answers = await databases.listDocuments(db, answerCollection, queries);

  answers.documents = await Promise.all(
    answers.documents.map(async (answer) => {
      const [question, upvotes, downvotes] = await Promise.all([
        databases.getDocument(db, questionCollection, answer.questionId, [
          Query.select(["title"]),
        ]),
        databases.listDocuments(db, voteCollection, [
          Query.equal("typeId", answer.$id),
          Query.equal("type", "answer"),
          Query.equal("voteStatus", "upvoted"),
          Query.limit(1), // for optimization
        ]),
        databases.listDocuments(db, voteCollection, [
          Query.equal("typeId", answer.$id),
          Query.equal("type", "answer"),
          Query.equal("voteStatus", "downvoted"),
          Query.limit(1), // for optimization
        ]),
      ]);

      return {
        ...answer,
        content: answer.content,
        totalVotes: upvotes.total - downvotes.total,
        question: {
          $id: answer.questionId,
          title: question.title,
        },
      } as any;
    }),
  );

  return (
    <div className="px-4">
      <div className="mb-4">
        <p>{answers.total} answers</p>
      </div>
      <div className="mb-4 max-w-3xl space-y-6">
        {answers.documents.map((answer) => (
          <AnswerCard key={answer.$id} answer={answer as any} />
        ))}
      </div>
      <Pagination total={answers.total} limit={25} />
    </div>
  );
};

export default Page;
