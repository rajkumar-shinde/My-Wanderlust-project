require("dotenv").config(); // Load environment variables

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const ExpressError = require("./utils/ExpressError");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const { MongoStore } = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");

// Database URL
const dburl = process.env.ATLAS_URL;

// Models and routes
const User = require("./models/user");
const listingRouter = require("./routes/listing");
const reviewRouter = require("./routes/review");
const userRouter = require("./routes/user");

const store = MongoStore.create({
  mongoUrl: dburl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", (err) => {
  console.log("error in MONGO_SESSION_STORE", err);
});
// Session options
const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

// EJS setup
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", "./views");

// General middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// Session and flash
app.use(session(sessionOptions));
app.use(flash());

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Global locals
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});

// Database connection
async function connectDB() {
  await mongoose.connect(dburl);
}

connectDB()
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });

// Routes
app.get("/", (req, res) => {
  res.render("listings/home.ejs");
});

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

// Error handling
app.all("/{*splat}", (req, res, next) => {
  next(new ExpressError(404, "Page not Found!"));
});

app.use((err, req, res, next) => {
  let { status = 500, message = "something wrong" } = err;
  res.status(status).render("./listings/error.ejs", { err });
  // res.status(status).send(message);
});

// Server
app.listen(8000, () => {
  console.log("App is listening on port 8000...");
});

// Demo route
// app.get("/demo", async (req, res, next) => {
//   try {
//     const demouser = new User({
//       email: "Raj@gmail.com",
//       username: "apnacollege",
//     });
//
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
