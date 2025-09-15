# MERN Room Allocation (White Theme)

Clean, minimal room allocation app built with **MongoDB, Express, React (Vite), Node** and **Tailwind** (white UI).

## Features
- Auth (register/login) with JWT (admin / staff roles)
- Rooms: create, edit, allocate to a person/team, delete
- Bookings: create, list, delete with overlap checks
- Clean white UI with cards, inputs, and buttons

---

## Prereqs
- Node 18+
- MongoDB running locally (or Atlas URI)
- Two terminals

## 1) Backend
```bash
cd backend
cp .env.example .env
# edit .env if needed
npm install
npm run dev
```
Server runs at `http://localhost:5000`

## 2) Frontend
```bash
cd frontend
npm install
# set backend URL if different:
# echo "VITE_API_URL=http://localhost:5000/api" > .env
npm run dev
```
Frontend runs at `http://localhost:5173`

### First-time setup
1. Visit `http://localhost:5173/register` and create an **admin** user.
2. Login at `/login`. You can now create rooms, allocate, and manage bookings.

---

## Notes
- Minimal auth: token stored in `localStorage`. For production, prefer httpOnly cookies and HTTPS.
- CORS origin is controlled via `CLIENT_URL` in backend `.env`.
- Tailwind white theme lives in `src/index.css` and `tailwind.config.js`.
