exports.up = function (knex) {
  return knex.schema.createTable('users_locations', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('users.id');
    table.integer('location_id').unsigned();
    table.foreign('location_id').references('locations.id');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users_locations');
};
