# Task Management Backend API

This is a backend REST API for a Task Management application built using Node.js, Express, and MongoDB.  
The application supports user authentication using JWT and allows authenticated users to perform CRUD operations on tasks.

---

## 🚀 Features

- User registration and login
- Secure password hashing using bcrypt
- JWT-based authentication and authorization
- Create, read, update, and delete tasks
- Each user can access only their own tasks
- MongoDB database integration using Mongoose

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- JSON Web Tokens (JWT)
- bcryptjs
- dotenv
- cors

---

## 📌 API Endpoints

### Authentication APIs

#### Register User
```POST /api/auth/register```
Request Body:
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
```
#### Login User
```POST /api/auth/login```
Request Body:
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```
Response:
```json
{
  "message": "Login successful",
  "token": "<JWT_TOKEN>"
}
```
