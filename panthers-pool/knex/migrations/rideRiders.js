/* eslint-disable func-names */
exports.up = function (knex) {
    return knex.schema
    .createTable("rideRiders", (table) => {
        table.integer("rideID").unsigned(); 
        table.integer("riderID").unsigned(); 

        // Foreign keys to establish relationships
        table.foreign("rideID").references("rides.rideID").onDelete("CASCADE");
        table.foreign("riderID").references("rider.riderID").onDelete("CASCADE");

        table.primary(["rideID", "riderID"]); 
    });
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists("rideRiders");
};
