exports.up = function (knex) {
  return knex.schema.createTable('districts', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.timestamps(true, false);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('districts');
};
