const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const requireRole = require("../middlewares/requireRole");
const validateBody = require("../middlewares/validateBody");
const bodyCtrl = require("../controllers/bodyController");

// Public routes
router.get("/", bodyCtrl.getBodies);
router.get("/:id", bodyCtrl.getBody);

// Admin routes (protected)
router.post(
    "/",
    auth,
    requireRole("admin"),
    validateBody,
    bodyCtrl.createBody
);

router.put(
    "/:id",
    auth,
    requireRole("admin"),
    validateBody,
    bodyCtrl.updateBody
);

router.delete(
    "/:id",
    auth,
    requireRole("admin"),
    bodyCtrl.deleteBody
);

module.exports = router;
