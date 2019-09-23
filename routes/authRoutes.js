const router = require("express").Router();
const bcrypt = require("bcryptjs");

// middleware
const validate = require("../middleware/validate.js");

router.get("/", (req, res) => {
  res.status(200).json({ message: "Auth Routes" });
});

router.post("/register", validate.validateRegister, async (req, res) => {
  const newUser = req.body;
  try {
    // hash password
    const hash = bcrypt.hashSync(newUser.password, 14);
    // add hashed password to new user object
    newUser.password = hash;
    console.log(hash);
    res.status(200).json({ hash });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error trying to register user" });
  }

  // add new user to the db
  // return 201 status
});

module.exports = router;
