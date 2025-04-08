# Portfolio Project

A modern, full-stack portfolio application built with Next.js, Node.js, and MongoDB. This project showcases professional experiences, education, certifications, skills, and projects in an elegant and interactive way.

## 🌟 Features

- **Modern UI/UX**: Built with Next.js 14 and Tailwind CSS
- **Admin Dashboard**: Secure admin interface for content management
- **Dynamic Content**: Manage experiences, education, certifications, and skills
- **Responsive Design**: Optimized for all device sizes
- **Authentication**: Secure admin access with JWT authentication
- **Database Integration**: MongoDB for persistent data storage

## 🏗️ Project Structure

```
portfolio/
├── frontend/           # Next.js frontend application
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/           # Node.js backend application
│   ├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── package.json
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB
- npm or yarn

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file:

   ```
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file:

   ```
   PORT=3001
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ADMIN_PASSWORD=your_admin_password
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## 🔒 Admin Access

The admin dashboard is accessible at `/admin/login`. For development:

- Default password: "admin" (for development only)
- Production password: Set via ADMIN_PASSWORD environment variable

## 🛠️ Built With

- **Frontend**:

  - Next.js 14
  - React
  - Tailwind CSS
  - Axios
  - React Query

- **Backend**:
  - Node.js
  - Express
  - MongoDB
  - JWT Authentication
  - Mongoose

## 📦 Deployment

### Frontend

- The frontend can be deployed on Vercel, Netlify, or any static hosting service
- Configure environment variables in your deployment platform

### Backend

- The backend can be deployed on services like Railway, Render, or Heroku
- Set up environment variables in your deployment platform
- Ensure MongoDB connection string is properly configured

### Database

- MongoDB Atlas recommended for database hosting
- Configure network access and database user credentials
- Update connection string in backend environment variables

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
