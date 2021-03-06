// validate registration body
const invalidBodyMsg = "Must provide valid data for all required fields";

const validateUserBody = (req, res, next) => {
  const { first_name, last_name, email, password } = req.body;

  if (first_name && last_name && email && password) {
    next();
  } else {
    res.status(400).json({ message: invalidBodyMsg });
  }
};

const validateUpdateBody = (req, res, next) => {
  const { first_name, last_name, email } = req.body;

  if (first_name && last_name && email) {
    next();
  } else {
    res.status(400).json({ message: invalidBodyMsg });
  }
};

// validate ad body

function validateAd(
  {
    body: {
      title,
      description,
      price,
      item_condition,
      item_available,
      negotiable
    },
    method
  },
  response,
  next
) {
  if (method == "POST" || method == "PUT" || method == "DELETE") {
    if (
      title &&
      description &&
      price &&
      item_condition &&
      item_available &&
      negotiable
    ) {
      next();
    } else {
      response.status(400).json({ message: invalidBodyMsg });
    }
  } else {
    next();
  }
}

module.exports = {
  validateAd,
  validateUserBody,
  validateUpdateBody
};
