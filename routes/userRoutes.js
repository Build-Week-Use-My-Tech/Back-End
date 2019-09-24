const router = require("express").Router();

// middleware
const validate = require("../middleware/validate.js");
const authenticate = require("../data/helpers/auth/auth-middleware.js");

// helpers
const Users = require("../data/helpers/users/users-model.js");

router.get("/", authenticate, async (req, res) => {
  const { id } = req;
  const { email } = req;
  console.log("req", req);
  console.log("USER EMAIL", email);
  try {
    const user = await Users.returnUser(id);
    console.log("USER EMAIL 2", user.email);

    // only allow access if email on token matches the email of the requested user
    if (user && email === user.email) {
      res.status(200).json(user);
    } else {
      res.status(401).json({ message: "Invaid credentials" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server encountered error trying to fetch user information"
    });
  }
});

router.get("/:id/ads", authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    const results = await Users.adsByUser(id);

    if (results) {
      res.status(200).json(results);
    } else {
      res.status(400).json({ message: "Invalid user" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server encountered error trying to retrieve ads by user"
    });
  }
});

router.put(
  "/:id",
  authenticate,
  validate.validateUpdateBody,
  async (req, res) => {
    const { id } = req.params;
    const { email, body } = req;
    console.log("req", req);
    console.log("USER EMAIL", email);
    try {
      const user = await Users.updateUser(id, body);
      console.log("USER EMAIL 2", user.email);

      if (user) {
        res.status(200).json({ message: "User information updated" });
      } else {
        res.status(401).json({ message: "Invaid credentials" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Server encountered error trying to fetch user information"
      });
    }
  }
);

module.exports = router;
