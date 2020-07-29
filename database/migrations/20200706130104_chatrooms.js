exports.up = function (knex) {
  return knex.schema.createTable('chatrooms', (table) => {
    table.increments('id').primary();
    table.string('room_name').notNullable();

    table.text('descriptions');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('chatrooms');
};
