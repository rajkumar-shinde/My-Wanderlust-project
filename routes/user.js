const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { isLoggedIn, saveRedirectUrl } = require("../middleware");

router.get("/signup", (req, res) => {
  res.render("./users/signup.ejs");
});
router.post(
  "/signup",
  wrapAsync(async (req, res, next) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ email, username });
      const registereduesr = await User.register(newUser, password);
      console.log(registereduesr);
      req.login(registereduesr, (err) => {
        if (err) {
          return next(err);
        }
        req.flash("success", "welcome to wanderlust");
        res.redirect("/listings");
      });
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup");
    }
  }),
);
router.get("/login", (req, res) => {
  res.render("./users/login.ejs");
});

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  async (req, res) => {
    req.flash("success", "welcome back to wanderlust!");
    res.redirect(res.locals.redirectUrl || "/listings");
  },
);

router.get("/logout", isLoggedIn, (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You logged out successfully!");
    res.redirect("/listings");
  });
});
module.exports = router;
