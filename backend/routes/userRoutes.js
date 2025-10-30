const express = require("express");
const router = express.Router();
const requireAuth = require("../utils/authMiddleware");

const {
  userSignUp,
  userLogin,
  getAllUsers,
} = require("../controllers/userControllers");

router.post("/signup", userSignUp);
router.post("/signin", userLogin);
router.get("/", getAllUsers);
router.get("/protected", requireAuth, (req, res) => {
  res.json({ message: "Protected data", userId: req.user.id });
});

module.exports = router;
