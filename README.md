# LoopStack 🔁

**LoopStack** is a modern, full-stack Q&A application inspired by Stack Overflow — built with **Next.js**, **Appwrite**, and **Tailwind CSS**. It offers a polished, developer-friendly experience for asking questions, discovering discussions, and engaging with a growing community.

**🔗 Live Demo:** [ ADD DEPLOYMENT LINK HERE ]

---

## Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture Overview](#-architecture-overview)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Appwrite Setup](#-appwrite-setup)
- [Available Scripts](#-available-scripts)
- [Production Build](#-production-build)
- [Deployment](#-deployment)
- [Project Goals](#-project-goals)
- [Contributing](#-contributing)
- [License](#-license)
- [Credits](#-credits)

---

## ✨ Features

- 🎨 Modern landing experience with animated sections and a premium visual design
- ❓ Question creation and browsing flow for community discussions
- 🔐 Authentication system for login and sign-up powered by Appwrite
- 👤 User profile pages with activity-based views
- 🏷️ Dynamic question cards with metadata such as votes, answers, reputation, and tags
- 📱 Responsive layout optimized for desktop and mobile devices
- ⚡ Server-rendered pages and app-router architecture powered by Next.js

---

## 🛠 Tech Stack

| Category | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| UI Library | [React 19](https://react.dev/) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| Backend / BaaS | [Appwrite](https://appwrite.io/) (Auth, Database, Storage) |
| Animations | [Framer Motion](https://www.framer.com/motion/) |
| UI Components | Shadcn-style UI patterns |
| Linting | ESLint |

---

## 🧩 Architecture Overview

LoopStack combines a React-based frontend with Appwrite services for backend functionality:

- **Frontend:** Next.js 16 App Router with server components for data-driven rendering and client-side state management for authentication and interaction flows.
- **Backend:** Appwrite handles authentication, database collections, and file storage.
- **Data Model:** Questions, answers, votes, and user profile information are organized through Appwrite collections.
- **UX:** Animated UI elements, reusable card components, and polished, responsive page layouts.

---

## 📁 Project Structure

```
Loopstack-stack-Overflow-clone/
├── public/                 # Static assets (images, icons, etc.)
├── src/                    # Application source code
│   ├── app/                # Next.js App Router pages & layouts
│   ├── components/         # Reusable UI components
│   ├── lib/                # Appwrite client & utility functions
│   └── ...
├── components.json         # Shadcn UI configuration
├── eslint.config.mjs       # ESLint configuration
├── next.config.ts          # Next.js configuration
├── postcss.config.mjs      # PostCSS configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Project dependencies & scripts
└── README.md
```

> Note: Update this tree if the actual `src/` subfolders differ from the above.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm (or yarn/pnpm)
- An [Appwrite](https://appwrite.io/) project (cloud or self-hosted)

### 1. Clone the repository

```bash
git clone https://github.com/krish-a11y/Loopstack-stack-Overflow-clone.git
cd Loopstack-stack-Overflow-clone
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Set up your `.env` file as described in [Environment Variables](#-environment-variables) below.

### 4. Run the development server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser to see the app running.

---

## 🔧 Environment Variables

Create a `.env` file in the project root and add your Appwrite configuration:

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=
NEXT_PUBLIC_APPWRITE_PROJECT_ID=
NEXT_PUBLIC_APPWRITE_DATABASE_ID=
NEXT_PUBLIC_APPWRITE_COLLECTION_ID=
```

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_APPWRITE_ENDPOINT` | The URL of your Appwrite API endpoint |
| `NEXT_PUBLIC_APPWRITE_PROJECT_ID` | Your Appwrite project ID |
| `NEXT_PUBLIC_APPWRITE_DATABASE_ID` | The database ID used to store app data |
| `NEXT_PUBLIC_APPWRITE_COLLECTION_ID` | The collection ID used for questions/answers data |

---

## 🗄️ Appwrite Setup

Make sure your Appwrite project is configured with:

1. **Authentication** – Email/password (or your preferred method) enabled for login and sign-up.
2. **Database & Collections** – Collections created for questions, answers, votes, and user profiles, matching the schema expected by the app.
3. **Storage Buckets** – A storage bucket for any user-uploaded assets (e.g., avatars, attachments).
4. **Platform Settings** – Your local (`http://localhost:3000`) and production domains added under Appwrite's allowed platforms/origins.

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the development server |
| `npm run build` | Creates an optimized production build |
| `npm run start` | Runs the production build locally |
| `npm run lint` | Runs ESLint checks across the project |

---

## 📦 Production Build

```bash
npm run build
npm run start
```

---

## 🌐 Deployment

LoopStack can be deployed on [Vercel](https://loopstack-stack-overflow-clone.vercel.app/)

**🔗 Live Demo:** https://loopstack-stack-overflow-clone.vercel.app/

---

## 🧠 Project Goals

LoopStack aims to provide a modern, scalable, and developer-friendly question-and-answer experience with a strong focus on usability, clean architecture, and polished UI.

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "Add your feature"`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

---

## 🙌 Credits

Built with Next.js, Appwrite, Tailwind CSS, and a strong emphasis on modern frontend engineering.