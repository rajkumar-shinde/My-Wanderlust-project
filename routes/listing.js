const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isOwner, validatelisting } = require("../middleware.js");
const listingController = require("../controllers/listings");

const multer = require("multer");
const { storage } = require("../CloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  // Index route - show all listings->
  .get(wrapAsync(listingController.index))
  // Create route - create new listing->
  .post(
    isLoggedIn,
    upload.single("listing[image][url]"),
    validatelisting,
    wrapAsync(listingController.createListing),
  );

router
  .route("/new")
  // New route - show create form
  .get(isLoggedIn, listingController.renderNewForm);

router
  .route("/:id")
  // Show route - show one listing
  .get(wrapAsync(listingController.showListing))
  // Update route - update listing
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image][url]"),

    validatelisting,
    wrapAsync(listingController.updateListing),
  )
  // Delete route - delete listing
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroy));

router
  .route("/:id/edit")
  // Edit route - show edit form
  .get(isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;
