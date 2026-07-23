export const sampleQuestions = [
  {
    $id: "sample-1",
    $createdAt: new Date().toISOString(),
    title: "How do I optimize a Next.js app for faster initial loads?",
    content:
      "I’m building a content-heavy Next.js app and want to reduce first paint time. What are the most effective strategies for improving perceived performance?",
    tags: ["nextjs", "performance", "frontend"],
    totalVotes: 18,
    totalAnswers: 5,
    link: "/questions",
    author: {
      $id: "sample-author-1",
      name: "Ava Chen",
      reputation: 432,
    },
  },
  {
    $id: "sample-2",
    $createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    title: "What’s the best way to structure authentication in a React app?",
    content:
      "I’m deciding between using a dedicated auth provider, cookies, or a token-based flow. Which approach is easiest to maintain long-term?",
    tags: ["react", "auth", "security"],
    totalVotes: 12,
    totalAnswers: 3,
    link: "/questions",
    author: {
      $id: "sample-author-2",
      name: "Marcus Reed",
      reputation: 311,
    },
  },
  {
    $id: "sample-3",
    $createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    title:
      "How can I keep Tailwind classes easy to maintain in large projects?",
    content:
      "My component library is growing quickly, and class names are becoming hard to reason about. Are there patterns that help avoid duplication?",
    tags: ["tailwind", "design-systems", "css"],
    totalVotes: 9,
    totalAnswers: 2,
    link: "/questions",
    author: {
      $id: "sample-author-3",
      name: "Noor Patel",
      reputation: 268,
    },
  },
];
