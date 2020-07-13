
exports.up = function(knex) {
  return knex.schema.createTable('categories-blogs',table=>{
      table.increments()
      table.integer('blog_id').unsigned()
      table.foreign('blog_id').references('blogs.id')
      table.integer('category_id').unsigned()
      table.foreign('category_id').references('categories.id')
      table.timestamps(true,true)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('categories-blogs')
};
