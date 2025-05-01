
# EchoShop E-Commerce Platform

A full-stack e-commerce platform built with React, TypeScript, Node.js, Express, and MongoDB.

## Features

- User authentication (login/register)
- Product browsing and searching
- Shopping cart management
- Order processing
- User profile management
- Responsive design

## Tech Stack

### Frontend:
- React + TypeScript
- TailwindCSS
- Shadcn UI components
- React Router for routing
- Context API for state management
- React Query for data fetching

### Backend:
- Node.js + Express
- MongoDB with Mongoose
- JWT for authentication
- Cookie-based sessions

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB (local installation or MongoDB Atlas account)

### Installation

1. Clone the repository
```
git clone <repository-url>
cd echo-commerce
```

2. Install frontend dependencies
```
npm install
```

3. Install backend dependencies
```
cd server
npm install
```

4. Create a .env file in the server directory with the following variables:
```
PORT=5000
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
NODE_ENV=development
```

### Running the Application

1. Start the backend server:
```
cd server
npm run dev
```

2. In a new terminal, start the frontend development server:
```
npm run dev
```

3. Seed the database with initial product data (optional):
```
cd server
npm run seed
```

4. Open your browser and navigate to `http://localhost:5173`

## Folder Structure

```
echo-commerce/
├── public/           # Public assets
├── src/              # Frontend source code
│   ├── components/   # React components
│   ├── context/      # Context providers
│   ├── hooks/        # Custom hooks
│   ├── lib/          # Utility functions
│   ├── pages/        # Page components
│   ├── types/        # TypeScript definitions
├── server/           # Backend source code
│   ├── middleware/   # Express middleware
│   ├── models/       # Mongoose models
│   ├── routes/       # API routes
│   ├── index.js      # Server entry point
│   └── utils.js      # Server utilities
```

## Deployment

- Frontend: Deploy to Vercel, Netlify, or any static site host
- Backend: Deploy to Heroku, Render, or any Node.js hosting service
- Database: Use MongoDB Atlas for production database

## License

This project is licensed under the MIT License.
