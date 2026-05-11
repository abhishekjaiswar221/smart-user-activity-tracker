# Smart User Activity Tracker System

A full-stack activity tracking and analytics platform built using the MERN stack.

This project logs user activities, enforces security and replay protection rules, detects suspicious behavior, and provides real-time analytics through an interactive dashboard.

---

# Features

## Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes

## Activity Logging

- Log user actions
- Store metadata
- Store IP addresses
- Custom rate-limiting logic
- Action validation

## Replay Protection

- Reject duplicate actions within 3 seconds
- Reject requests if client/server time difference exceeds 30 seconds

## Analytics Dashboard

- Total Actions
- Most Common Action
- Most Active User
- Actions Per Minute (Last 10 Minutes)

## Suspicious Activity Detection

Detects:

- Users sending more than 20 actions in 1 minute
- Users using more than 2 IP addresses in 5 minutes

## Frontend

- Login/Register pages
- Dashboard UI
- Suspicious activity table
- Loading & error states
- Responsive design

---

# Tech Stack

## Frontend

- React
- Tailwind CSS
- Axios
- React Router
- Lucide React

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT

---

# Environment Variables

Create a `.env` file in backend:

```env
NODE_ENV=production || development
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:3000
```

Create a `.env` file in frontend:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

# Installation

## Clone Repository

```bash
git clone <your-repo-url>
```

---

# Backend Setup

```bash
cd backend
npm install
npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

---

# Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# API Endpoints

## Authentication

### Register

```http
POST /api/auth/register
```

### Login

```http
POST /api/auth/login
```

---

## Activity Logging

### Log Activity

```http
POST /api/activity
```

---

## Replay Protection

### Replay Check

```http
POST /api/activity/replay-check
```

---

## Analytics

### Get Stats

```http
GET /api/activity/stats
```

---

## Suspicious Activity

### Detect Suspicious Users

```http
GET /api/activity/suspicious
```

<!-- ---

# Security Features

- JWT authentication
- Replay attack prevention
- Custom rate limiting
- Suspicious activity detection
- IP tracking

---

# Future Improvements

- Redis-based distributed rate limiting
- WebSockets for real-time analytics
- Role-based access control
- Chart visualizations
- Docker deployment
- CI/CD pipelines

---

# Assignment Requirements Covered

- Authentication APIs
- Activity Logging
- Replay Protection
- Analytics APIs
- Suspicious Activity Detection
- React Dashboard
- JWT Middleware
- MongoDB Aggregations -->

---

# Author

Made with ❤️ by Abhishek Jaiswar
