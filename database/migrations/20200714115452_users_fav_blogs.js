exports.up = function (knex) {
  return knex.schema.createTable('users_fav_blogs', (table) => {
    table.increments();
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('users.id');
    table.integer('blog_id').unsigned();
    table.foreign('blog_id').references('blogs.id');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users_fav_blogs');
};
