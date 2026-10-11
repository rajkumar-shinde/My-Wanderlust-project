const User = require("../models/user");

module.exports.renderSignupForm = (req, res) => {
  res.render("./users/signup.ejs");
};

module.exports.signup = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;
    email = (email || "").trim();
    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(email)) {
      req.flash(
        "error",
        "Please enter a valid Gmail address ending with @gmail.com.",
      );
      return res.redirect("/signup");
    }

    // Validate username
    if (!/^[a-zA-Z0-9_]{3,20}$/.test(username || "")) {
      req.flash(
        "error",
        "Username must be 3–20 characters long and contain at least one letter. Only letters, numbers, and underscores (_) are allowed. Spaces and special characters are not allowed.",
      );
      return res.redirect("/signup");
    }

    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }

      req.flash("success", "Welcome to WanderLust!");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.render("./users/login.ejs");
};

module.exports.login = async (req, res) => {
  req.flash("success", "welcome back to wanderlust!");
  res.redirect(res.locals.redirectUrl || "/listings");
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You logged out successfully!");
    res.redirect("/listings");
  });
};
