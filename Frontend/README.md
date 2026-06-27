# BuildGram Frontend

A modular, strictly typed Instagram-style feed clone featuring clean component structures, isolated local state boundaries, and client-side routing. Built as part of **Assignment-2**.

## 🚀 Tech Stack
* **Framework:** React 18 (Vite)
* **Language:** TypeScript (Strictly typed, zero `any` usage)
* **Routing:** React Router (`react-router-dom`)
* **Styling:** Clean Component-level CSS / Inline Layouts

---

## 🛠️ How to Run the Code Locally

Follow these precise steps to clone, install, and run this project on your local machine:

### 1. Clone the Repository
```bash
git clone [https://github.com/my_account/buildgram.git](https://github.com/my_account/buildgram.git)
cd buildgram


npm install

npm run dev

npm run build





phase 1: Component Architecture & Routing

Separated layouts into highly modular subcomponents (Navbar, Feed, Post, PostHeader, PostImage, PostActions, PostComments, and ProfilePage).

Implemented full client-side navigation using <BrowserRouter>, <Routes>, and <Link> layout elements to block hard page refreshes.

Utilized dynamic URL pathways (/profile/:username) via the React Router useParams hook to read profiles dynamically.

Phase 2: TypeScript blueprints & Mock Database

Configured strict data typing interfaces (User, Comment, PostType) in types.ts with no fallback to the any keyword.

Constructed a simulated backend in mockData.ts featuring distinct profiles, custom bio fields, and pre-existing comments.

Phase 3: Isolated State Boundaries & Interactivity

Like Toggle: Handles custom increment and decrement loops isolated to individual post components.

Bookmark Tracker: Implemented independent post bookmark saves.

Controlled Comment Streams: Leveraged strict React state array spread utilities ([...comments, newComment]) to update post views immutably without altering reference points.