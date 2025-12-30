const express = require("express");
const router = express.Router();

/* ---------- AI ROADMAP GENERATOR ---------- */
router.post("/ai-roadmap", (req, res) => {
  const { career } = req.body;

  if (!career) {
    return res.status(400).json({ message: "Career is required" });
  }

  const roadmaps = {
    "DSA / Competitive Programming": [
      "Learn basic programming (C++ / Java)",
      "Arrays, Strings, Recursion",
      "Linked List, Stack, Queue",
      "Trees & Binary Search Trees",
      "Graphs & Dynamic Programming",
      "Practice on Codeforces / LeetCode"
    ],
    "Frontend Developer": [
      "HTML & CSS fundamentals",
      "JavaScript (ES6+)",
      "React basics & hooks",
      "State management",
      "Build real projects",
      "Deploy using Netlify / Vercel"
    ],
    "Backend Developer": [
      "JavaScript fundamentals",
      "Node.js & Express",
      "REST APIs",
      "MongoDB & Mongoose",
      "Authentication (JWT)",
      "Deploy backend"
    ],
    "Full Stack Developer": [
      "Frontend fundamentals",
      "Backend fundamentals",
      "Authentication & security",
      "Database design",
      "Deploy full stack app",
      "System design basics"
    ]
  };

  res.json({
    career,
    roadmap: roadmaps[career] || ["Start learning basics", "Build projects"]
  });
});

module.exports = router;
