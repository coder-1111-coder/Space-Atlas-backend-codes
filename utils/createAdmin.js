require("dotenv").config();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const connectDB = require("../config/db");

(async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    const email = process.env.ADMIN_EMAIL;
    const pass = process.env.ADMIN_PASSWORD;

    if (!email || !pass) {
      throw new Error("Set ADMIN_EMAIL and ADMIN_PASSWORD in .env");
    }

    const exists = await User.findOne({ email });
    if (exists) {
      console.log("Admin already exists");
      return process.exit(0);
    }

    const hash = await bcrypt.hash(pass, 10);

    await User.create({
      email,
      passwordHash: hash,
      role: "admin"
    });

    console.log(" Admin created successfully");
    process.exit(0);

  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
})();
