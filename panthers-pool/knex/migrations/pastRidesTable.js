exports.up = function (knex) {
    return knex.schema
    .createTable("pastRides", (table) => {
        table.integer("rideID").unsigned()
        table.integer("driverID").unsigned().references("driver.driverID").onDelete("CASCADE");
        table.timestamp()
    })
}