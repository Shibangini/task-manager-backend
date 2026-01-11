# Task Management Backend API

This is a backend REST API for a Task Management application built using Node.js, Express, and MongoDB.  
It supports user authentication using JWT and allows authenticated users to perform CRUD operations on tasks.

---

## 🚀 Features
- User registration and login with JWT authentication
- Secure password hashing using bcrypt
- Create, read, update, and delete tasks
- JWT-protected routes
- MongoDB database integration using Mongoose

---

## 🛠 Tech Stack
- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- JSON Web Tokens (JWT)
- bcryptjs

---

## 📌 API Endpoints

### Auth
- POST `/api/auth/register` – Register a new user
- POST `/api/auth/login` – Login user and get JWT token

### Tasks (JWT Protected)
- POST `/api/tasks` – Create a task
- GET `/api/tasks` – Get all tasks for logged-in user
- PUT `/api/tasks/:id` – Update a task
- DELETE `/api/tasks/:id` – Delete a task

---

## 🔐 Authentication
All task routes require a JWT token in the request header:

