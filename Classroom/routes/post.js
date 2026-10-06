const express = require("express");

const router = express.Router();

// GET /posts
router.get("/", (req, res) => {
  res.send("All posts");
});

// GET /posts/:id
router.get("/:id", (req, res) => {
  res.send(`Post ID: ${req.params.id}`);
});

// POST /posts
router.post("/", (req, res) => {
  res.send("Post created");
});

module.exports = router;
