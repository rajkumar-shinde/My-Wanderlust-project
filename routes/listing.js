const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isOwner, validatelisting } = require("../middleware.js");

// Index route - show all listings
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const alllistings = await Listing.find({});
    res.render("./listings/index.ejs", { alllistings });
  }),
);
// New route - show create form
router.get("/new", isLoggedIn, (req, res) => {
  res.render("./listings/newlisting.ejs");
});

// Show route - show one listing
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    const id = req.params.id;
    const listing = await Listing.findById(id)
      .populate({ path: "reviews", populate: { path: "author" } })
      .populate("owner");
    // console.log(listing);
    if (!listing) {
      req.flash("error", "listing does not exists");
      return res.redirect("/listings");
    }
    res.render("./listings/show.ejs", { listing });
  }),
);

// Create route - create new listing
router.post(
  "/",
  isLoggedIn,
  validatelisting,
  wrapAsync(async (req, res) => {
    if (req.body.listing.image && req.body.listing.image.url === "") {
      req.body.listing.image.url = undefined;
    }
    console.log(req.body);
    console.log(req.user);
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "new listing Created!");
    res.redirect("/listings");
  }),
);
// Edit route - show edit form
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(async (req, res) => {
    const id = req.params.id;
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "listing does not exists");
      return res.redirect("/listings");
    }
    res.render("./listings/editlisting.ejs", { listing });
  }),
);

// Update route - update listing
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  validatelisting,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findByIdAndUpdate(id, req.body.listing);
    console.log(listing);
    req.flash("success", "listing updated");
    res.redirect(`/listings/${id}`);
  }),
);

// Delete route - delete listing
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(async (req, res) => {
    const id = req.params.id;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "listing deleted");
    res.redirect("/listings");
  }),
);

module.exports = router;
