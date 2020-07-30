exports.up = function (knex) {
  return knex.schema.createTable('districts', (table) => {
    table.increments();
    table.string('en').notNullable();
    table.unique('en');
    table.string('cn');
    table.unique('cn');
    table.float('lat', 14, 10).notNullable();
    table.float('lng', 14, 10).notNullable();
    table.timestamps(true, false);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('districts');
};
