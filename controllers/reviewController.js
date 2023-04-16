const Review = require("../models/reviewModel.js");
const catchAsync = require("../utils/catchAsync.js");
const factory = require("../controllers/handlerFactory.js");
exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find();
  res.status(200).json({
    status: "success",
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.setUserTourId = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.body.id;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};
exports.createReview = factory.createOne(Review);
exports.deleteReview = factory.deleteOne(Review);
exports.updateReview = factory.updateOne(Review);
