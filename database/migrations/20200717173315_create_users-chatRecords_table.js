exports.up = function (knex) {
  return knex.schema.createTable('users-chatRecords', (table) => {
    table.increments();
    table.text('body');
    table.integer('publisher').unsigned();
    table.foreign('publisher').references('users.id');
    table.integer('userChat_id').unsigned();
    table.foreign('userChat_id').references('users-chats.id');
    table.timestamps(true, false);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users-chatRecords');
};
