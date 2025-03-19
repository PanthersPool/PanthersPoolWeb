/* eslint-disable func-names */
exports.up = function (knex) {
    return knex.schema
    .createTable("driver", (table) => {
        table.integer("driverID").primary();
        table.string("firstName");
        table.string("lastName");
        table.integer("age");
        table.string("phone");
        table.string("email");
        table.string("carMake");
        table.string("carColor");
        table.string("carPlate");
        table.binary("profilePicture");
    })
};
exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists("driver");
};
