require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");

const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");

const authRoutes = require("./routes/authRoutes");
const bodyRoutes = require("./routes/bodyRoutes");

const app = express();

// Connect to MongoDB
connectDB(process.env.MONGO_URI);

// Security Middlewares
app.use(helmet()); // Security headers
app.use(mongoSanitize()); // Prevent MongoDB injection

// Rate limiting for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // 20 requests per windowMs
  message: {
    success: false,
    message: "Too many login attempts, please try again later"
  },
  standardHeaders: true,
  legacyHeaders: false
});

// General Middlewares
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000"],
  credentials: true
}));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/bodies", bodyRoutes);

// Health check route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Space Atlas API is running",
    version: "2.0.0"
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// Centralized error handler (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

