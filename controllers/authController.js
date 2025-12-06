const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");

/**
 * @route   POST /api/auth/login
 * @desc    Login admin and return JWT token
 * @access  Public
 */
exports.login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  // Validation
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Username and password are required"
    });
  }

  // Verify credentials against environment variables
  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials"
    });
  }

  // Generate JWT token
  const token = jwt.sign(
    { username, role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({
    success: true,
    message: "Login successful",
    token,
    user: {
      username,
      role: "admin"
    }
  });
});
