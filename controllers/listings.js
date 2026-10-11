const Listing = require("../models/listing");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res) => {
  const alllistings = await Listing.find({});
  res.render("./listings/index.ejs", { alllistings, title: "Explore" });
};

module.exports.renderNewForm = (req, res) => {
  res.render("./listings/newlisting.ejs", { title: "Host your home" });
};

module.exports.showListing = async (req, res) => {
  const id = req.params.id;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "listing does not exists");
    return res.redirect("/listings");
  }
  res.render("./listings/show.ejs", { listing, title: listing.title });
};

module.exports.createListing = async (req, res) => {
  let responce = await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
    .send();

  if (req.body.listing.image && req.body.listing.image.url === "") {
    req.body.listing.image.url = undefined;
  }

  let url = req.file.path;
  let filename = req.file.filename;
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  newListing.geometry = responce.body.features[0].geometry;
  let savedlisting = await newListing.save();
  console.log(savedlisting);
  req.flash("success", "new listing Created!");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  const id = req.params.id;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "listing does not exists");
    return res.redirect("/listings");
  }
  // FIXED: replace() naya string return karta hai, isliye variable me save karna zaroori hai
  let originalImage = listing.image.url.replace("/upload", "/upload/w_250");
  res.render("./listings/editlisting.ejs", {
    listing,
    originalImage,
    title: "Edit " + listing.title,
  });
};

module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findByIdAndUpdate(id, req.body.listing);
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save(); // FIXED: await add kiya
  }
  req.flash("success", "listing updated");
  res.redirect(`/listings/${id}`);
};

module.exports.destroy = async (req, res) => {
  const id = req.params.id;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "listing deleted");
  res.redirect("/listings");
};
