const express = require("express");
const router = express.Router({ mergeParams: true });
const Review = require("../models/review");
const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync");
const {
  isLoggedIn,
  validatereview,
  isReviewAuthor,
} = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");
// Create review
router.post(
  "/",
  isLoggedIn,
  validatereview,
  wrapAsync(reviewController.createReview),
);
// delete review route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.destroyReview),
);
//
module.exports = router;
