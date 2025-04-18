import "dotenv/config"
import createKnex from "knex";
import knexConfig from "../../knexfile.js";

const globalForKnex = global;

// eslint-disable-next-line import/prefer-default-export
export const knex =
  globalForKnex.knex ||
  createKnex(
    knexConfig[process.env.NODE_ENV || "development"]
  );

if (process.env.NODE_ENV !== "production") globalForKnex.knex = knex;


