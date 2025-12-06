# 🌌 Space Atlas

A full-stack web application for exploring celestial bodies in our Solar System. Built with React, Node.js, Express, and MongoDB.

![Space Atlas](https://img.shields.io/badge/version-2.0.0-blue.svg)
![License](https://img.shields.io/badge/license-ISC-green.svg)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Database Seeding](#database-seeding)
- [Admin Access](#admin-access)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### Public Features
- 🌍 Browse 30+ celestial bodies (planets, moons, asteroids, dwarf planets, comets)
- 🔍 Search and filter by type
- 📱 Responsive design for all devices
- 🖼️ High-quality NASA images for each celestial body
- 📖 Detailed information pages with fun facts
- 🎨 Modern, beautiful UI with smooth animations

### Admin Features
- 🔐 Secure authentication with JWT
- ➕ Create new celestial bodies
- ✏️ Edit existing entries
- 🗑️ Delete celestial bodies
- 🖼️ Manage images via URLs
- 📊 Full CRUD operations

## 🛠️ Tech Stack

### Frontend
- **React** 18.3.1 - UI library
- **React Router DOM** 7.1.1 - Client-side routing
- **Axios** 1.7.9 - HTTP client
- **Vite** 6.0.3 - Build tool

### Backend
- **Node.js** - Runtime environment
- **Express** 4.21.2 - Web framework
- **MongoDB** - Database
- **Mongoose** 8.20.0 - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Helmet** - Security headers
- **Morgan** - Logging
- **Express Rate Limit** - Rate limiting

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (v6 or higher)
- **MongoDB Atlas account** (or local MongoDB instance)
- **Git**

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd Space-Atlas-backend-codes
```

### 2. Install Backend Dependencies

```bash
npm install
```

### 3. Install Frontend Dependencies

```bash
cd frontend
npm install
cd ..
```

## ⚙️ Configuration

### 1. Create Environment File

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

### 2. Configure Environment Variables

Edit `.env` with your settings:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGO_URI=your_mongodb_connection_string

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=Admin@123
```

**Important**: 
- Replace `your_mongodb_connection_string` with your actual MongoDB Atlas URI
- Change `JWT_SECRET` to a strong random string
- Update admin credentials for production

## 🏃 Running the Application

### Development Mode

#### Start Backend Server
```bash
npm run dev
```
Backend will run on `http://localhost:5000`

#### Start Frontend Server (in a new terminal)
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:5173`

### Production Mode

#### Backend
```bash
npm start
```

#### Frontend
```bash
cd frontend
npm run build
npm run preview
```

## 🌱 Database Seeding

### Seed Celestial Bodies Data

The application comes with 30 pre-configured celestial bodies:

```bash
node seedDatabase.js
```

This will populate your database with:
- 8 Planets (Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune)
- 12 Moons (Moon, Europa, Ganymede, Callisto, Titan, Enceladus, Mimas, Io, Triton, Phobos, Deimos, Rhea)
- 4 Asteroids (Vesta, Bennu, Pallas, Hygiea)
- 3 Dwarf Planets (Pluto, Ceres, Makemake)
- 3 Comets (Halley's Comet, NEOWISE, Hale-Bopp)

### Create Admin User

```bash
npm run seed:admin
```

## 🔐 Admin Access

### Default Credentials
- **Username**: `admin`
- **Password**: `Admin@123`

**⚠️ Important**: Change these credentials in production!

### Admin Panel
Access the admin panel at: `http://localhost:5173/login`

### Admin Features
- Create new celestial bodies
- Edit existing entries
- Delete celestial bodies
- Manage images
- All fields are validated

## 📁 Project Structure

```
Space-Atlas-backend-codes/
├── config/
│   └── db.js                 # Database connection
├── controllers/
│   ├── authController.js     # Authentication logic
│   └── bodyController.js     # Celestial body CRUD
├── frontend/
│   ├── public/               # Static assets
│   └── src/
│       ├── components/       # React components
│       ├── pages/            # Page components
│       ├── services/         # API services
│       └── App.jsx           # Main app component
├── middlewares/
│   ├── authMiddleware.js     # JWT verification
│   ├── errorHandler.js       # Error handling
│   ├── requireRole.js        # Role-based access
│   └── validateBody.js       # Request validation
├── models/
│   ├── CelestialBody.js      # Celestial body schema
│   └── User.js               # User schema
├── routes/
│   ├── authRoutes.js         # Auth endpoints
│   └── bodyRoutes.js         # Celestial body endpoints
├── utils/
│   ├── asyncHandler.js       # Async error wrapper
│   └── createAdmin.js        # Admin creation script
├── .env                      # Environment variables
├── .gitignore                # Git ignore rules
├── package.json              # Dependencies
├── seedDatabase.js           # Database seeding
├── SEED_DATA.json            # Celestial bodies data
└── server.js                 # Express server
```

## 🔌 API Endpoints

### Public Endpoints

#### Get All Celestial Bodies
```http
GET /api/bodies
Query Parameters:
  - page: Page number (default: 1)
  - limit: Items per page (default: 10)
  - search: Search term
  - type: Filter by type
  - sort: Sort field (default: name)
```

#### Get Single Celestial Body
```http
GET /api/bodies/:id
```

### Protected Endpoints (Admin Only)

#### Create Celestial Body
```http
POST /api/bodies
Headers: Authorization: Bearer <token>
Body: {
  name: string (required),
  type: string (required),
  description: string (required, min 50 chars),
  imageUrl: string (required),
  discoveredBy: string (required),
  discoveryDate: string (required),
  funFact: string (required)
}
```

#### Update Celestial Body
```http
PUT /api/bodies/:id
Headers: Authorization: Bearer <token>
Body: Same as POST
```

#### Delete Celestial Body
```http
DELETE /api/bodies/:id
Headers: Authorization: Bearer <token>
```

### Authentication Endpoints

#### Login
```http
POST /api/auth/login
Body: {
  username: string,
  password: string
}
Response: {
  success: true,
  token: string,
  user: { username, role }
}
```

## 📸 Screenshots

### Home Page
Browse all celestial bodies with beautiful images and filtering options.

### Detail Page
View comprehensive information about each celestial body including:
- High-quality NASA images
- Detailed descriptions
- Discovery information
- Fun facts

### Admin Panel
Secure admin interface for managing celestial bodies.

## 🔒 Security Features

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - Bcrypt with salt rounds
- **Rate Limiting** - Prevents brute force attacks
- **Helmet** - Security headers
- **Mongo Sanitize** - Prevents NoSQL injection
- **CORS** - Configured for security
- **Input Validation** - All inputs validated

## 🌐 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Backend server port | 5000 |
| `MONGO_URI` | MongoDB connection string | Required |
| `JWT_SECRET` | Secret key for JWT | Required |
| `JWT_EXPIRE` | JWT expiration time | 7d |
| `ADMIN_USERNAME` | Admin username | admin |
| `ADMIN_PASSWORD` | Admin password | Admin@123 |

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Verify your MongoDB URI is correct
- Check if your IP is whitelisted in MongoDB Atlas
- Ensure network connectivity

### Port Already in Use
```bash
# Kill process on port 5000
npx kill-port 5000

# Or use a different port in .env
PORT=5001
```

### Frontend Not Loading
- Clear browser cache
- Check if backend is running
- Verify CORS settings

## 📝 License

This project is licensed under the ISC License.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

For questions or support, please open an issue in the repository.

## 🙏 Acknowledgments

- NASA for providing public domain images
- MongoDB Atlas for database hosting
- All contributors and users of this project

---

**Made with ❤️ for space enthusiasts**
