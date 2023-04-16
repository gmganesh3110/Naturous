const express = require("express");
const {
  createTour,
  getAllTours,
  getTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
} = require("../controllers/tourController");

const { protect, restrictTo } = require("../controllers/authController.js");
// const { createReview } = require("../controllers/reviewController");
const reviewRouter = require("./reviewRoutes.js");

const router = express.Router();
router.use("/createreview", reviewRouter);
router.post("/createtour", createTour);
router.post("/getalltours", protect, getAllTours);
router.post("/gettour", getTour);
router.post("/updatetour", updateTour);
router.post(
  "/deletetour",
  protect,
  restrictTo("admin", "lead-guide", "user"),
  deleteTour
);
router.post("/tourstats", getTourStats);
router.post("/monthlyplan", getMonthlyPlan);
router.post("/top-5-cheaptours", aliasTopTours, getAllTours);
// router.post("/createreview", protect, createReview);
module.exports = router;
