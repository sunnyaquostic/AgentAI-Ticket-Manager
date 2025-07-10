# Ticket AI Frontend

This is the frontend for the Ticket AI fullstack project, built with React, Vite, TailwindCSS, DaisyUI, and React Router.

## Features
- User authentication (signup, login, logout)
- Protected routes for authenticated users
- Role-based access (admin panel)
- Ticket creation, listing, and details view
- Responsive UI with theme toggling (light/dark mode)

## Routing Structure
- `/` — Ticket list and creation (protected)
- `/tickets/:id` — Ticket details (protected)
- `/login` — Login page
- `/signup` — Signup page
- `/admin` — Admin panel (protected, admin only)

## Authentication & Authorization
- Uses JWT tokens stored in localStorage
- `CheckAuth` component protects routes and redirects based on auth state
- Admin panel only accessible to users with `admin` role

## Theme Support
- Toggle between light and dark mode using the button in the navbar
- Theme preference is saved in localStorage

## Admin Panel
- View, search, and edit users (role and skills)
- Only accessible to admin users

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. The app will run at [http://localhost:5173](http://localhost:5173)

## Environment Variables
- Set `VITE_SERVER_URL` in a `.env` file to point to your backend API URL.

## Scripts
- `npm run dev` — Start dev server
- `npm run build` — Build for production
- `npm run preview` — Preview production build
- `npm run lint` — Lint code

---
For fullstack setup and backend API details, see the main project [README](../README.md).
