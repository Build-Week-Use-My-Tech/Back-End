var knex = require("knex");
var {development} = require("../../knexfile.js");
module.exports = knex(development);