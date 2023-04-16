const express = require("express");
const {
  signUp,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
} = require("../controllers/authController");
const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/forgotpassowrd", forgotPassword);
router.post("/resetpassword", resetPassword);
router.post("/updatepassword", protect, updatePassword);
module.exports = router;
