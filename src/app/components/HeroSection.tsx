import React from "react";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { databases } from "@/models/server/config";
import {
  db,
  questionAttachmentBucket,
  questionCollection,
} from "@/models/name";
import { Query } from "node-appwrite";
import slugify from "@/utils/slugify";
import { storage } from "@/models/client/config";
import HeroSectionHeader from "./HeroSectionHeader";
import { sampleQuestions } from "@/lib/sampleQuestions";
import env from "@/env";

const fallbackThumbnail =
  "https://placehold.co/600x400/111827/ffffff?text=LoopStack";

export default async function HeroSection() {
  const hasAppwriteConfig = Boolean(
    env.appwrite.endpoint &&
    env.appwrite.endpoint !== "undefined" &&
    env.appwrite.projectId &&
    env.appwrite.projectId !== "undefined",
  );

  if (!hasAppwriteConfig) {
    return (
      <HeroParallax
        header={<HeroSectionHeader />}
        products={sampleQuestions.map((question) => ({
          title: question.title,
          link: question.link,
          thumbnail: fallbackThumbnail,
        }))}
      />
    );
  }

  try {
    const questions = await databases.listDocuments(db, questionCollection, [
      Query.orderDesc("$createdAt"),
      Query.limit(15),
    ]);

    return (
      <HeroParallax
        header={<HeroSectionHeader />}
        products={questions.documents.map((q) => ({
          title: q.title,
          link: `/questions/${q.$id}/${slugify(q.title)}`,
          thumbnail: q.attachmentId
            ? storage.getFilePreview(questionAttachmentBucket, q.attachmentId)
            : fallbackThumbnail,
        }))}
      />
    );
  } catch {
    return (
      <HeroParallax
        header={<HeroSectionHeader />}
        products={sampleQuestions.map((question) => ({
          title: question.title,
          link: question.link,
          thumbnail: fallbackThumbnail,
        }))}
      />
    );
  }
}
