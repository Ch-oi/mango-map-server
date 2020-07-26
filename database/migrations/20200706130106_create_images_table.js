exports.up = function (knex) {
  return knex.schema.createTable('images', (table) => {
    table.increments('id').primary();
    table.text('url').notNullable();
    table.integer('blog_id').unsigned();
    table.foreign('blog_id').references('blogs.id');
    table.integer('chatroomUser_id').unsigned();
    table.foreign('chatroomUser_id').references('chatrooms-users.id');
    table.integer('userLocation_id').unsigned();
    table.foreign('userLocation_id').references('users-locations.id');
    table.boolean('private').defaultTo(false);
    table.timestamps(true, false);
  });
};



exports.down = function (knex) {
  return knex.schema.dropTable('images');
};
