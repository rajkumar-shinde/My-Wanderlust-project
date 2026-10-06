const express = require("express");

const router = express.Router();

// GET /users
router.get("/", (req, res) => {
  res.send("All users");
});

// GET /users/:id
router.get("/:id", (req, res) => {
  res.send(`User ID: ${req.params.id}`);
});

// POST /users
router.post("/", (req, res) => {
  res.send("User created");
});

module.exports = router;
