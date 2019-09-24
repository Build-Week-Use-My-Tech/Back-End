const db = require("../../db-config.js");

const find = () => {
  return db("users");
};

const findById = id => {
  return db("users")
    .where({ id })
    .first();
};

const registerUser = newUser => {
  return db("users")
    .insert(newUser, "id")
    .then(([id]) => {
      return findById(id);
    });
};

const returnUser = id => {
  return findById(id).select(
    "id",
    "first_name",
    "last_name",
    "email",
    "renter",
    "owner"
  );
};

module.exports = {
  find,
  findById,
  registerUser,
  returnUser
};
