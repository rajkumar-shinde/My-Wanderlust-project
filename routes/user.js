const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { isLoggedIn, saveRedirectUrl } = require("../middleware");

const userController = require("../controllers/users");

router
  .route("/signup")
  .get(userController.renderSignupForm)
  .post(wrapAsync(userController.signup));

router
  .route("/login")
  .get(userController.renderLoginForm)
  .post(
    saveRedirectUrl,
    (req, res, next) => {
      passport.authenticate("local", (err, user) => {
        if (err) return next(err);

        // Galat username ya password
        if (!user) {
          req.flash("error", "Invalid username or password");
          return req.session.save(() => res.redirect("/login"));
        }

        // Sahi login: controller.login aage ka kaam karega
        req.logIn(user, (err) => {
          if (err) return next(err);
          next();
        });
      })(req, res, next);
    },
    userController.login,
  );

router.route("/logout").get(isLoggedIn, userController.logout);

module.exports = router;
