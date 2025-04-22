/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
/* eslint-disable func-names */
/* eslint no-unused-vars: ["error", { "args": "none" }] */
const fs = require("fs");

exports.seed = function (knex) {
  const contents = fs.readFileSync("panthers-pool/data/rides.json");
  const data = JSON.parse(contents);

  const parsedData = data.map(ride => ({
    ...ride,
    riderID: JSON.stringify(ride.riderID)
  }))

  const parsedData2 = parsedData.map(ride => ({
    ...ride,
    requests: JSON.stringify(ride.requests)
  }))

  // Deletes ALL existing entries
  // Use batch insert because we have too many articles for simple insert
  return knex("rides")
    .del()
    .then(() => knex.batchInsert("rides", parsedData2, 100));
};
