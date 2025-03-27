# CargoTrack

CargoTrack is a comprehensive fleet management and cargo delivery tracking platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and TypeScript. The platform helps businesses efficiently manage their cargo loading/unloading operations and track fleet operating costs.

## Features

- **Cargo Management**
    - Track cargo loading and unloading operations
    - Real-time cargo status monitoring
    - Cargo history and analytics
    - Automated cargo tracking system

- **Fleet Operations**
    - Vehicle tracking and management
    - Route optimization
    - Driver management
    - Maintenance scheduling

- **Cost Management**
    - Operating cost tracking
    - Fuel consumption monitoring
    - Maintenance cost analysis
    - Cost reporting and analytics

## Tech Stack

- **Frontend**
    - React.js with TypeScript
    - Material-UI for components
    - Redux for state management
    - React Router for navigation

- **Backend**
    - Node.js with Express.js
    - TypeScript
    - MongoDB with Mongoose
    - JWT for authentication

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/i4104xNightOwl/cargotrack.git
```

2. Install dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables
```bash
# Backend (.env)
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000

# Frontend (.env)
REACT_APP_API_URL=http://localhost:5000
```

4. Start the development servers
```bash
# Start backend server
cd backend
npm run dev

# Start frontend server
cd frontend
npm start
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
