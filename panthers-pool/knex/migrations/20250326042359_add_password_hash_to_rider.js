exports.up = function(knex) {
    return knex.schema.alterTable('rider', (table) => {
        table.string('password_hash');
    });
};

exports.down = function(knex) {
    return knex.schema.alterTable('rider', (table) => {
        table.dropColumn('password_hash');
    });
};
