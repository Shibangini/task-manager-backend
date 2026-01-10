# Task Manager Backend

A simple Node.js + Express backend for a Task Management mobile application.

## Features
- User registration and login with JWT
- Protected task CRUD (create/read/update/delete)
- Input validation and basic error handling

## Tech
- Node.js, Express
- MongoDB with Mongoose
- JWT auth

## Environment
Copy `.env.example` to `.env` and fill in values.

## Scripts
- `npm run dev` — Start server with nodemon
- `npm start` — Start server
- `npm test` — Run tests (if configured)

## API
Auth:
- POST `/api/auth/register` { name, email, password }
- POST `/api/auth/login` { email, password }

Tasks (protected):
- POST `/api/tasks` { title, description }
- GET `/api/tasks`
- PUT `/api/tasks/:id` { title?, description?, status? }
- DELETE `/api/tasks/:id`

## Notes
- Passwords are hashed with bcrypt
- JWT token required in `Authorization: Bearer <token>` header for task routes

