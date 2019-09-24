exports.up = function(knex) {
  return knex.schema
    .createTable("users", tbl => {
      // user ID
      tbl.increments();
      // first name
      tbl.string("first_name", 40).notNullable();
      // last name
      tbl.string("last_name", 40).notNullable();
      // email
      tbl
        .string("email", 70)
        .notNullable()
        .unique();
      // password
      tbl.string("password", 30).notNullable();
      // is a renter?
      tbl.boolean("renter").notNullable();
      // is a owner?
      tbl.boolean("owner").notNullable();

      // created at and updated at
      tbl.timestamps(true, true);
    })
    .createTable("ads", tbl => {
      // ad id
      tbl.increments();

      // title
      tbl.string("title").notNullable();

      // description
      tbl.text("description").notNullable();

      // price
      tbl.decimal("price").notNullable();

      // item condition
      tbl.string("item_condition", 60).notNullable();

      // is item available
      tbl.boolean("item_available").notNullable();

      // is price negotiable
      tbl.boolean("negotiable").notNullable();

      // user_id foreign key
      tbl
        .integer("user_id")
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");

      // created at and updated at
      tbl.timestamps(true, true);
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("ads").dropTableIfExists("users");
};
