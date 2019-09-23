const router = require("express").Router();
const bcrypt = require("bcryptjs");

// middleware
const validate = require("../middleware/validate.js");

// helpers
const Users = require("../data/helpers/users/users-model.js");

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
    const result = await Users.registerUser(newUser);
    console.log("RESULT", result);
    console.log(hash);
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error trying to register user" });
  }

  // add new user to the db
  // return 201 status
});

router.get("/users", async (req, res) => {
  try {
    const result = await Users.find();

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(400).json({ message: "Could not get users" });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Server encountered error fetching users" });
  }
});

module.exports = router;
