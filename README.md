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

# Folder Structure

```bash
project/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── lib/
│   ├── app.js
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── main.jsx
│   │   ├── main.css
│   │   └── App.jsx
│
└── README.md
```

---

# Environment Variables

Create a `.env` file in backend:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
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

---
