exports.up = function (knex) {
<<<<<<< HEAD
  return knex.schema.createTable('chatRecords', (table) => {
    table.increments();
    table.text('body').notNullable();
    table.text('images');
    table.integer('chatroomUser_id').unsigned();
    table.foreign('chatroomUser_id').references('chatrooms-users.id');
    table.timestamps(true, true);
  });
=======
    return knex.schema.createTable('chatRecords', (table) => {
        table.increments();
        table.text('body').notNullable()
        table.integer('image_id').unsigned()
        table.foreign('image_id').references('images.id')
        table.integer('chatroomUser_id').unsigned()
        table.foreign('chatroomUser_id').references('chatrooms-users.id')
        table.timestamps(true, true)        
    })
>>>>>>> 1b2d73642076f93a1ebd67333859bdbec566fa93
};

exports.down = function (knex) {
  return knex.schema.dropTable('chatRecords');
};
