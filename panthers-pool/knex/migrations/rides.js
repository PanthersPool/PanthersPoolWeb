exports.up = function (knex) {
    return knex.schema
    .createTable("rides", (table) => {
        table.integer("rideID").primary();
        table.integer("driverID").unsigned().references("driver.driverID").onDelete("CASCADE");
        table.string("origin");
        table.string("destination");
        table.timestamp("departureTime");
        table.integer("spotsRemaining");
        table.boolean("luggageSpace");
        table.boolean("atLeastOnePassenger");
        table.boolean("Completed");
        table.specificType('riderID', 'integer[]');
    })
};
exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists("rides");
};
