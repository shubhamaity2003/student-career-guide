const express = require("express");
const router = express.Router();

const careers = require("../data/careers.json");

router.post("/suggest", (req, res) => {
  const { interest } = req.body;

  if (!interest || !careers[interest]) {
    return res.json([]);
  }

  res.json(careers[interest]);
});

module.exports = router;
