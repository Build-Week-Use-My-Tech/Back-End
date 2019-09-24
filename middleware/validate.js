// validate registration body

const validateUserBody = (req, res, next) => {
  const { first_name, last_name, email, password, renter, owner } = req.body;

  if (first_name && last_name && email && password && renter && owner) {
    next();
  } else {
    res
      .status(400)
      .json({ message: "Must provide valid data for all required fields" });
  }
};

const validateUpdateBody = (req, res, next) => {
  const { first_name, last_name, email, renter, owner } = req.body;

  if (first_name && last_name && email && renter && owner) {
    next();
  } else {
    res
      .status(400)
      .json({ message: "Must provide valid data for all required fields" });
  }
};

module.exports = {
  validateUserBody,
  validateUpdateBody
};
