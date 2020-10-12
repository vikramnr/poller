const express = require("express");
const router = express.Router();

router.get("/poll", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/poll", (req, res, next) => {
  console.log(req.body);
  res.render("poll", { title: req.body.title });
});

module.exports = router;
