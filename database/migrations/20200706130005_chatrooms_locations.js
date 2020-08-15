exports.up = function (knex) {
  return knex.schema.createTable('chatrooms_locations', (table) => {
    table.increments('id').primary();
    table.integer('chatroom_id').unsigned();
    table.foreign('chatroom_id').references('chatrooms.id');
    table.integer('location_id').unsigned();
    table.foreign('location_id').references('locations.id');
    table.float('lat', 14, 10);
    table.float('lng', 14, 10);
    table.string('trip_description');
    table.datetime('trip_date', { precision: 6 });
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('chatrooms_locations');
};
