exports.up = function (knex) {
  return knex.schema.createTable('chatrooms_users', (table) => {
    table.increments().primary();
    table.integer('chatroom_id').unsigned();
    table.foreign('chatroom_id').references('chatrooms.id');
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('users.id');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('chatrooms_users');
};
