const express = require("express");
const router = express.Router();

// Home Page
router.get("/", (req, res) => {
    res.render("Home/index");
});

router.get("/projects", (req, res) => {
  res.render("admin/allProject");
});

module.exports = router;
