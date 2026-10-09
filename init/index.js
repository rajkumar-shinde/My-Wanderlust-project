const mongoose = require("mongoose");
const Listing = require("../models/listing");
const sampleListings = require("../init/data.js");
const User = require("../models/user");

async function connectDB() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlst");
}
connectDB()
  .then(() => {
    console.log("MongoDB connected");
    newdb();
  })
  .catch((err) => {
    console.log(err);
  });

const newdb = async () => {
  const user = await User.findOne({ username: "rajkumar" });

  if (!user) {
    throw new Error("User not found! Check your username.");
  }

  await Listing.deleteMany();
  const listingsWithOwner = sampleListings.map((listing) => ({
    ...listing,
    owner: user._id,
  }));
  await Listing.insertMany(listingsWithOwner);
  console.log("listing was saved successfully");
};
