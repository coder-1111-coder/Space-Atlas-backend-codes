# 🌌 Space Atlas - Full Stack Application

A modern, secure, and feature-rich full-stack application for exploring and managing celestial bodies. Built with Node.js, Express, MongoDB, and React.

## ✨ Features

### Backend
- ✅ **Hardened Security**: Helmet, MongoDB sanitization, rate limiting
- ✅ **Centralized Error Handling**: Consistent error responses
- ✅ **JWT Authentication**: Secure admin login
- ✅ **Role-Based Authorization**: Admin-only routes
- ✅ **Joi Validation**: Comprehensive input validation
- ✅ **Enhanced Mongoose Schemas**: Timestamps, slugs, text search indexes
- ✅ **Advanced CRUD**: Pagination, search, filters, sorting
- ✅ **ID or Slug Lookup**: Flexible resource identification

### Frontend
- ✅ **Modern React SPA**: Built with Vite
- ✅ **Beautiful UI**: Deep space theme with gradients and animations
- ✅ **Responsive Design**: Mobile-first approach
- ✅ **Advanced Filtering**: Search, type filter, sorting
- ✅ **Pagination**: Efficient data loading
- ✅ **Admin Dashboard**: Full CRUD operations
- ✅ **Service Layer**: Centralized API calls with auto token injection
- ✅ **SEO Optimized**: Proper meta tags and semantic HTML

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (running locally or remote)

### Backend Setup

1. **Navigate to the backend directory**:
   ```bash
   cd space-atlas
   ```

2. **Install dependencies** (already done):
   ```bash
   npm install
   ```

3. **Environment variables** (already configured in `.env`):
   ```
   PORT=4000
   MONGO_URI=mongodb://localhost:27017/spaceatlas
   JWT_SECRET=myjwtsecret
   ADMIN_EMAIL=admin@space.com
   ADMIN_PASSWORD=Admin@123
   ```

4. **Create admin user**:
   ```bash
   node utils/createAdmin.js
   ```

5. **Start the backend server**:
   ```bash
   npm start
   ```

   Backend will run on: `http://localhost:4000`

### Frontend Setup

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies** (already done):
   ```bash
   npm install
   ```

3. **Environment variables** (already configured in `.env`):
   ```
   VITE_API_URL=http://localhost:4000/api
   ```

4. **Start the frontend dev server**:
   ```bash
   npm run dev
   ```

   Frontend will run on: `http://localhost:5173`

## 📁 Project Structure

### Backend
```
space-atlas/
├── config/
│   └── db.js                 # MongoDB connection & seed data
├── controllers/
│   ├── authController.js     # Login logic
│   └── bodyController.js     # CRUD operations
├── middlewares/
│   ├── authMiddleware.js     # JWT verification
│   ├── requireRole.js        # Role-based auth
│   ├── validation.js         # Joi schemas
│   ├── errorHandler.js       # Centralized error handler
│   └── logger.js             # Request logger
├── models/
│   ├── CelestialBody.js      # Enhanced schema with slugs
│   └── User.js               # User schema
├── routes/
│   ├── authRoutes.js         # Auth endpoints
│   └── bodyRoutes.js         # Body endpoints
├── utils/
│   ├── asyncHandler.js       # Async wrapper
│   └── createAdmin.js        # Admin seeder
├── .env                      # Environment variables
├── package.json
└── server.js                 # Entry point
```

### Frontend
```
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx        # Navigation bar
│   │   ├── Navbar.css
│   │   ├── BodyCard.jsx      # Celestial body card
│   │   └── BodyCard.css
│   ├── pages/
│   │   ├── Home.jsx          # Home page with filters
│   │   ├── Home.css
│   │   ├── Detail.jsx        # Body detail page
│   │   ├── Detail.css
│   │   ├── Login.jsx         # Admin login
│   │   ├── Login.css
│   │   ├── Admin.jsx         # Admin dashboard
│   │   └── Admin.css
│   ├── services/
│   │   └── api.js            # API service layer
│   ├── App.jsx               # Main app component
│   ├── App.css
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles & theme
├── .env                      # Environment variables
├── index.html                # HTML template
├── package.json
└── vite.config.js
```

## 🔐 API Endpoints

### Public Routes
- `GET /` - Health check
- `GET /api/bodies` - Get all bodies (with pagination, search, filters)
- `GET /api/bodies/:idOrSlug` - Get single body by ID or slug
- `POST /api/auth/login` - Admin login

### Protected Routes (Admin Only)
- `POST /api/bodies` - Create new body
- `PUT /api/bodies/:idOrSlug` - Update body
- `DELETE /api/bodies/:idOrSlug` - Delete body

### Query Parameters for GET /api/bodies
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `search` - Text search in name and description
- `type` - Filter by type (Planet, Moon, Asteroid, Comet, Dwarf Planet, Other)
- `sort` - Sort field (e.g., `-createdAt`, `name`)

## 🎨 Frontend Pages

1. **Home** (`/`) - Browse all celestial bodies with filters and pagination
2. **Detail** (`/body/:idOrSlug`) - View detailed information about a body
3. **Login** (`/login`) - Admin authentication
4. **Admin Dashboard** (`/admin`) - Manage celestial bodies (CRUD)

## 🔑 Default Admin Credentials

- **Email**: `admin@space.com`
- **Password**: `Admin@123`

## 🛡️ Security Features

- **Helmet**: Security headers
- **MongoDB Sanitization**: Prevents NoSQL injection
- **Rate Limiting**: 5 login attempts per 15 minutes
- **JWT Authentication**: Secure token-based auth
- **Input Validation**: Joi schemas for all inputs
- **Error Handling**: No sensitive data leakage

## 🎯 Key Technologies

### Backend
- Node.js & Express
- MongoDB & Mongoose
- JWT for authentication
- Joi for validation
- Helmet, express-mongo-sanitize, express-rate-limit
- Slugify for URL-friendly identifiers

### Frontend
- React 18
- React Router v6
- Axios for API calls
- Vite for build tooling
- Modern CSS with custom properties
- Google Fonts (Inter)

## 📝 Development Scripts

### Backend
```bash
npm start          # Start server
node utils/createAdmin.js  # Create admin user
```

### Frontend
```bash
npm run dev        # Start dev server
npm run build      # Build for production
npm run preview    # Preview production build
```

## 🌟 Design Highlights

- **Deep Space Theme**: Dark mode with cosmic gradients
- **Glassmorphism**: Frosted glass effects on navbar
- **Smooth Animations**: Fade-in, slide-in, hover effects
- **Type-Specific Colors**: Each celestial body type has unique badge colors
- **Responsive Grid**: Auto-adjusting layouts for all screen sizes
- **Premium Feel**: Shadows, gradients, and micro-interactions

## 📊 Data Model

### CelestialBody
```javascript
{
  name: String (required, max 200 chars),
  slug: String (unique, auto-generated),
  type: Enum (Planet, Moon, Asteroid, Comet, Dwarf Planet, Other),
  description: String (required, 10-2000 chars),
  discoveryDate: Date (optional),
  discoveredBy: String (optional, max 200 chars),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

### User
```javascript
{
  email: String (unique, required),
  passwordHash: String (required),
  role: String (default: "admin")
}
```

## 🔄 Workflow

1. **Start MongoDB** (if not running)
2. **Start Backend**: `npm start` in root directory
3. **Create Admin**: `node utils/createAdmin.js` (first time only)
4. **Start Frontend**: `npm run dev` in frontend directory
5. **Access App**: Open `http://localhost:5173`
6. **Login**: Use default credentials to access admin dashboard

## 🎓 Learning Resources

This project demonstrates:
- RESTful API design
- JWT authentication & authorization
- MongoDB schema design with indexes
- Input validation & sanitization
- Error handling patterns
- React component architecture
- State management in React
- API service layer pattern
- CSS custom properties & theming
- Responsive design principles

## 📄 License

MIT

## 👨‍💻 Author

Built with ❤️ by SpaceAtlas-Refactor-AI

---

**Enjoy exploring the cosmos! 🚀✨**
