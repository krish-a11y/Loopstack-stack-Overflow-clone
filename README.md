# LoopStack

LoopStack is a modern, full-stack Q&A application built with Next.js, Appwrite, and Tailwind CSS. The platform is designed to provide a polished, developer-friendly experience for asking questions, discovering discussions, and engaging with a growing community.

## ✨ Key Features

- Modern landing experience with animated sections and a premium visual design
- Question creation and browsing flow for community discussions
- Authentication system for login and sign-up using Appwrite
- User profile pages with activity-based views
- Dynamic question cards with metadata such as votes, answers, reputation, and tags
- Responsive layout optimized for desktop and mobile devices
- Server-rendered pages and app-router architecture powered by Next.js

## 🧩 Technical Overview

LoopStack combines a React-based frontend with Appwrite services for backend functionality. The app uses Next.js App Router for page routing, server components for data-driven rendering, and client-side state management for authentication and interaction flows.

### Architecture Highlights

- Frontend: Next.js 16, React 19, TypeScript
- Styling: Tailwind CSS with custom UI components and motion effects
- Backend: Appwrite for authentication, database, and storage integration
- Data Model: Questions, answers, votes, and user profile information are organized through Appwrite collections
- UX: Animated UI elements, reusable card components, and polished page layouts

## 🛠 Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Appwrite
- Framer Motion
- Shadcn-style UI patterns

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

Then open http://localhost:3000 in your browser.

## 🔧 Environment Variables

Create a .env file in the project root and add your Appwrite configuration:

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=
NEXT_PUBLIC_APPWRITE_PROJECT_ID=
NEXT_PUBLIC_APPWRITE_DATABASE_ID=
NEXT_PUBLIC_APPWRITE_COLLECTION_ID=
```

Make sure your Appwrite project is configured for authentication, database collections, and storage buckets.

## 📦 Production Build

```bash
npm run build
```

## 🌐 Deployment

LoopStack can be deployed on Vercel, Netlify, or any platform that supports Next.js applications.

Live Demo: https://your-deploy-link-here

### Vercel Deployment

1. Push the repository to GitHub
2. Import the project into Vercel
3. Add the required environment variables
4. Deploy the application

## 🧠 Project Goals

LoopStack aims to provide a modern, scalable, and developer-friendly question-and-answer experience with a strong focus on usability, clean architecture, and polished UI.

## 🙌 Credits

Built with Next.js, Appwrite, Tailwind CSS, and a strong emphasis on modern frontend engineering.
