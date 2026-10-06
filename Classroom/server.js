const express = require("express");
const app = express();
const userRouter = require("./routes/user");
const postRouter = require("./routes/post");
const session = require("express-session");
const flash = require("connect-flash");

app.set("view engine", "ejs");
app.set("views", "./views");
const sessionOptions = {
  secret: "mysecretcode",
  resave: false,
  saveUninitialized: true,
};
app.use(session(sessionOptions));
app.use(flash());
app.use((req, res, next) => {
  res.locals.successMsg = req.flash("success");
  next();
});
app.get("/register", (req, res) => {
  const { name = "anonymous" } = req.query;
  req.session.name = name;
  req.flash("success", "user registerd successfully");
  res.redirect("/hello");
});
app.get("/hello", (req, res) => {
  // res.send(`my name is ${req.session.name}`);
  res.render("page.ejs", { name: req.session.name });
});

// app.get("/requestcount", (req, res) => {
//   if (req.session.count) {
//     req.session.count++;
//   } else {
//     req.session.count = 1;
//   }
//   res.send(`the count is ${req.session.count}`);
// });
// app.get("/test", (req, res) => {
//   res.send("done");
// });

app.get("/", (req, res) => {
  res.send("root");
});

app.listen(3000, () => {
  console.log("Server is running on port 8000");
});
