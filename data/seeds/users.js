
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {first_name:"Danny", 
        last_name:"Vidal",
        email:"vidaldanny94@gmail.com",
        password:"r289h0f89y2b0983fy0238yf02",
        renter:true,
        owner:false,
      },
       
      ]);
    });
};
