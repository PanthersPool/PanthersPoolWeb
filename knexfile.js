/* eslint-disable import/no-extraneous-dependencies */
const { loadEnvConfig } = require("@next/env");

// Adapted from NextJS knex example
const dev = process.env.NODE_ENV !== "production";
const { DATABASE_URL } = loadEnvConfig("./", dev).combinedEnv;

const defaultSettings = {
  migrations: {
    directory: "./panthers-pool/knex/migrations",
  },
  seeds: {
    directory: "./panthers-pool/knex/seeds",
  },
};

module.exports = {
 /*
  development: {
    ...defaultSettings,
    client: "pg",
    connection: {
      connectionString: DATABASE_URL,
    },
  },
*/

  development: {
    ...defaultSettings,
    client: "sqlite3",
    connection: {
      filename: "./panthers-pool/db.sqlite",
    },
    useNullAsDefault: true,
  },
  /*
  production: {
    ...defaultSettings,
    client: "pg",
    connection: {
      connectionString: DATABASE_URL,
      ssl: true,
    },
  },
  */
};
