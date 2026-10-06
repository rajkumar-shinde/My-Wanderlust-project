const mongoose = require("mongoose");
const Listing = require("../models/listing");
const sampleListings = require("../init/data.js");

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
  await Listing.deleteMany();
  await Listing.insertMany(sampleListings);
  console.log("listing was saved successfully");
};
