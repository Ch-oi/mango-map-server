exports.up = function (knex) {
  return knex.schema.createTable('images', (table) => {
    table.increments('id').primary();
    table.text('url').notNullable();
    table.integer('blog_id').unsigned();
    table.foreign('blog_id').references('blogs.id');
    table.integer('userDistrict_id').unsigned().notNullable();
    table.foreign('userDistrict_id').references('users-districts.id');
    table.boolean('private').defaultTo(false);
    table.timestamps(true, false);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('images');
};
