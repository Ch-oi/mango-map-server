exports.up = function (knex) {
  return knex.schema.createTable('chat_records', (table) => {
    table.increments();
    table.text('body').notNullable();
    table.integer('chatroom_user_id').unsigned();
    table.foreign('chatroom_user_id').references('chatrooms_users.id');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('chat_records');
};
