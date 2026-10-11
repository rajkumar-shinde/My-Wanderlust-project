const User = require("../models/user");

// Flash set karne ke baad session save karke hi redirect karo
const flashAndRedirect = (req, res, type, message, url) => {
  req.flash(type, message);
  req.session.save(() => res.redirect(url));
};

module.exports.renderSignupForm = (req, res) => {
  res.render("./users/signup.ejs", { title: "Sign Up" });
};

module.exports.signup = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;
    email = (email || "").trim();

    // Validate email
    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(email)) {
      return flashAndRedirect(
        req,
        res,
        "error",
        "Please enter a valid Gmail address ending with @gmail.com.",
        "/signup",
      );
    }

    // Validate username
    if (!/^[a-zA-Z0-9_]{3,20}$/.test(username || "")) {
      return flashAndRedirect(
        req,
        res,
        "error",
        "Username must be 3-20 characters long. Only letters, numbers, and underscores (_) are allowed.",
        "/signup",
      );
    }

    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      flashAndRedirect(
        req,
        res,
        "success",
        "Welcome to WanderLust!",
        "/listings",
      );
    });
  } catch (e) {
    flashAndRedirect(req, res, "error", e.message, "/signup");
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.render("./users/login.ejs", { title: "Log In" });
};

module.exports.login = (req, res) => {
  flashAndRedirect(
    req,
    res,
    "success",
    "Welcome back to WanderLust!",
    res.locals.redirectUrl || "/listings",
  );
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    flashAndRedirect(
      req,
      res,
      "success",
      "You logged out successfully!",
      "/listings",
    );
  });
};
