
exports.up = function (knex) {
  return knex.schema.createTable('comments', (table) => {
    table.increments('id').primary();
    table.text('body').notNullable()
    table.integer('ref_comment_id').unsigned()
    table.timestamps(true, true)
    table.integer('user_id').notNullable().unsigned()
    table.foreign('user_id').references('users.id')
    table.integer('blog_id').notNullable().unsigned()
    table.foreign('blog_id').references('blogs.id')
  })
};

exports.down = function (knex) {
  return knex.schema.dropTable('comments')
};
