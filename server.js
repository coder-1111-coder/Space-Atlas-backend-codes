require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const connectDB = require("./config/db");
const logger = require("./middlewares/logger");

const authRoutes = require("./routes/authRoutes");
const bodyRoutes = require("./routes/bodyRoutes");

const app = express();

// Connect to MongoDB
connectDB(process.env.MONGO_URI);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));     // morgan used in class
app.use(logger);            // simple custom logger

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/bodies", bodyRoutes);

// Start server
app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});

