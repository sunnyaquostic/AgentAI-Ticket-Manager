# Agent AI Fullstack Project

## Overview
A fullstack web application featuring a React frontend (with Vite, TailwindCSS, DaisyUI) and a Node.js/Express backend (with MongoDB, JWT authentication, and Inngest event handling). This project provides user authentication, ticket management, and event-driven workflows.

---

## Features
- User registration, login, and authentication
- Ticket creation and management
- Protected API endpoints
- Event-driven backend logic with Inngest
- Modern, responsive frontend UI

---

## Project Structure
```
agent-ai-fullstack/
├── frontend/   # React + Vite app
├── backend/    # Node.js/Express API
├── README.md   # Project documentation
```

---

## Tech Stack
- **Frontend:** React, Vite, TailwindCSS, DaisyUI, React Router
- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT, Inngest

---

## Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd agent-ai-fullstack
```

### 2. Setup Backend
```bash
cd backend
npm install
# Create a config/config.env file with your environment variables (see below)
npm run dev
```

#### Example `config/config.env`:
```
PORT=3001
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-secret>
```

### 3. Setup Frontend
```bash
cd ../frontend
npm install
npm run dev
```

---

## Usage
- Backend runs on [http://localhost:3001](http://localhost:3001) by default
- Frontend runs on [http://localhost:5173](http://localhost:5173) by default (Vite default)

---

## API Endpoints

### Auth & User
- `POST /api/v1/signup` — Register new user
- `POST /api/v1/login` — User login
- `POST /api/v1/logout` — User logout
- `POST /api/v1/update-user` — Update user (auth required)
- `POST /api/v1/users` — Get user (auth required)

### Tickets
- `GET /api/v1/tickets` — List tickets (auth required)
- `POST /api/v1/tickets` — Create ticket (auth required)
- `GET /api/v1/tickets/:id` — Get ticket by ID (auth required)

---

## Development Scripts

### Backend
- `npm run dev` — Start backend with nodemon
- `npm run inngest-dev` — Start Inngest CLI for event handling

### Frontend
- `npm run dev` — Start frontend dev server
- `npm run build` — Build frontend for production
- `npm run preview` — Preview production build
- `npm run lint` — Lint code

---

## License
This project is licensed under the ISC License.

---

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## Contact
For questions or support, please contact the project maintainer. #