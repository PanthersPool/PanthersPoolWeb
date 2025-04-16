require("dotenv/config");
const createKnex = require("knex");
const knexConfig = require("../../knexfile.js");

const globalForKnex = global;

const knex = globalForKnex.knex || createKnex(
  knexConfig[process.env.NODE_ENV || "development"]
);

if (process.env.NODE_ENV !== "production") {
  globalForKnex.knex = knex;
}

module.exports = knex;
