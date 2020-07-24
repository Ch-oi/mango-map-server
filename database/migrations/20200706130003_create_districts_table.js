exports.up = function (knex) {
  return knex.schema.createTable('districts', (table) => {
    table.increments('id').primary();
    table.string('en').notNullable();
    table.unique('en');
    table.string('cn');
    table.unique('cn');
    table.float('lat', 14, 10).notNullable();
    table.float('lng', 14, 10).notNullable();
    table.text('description');
    table.integer('area_id').unsigned();
    table.foreign('area_id').references('area.id');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('districts');
};
