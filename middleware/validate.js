// validate registration body

const validateUserBody = (req, res, next) => {
  const { first_name, last_name, email, password } = req.body;

  if (first_name && last_name && email && password) {
    next();
  } else {
    res
      .status(400)
      .json({ message: "Must provide valid data for all required fields" });
  }
};

module.exports = {
  validateUserBody
};
