
# MERN Migration

This project was migrated from Supabase to a MERN stack (MongoDB, Express, React, Node.js).

## What changed
- Removed all Supabase imports/usages in frontend files (auto-replaced with fetch calls to the new backend).
- Added a backend at `/server` with Express, Mongoose, and JWT-based auth.
- Replaced Supabase auth flows with `/auth/register`, `/auth/login`, `/auth/logout`, `/auth/me`.
- Created an example protected API at `/api/items` (replace with your own models/routes).
- Removed bolt icon references and deleted bolt asset files where found.

## Getting started

### Backend
```bash
cd server
cp .env.example .env
# update MONGO_URI and JWT_SECRET in .env
npm install
npm run dev
```

### Frontend
- Ensure your frontend dev server proxies to the backend (e.g., Vite proxy or use relative fetch like `/auth/login` while running both on same origin via reverse proxy).
- Update any remaining placeholder fetches to real endpoints/models.

## Notes
- The automated replacement converted typical Supabase calls to generic `fetch` placeholders. You may need to refine payloads and state handling in UI components.
- Search your codebase for `TODO MERN` or `fetch('/api/items')` to customize further.
