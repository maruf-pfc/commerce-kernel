# 🛒 commerce-kernel

> Powering modern commerce from the core.

A production-grade full-stack MERN e-commerce platform with admin and customer modules. Built using React, TypeScript, Node.js, Express, MongoDB, and Tailwind CSS.

## 🚀 Features

### 🔐 Authentication

- Secure authentication system
- Role-based access (Admin / Customer)

### 🧑‍💼 Admin Panel

- Product management
- Category management
- Promo code system
- Order management
- Dashboard & analytics
- Homepage/banner control

### 🛍️ Customer Features

- Product browsing
- Product details page
- Wishlist system
- Cart & checkout flow
- Address management
- Order history & returns

## ⚙️ Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB (Mongoose)
- Zod (validation)
- Bun runtime

### Frontend

- React
- Vite
- TypeScript
- Tailwind CSS

## 📂 Project Structure

```txt
commerce-kernel/
├── client/        # Frontend (React + Vite)
├── server/        # Backend (Express + MongoDB)
├── docs/          # Documentation / screenshots
```

## 🧪 Backend Setup

```bash
cd server
bun install
```

### Environment Variables

Create a `.env` file:

```txt
PORT=5000
MONGO_URI=your_mongodb_connection_string
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

## ▶️ Run Server

```bash
bun run dev
```

## ❤️ Health Check

```txt
GET /health
```

Response:

```json
{
  "status": "success",
  "data": {
    "message": "Server is healthy"
  }
}
```

## 🧱 Architecture Highlights

- Centralized error handling
- Custom `AppError` class
- Async handler wrapper
- Standardized API response format
- Modular and scalable structure

## 📌 License

MIT License
