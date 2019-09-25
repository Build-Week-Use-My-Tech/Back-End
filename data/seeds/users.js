const bcrypt = require("bcryptjs");

const hashed = bcrypt.hashSync("password");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          first_name: "Danny",
          last_name: "Vidal",
          email: "vidaldanny94@gmail.com",
          password: hashed,
          renter: true,
          owner: false
        },
        {
          first_name: "Elvis",
          last_name: "Knapman",
          email: "test@gmail.com",
          password: hashed,
          renter: true,
          owner: true
        }
      ]);
    });
};
