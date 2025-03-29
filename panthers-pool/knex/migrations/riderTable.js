/* eslint-disable func-names */
exports.up = function (knex) {
    return knex.schema
    .createTable("rider", (table) => {
        table.integer("riderID").primary();
        table.string("firstName");
        table.string("lastName");
        table.integer("age");
        table.string("phone");
        table.string("email");
        table.string("password_hash")
        table.binary("profilePicture");
    })
};
exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists("rider");
};
