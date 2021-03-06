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

const updateUser = (id, changes) => {
  return db("users")
    .where({ id })
    .update(changes);
};

const adsByUser = id => {
  return db("ads")
    .join("users", "users.id", "=", "ads.user_id")
    .where({ "users.id": id })
    .select(
      "ads.id",
      "ads.title",
      "ads.description",
      "ads.price",
      "ads.img_url",
      "ads.item_condition",
      "ads.item_available",
      "ads.negotiable",
      "ads.user_id"
    );
};

module.exports = {
  find,
  findById,
  registerUser,
  returnUser,
  updateUser,
  adsByUser
};
