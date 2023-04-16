const express = require("express");
const {
  createReview,
  getAllReviews,
  deleteReview,
  updateReview,
  setUserTourId,
} = require("../controllers/reviewController");
const { protect } = require("../controllers/authController");
const router = express.Router();
router.post("/createreview", protect, setUserTourId, createReview);
router.post("/getallreviews", protect, getAllReviews);
router.post("/deletereview", protect, deleteReview);
router.post("/updatereview", protect, updateReview);
module.exports = router;
