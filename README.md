# 🩸 Blood Donor Finder

A full-stack web application that connects blood donors with people in need. Built with React, Node.js, and PostgreSQL.

## Features

- 🔐 User authentication (JWT)
- 👤 Donor registration and profile management
- 🔍 Search donors by blood group and location
- 📱 Responsive design
- 📋 Request history tracking

## Tech Stack

### Frontend
- React with TypeScript
- Vite for fast development
- Recoil for state management
- Tailwind CSS for styling
- Axios for API calls

### Backend
- Node.js with Express
- TypeScript
- PostgreSQL database
- Prisma ORM
- JWT for authentication
- Zod for validation

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/blood-donor-finder.git
   cd blood-donor-finder
   ```

2. Install dependencies:
   ```bash
   # Install frontend dependencies
   cd client
   npm install

   # Install backend dependencies
   cd ../server
   npm install
   ```

3. Set up the database:
   - Create a PostgreSQL database
   - Copy `.env.example` to `.env` in the server directory
   - Update the `DATABASE_URL` in `.env` with your database credentials
   - Run migrations:
     ```bash
     cd server
     npx prisma migrate dev
     ```

4. Start the development servers:
   ```bash
   # Start the backend server (from the server directory)
   npm run dev

   # Start the frontend development server (from the client directory)
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Environment Variables

### Backend (.env)
```
DATABASE_URL="postgresql://user:password@localhost:5432/blood_donor_finder"
JWT_SECRET="your-super-secret-key"
PORT=3000
```

### Frontend (.env)
```
VITE_API_URL="http://localhost:3000"
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user

### Donors
- GET `/api/donors/profile` - Get donor profile
- PUT `/api/donors/profile` - Update donor profile
- GET `/api/donors` - List all donors (with optional filters)

### Search
- GET `/api/search/donors` - Search for donors
- GET `/api/search/history` - Get request history

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 