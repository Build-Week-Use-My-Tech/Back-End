const db = require("../../db-config.js");

const find = () => {
  return db("users");
};

const findByEmail = email => {
  return db("users")
    .where({ email })
    .first();
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

module.exports = {
  find,
  findById,
  registerUser,
  findByEmail
};
