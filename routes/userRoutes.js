const express = require("express");
const {
  getAllUsers,
  updateMe,
  deleteMe,
} = require("../controllers/userController");
const { protect } = require("../controllers/authController.js");
const router = express.Router();
router.post("/allusers", getAllUsers);
router.post("/updateme", protect, updateMe);
router.post("/deleteme", protect, deleteMe);
module.exports = router;
