const router = require("express").Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "User Routes" });
});

module.exports = router;
