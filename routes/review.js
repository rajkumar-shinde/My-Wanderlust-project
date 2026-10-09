const express = require("express");
const router = express.Router({ mergeParams: true });
const Review = require("../models/review");
const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const { reviewSchema } = require("../schema");
const { isLoggedIn } = require("../middleware.js");

const validatereview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  // console.log(error);
  if (error) {
    throw new ExpressError(401, error.details[0].message);
  } else {
    next();
  }
};
// Create review
router.post(
  "/",
  isLoggedIn,
  validatereview,
  wrapAsync(async (req, res) => {
    const id = req.params.id;
    const listing = await Listing.findById(id);
    const newReview = new Review(req.body.review);
    console.log(req.body.review);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "new review created");
    res.redirect(`/listings/${id}`);
  }),
);
// delete review route
router.delete(
  "/:reviewId",
  isLoggedIn,
  wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Review.findByIdAndDelete(reviewId);
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    req.flash("success", "review deleted");
    res.redirect(`/listings/${id}`);
  }),
);
//
module.exports = router;
