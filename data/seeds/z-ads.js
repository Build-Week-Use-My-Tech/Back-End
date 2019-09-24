exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("ads")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("ads").insert([
        {
          title: "Cannon rebel t5",
          description: "Perfect for tha fam",
          img_url: "https://example.com/examplejpg",
          price: 20.0,
          item_condition: "new",
          item_available: 1,
          negotiable: 1,
          user_id: 1
        }
      ]);
    });
};
