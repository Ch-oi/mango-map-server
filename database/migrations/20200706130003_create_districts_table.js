
exports.up = function (knex) {


    return knex.schema.createTable('districts', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable()
        table.unique('name')
        table.float('lat', 14, 10).notNullable();
        table.float('lng', 14, 10).notNullable();
        table.integer('area_id').unsigned()
        table.foreign('area_id').references('area.id')
        table.timestamps(true, true)
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('districts')
};

