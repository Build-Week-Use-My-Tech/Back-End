const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// middleware
const validate = require("../middleware/validate.js");
const authenticate = require("../data/helpers/auth/auth-middleware.js");

// helpers
const Auth = require("../data/helpers/auth/auth-model.js");

router.post("/register", validate.validateUserBody, async (req, res) => {
  const newUser = req.body;
  try {
    // hash password
    const hash = bcrypt.hashSync(newUser.password, 14);
    // add hashed password to new user object
    newUser.password = hash;
    // add new user to the db
    const result = await Auth.registerUser(newUser);
    console.log("RESULT", result);
    console.log(hash);
    // return 201 status
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error trying to register user" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Auth.findByEmail(email);

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error trying to validate user" });
  }
});

function generateToken(user) {
  const payload = {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    renter: user.renter,
    owner: user.owner
  };
  const options = {
    expiresIn: "5d"
  };

  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

module.exports = router;
