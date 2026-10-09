const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const User = require("./models/user");
const listingRouter = require("./routes/listing");
const reviewRouter = require("./routes/review");
const userRouter = require("./routes/user");
// ==================== SESSION OPTIONS ====================
const sessionOptions = {
  secret: "mysecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

// ==================== EJS SETUP ====================
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", "./views");

// ==================== GENERAL MIDDLEWARE ====================
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// ==================== SESSION & FLASH ====================
app.use(session(sessionOptions));
app.use(flash());

// ==================== PASSPORT CONFIGURATION ====================
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ==================== GLOBAL LOCALS ====================
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});

// app.get("/demo", async (req, res, next) => {
//   try {
//     const demouser = new User({
//       email: "Raj@gmail.com",
//       username: "apnacollege",
//     });

//     const registereduser = await User.register(demouser, "rajkumar");
//     res.send(registereduser);
//   } catch (err) {
//     if (err.code === 11000) {
//       req.flash("error", "Email already registered!");
//       return res.redirect("/listings");
//     }
//     next(err);
//   }
// });
// ==================== DATABASE CONNECTION ====================
async function connectDB() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlst");
}
connectDB()
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });

// ==================== ROUTES ====================
app.get("/", (req, res) => {
  res.status(200).send("Wanderlust is working properly");
});

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

// ==================== ERROR HANDLING ====================
app.use((err, req, res, next) => {
  let { status = 500, message = "something wrong" } = err;
  res.status(status).render("./listings/error.ejs", { err });
  // res.status(status).send(message);
});

// ==================== SERVER ====================
app.listen(8000, () => {
  console.log("App is listening on port 8000...");
});
