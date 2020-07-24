exports.up = function (knex) {
  return knex.schema.createTable('chatRecords', (table) => {
    table.increments();
    table.text('body').notNullable();
    table.integer('image_id').unsigned();
    table.foreign('image_id').references('images.id');
    table.integer('chatroomUser_id').unsigned();
    table.foreign('chatroomUser_id').references('chatrooms-users.id');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('chatRecords');
};
