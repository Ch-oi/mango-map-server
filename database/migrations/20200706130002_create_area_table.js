
exports.up = function (knex) {
    return knex.schema.createTable('area', (table) => {
        table.increments();
        table.string('name').notNullable()
        table.timestamps(true, false)
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('area')
};
