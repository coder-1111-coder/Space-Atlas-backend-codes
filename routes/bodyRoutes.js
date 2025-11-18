const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");
const bodyCtrl = require("../controllers/bodyController");

// Public
router.get("/", bodyCtrl.getBodies);
router.get("/:id", bodyCtrl.getBody);

// Admin
router.post("/", auth, bodyCtrl.createBody);
router.put("/:id", auth, bodyCtrl.updateBody);
router.delete("/:id", auth, bodyCtrl.deleteBody);

module.exports = router;
