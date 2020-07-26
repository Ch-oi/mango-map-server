exports.up = function (knex) {
  return knex.schema.createTable('images', (table) => {
    table.increments('id').primary();
    table.text('url').notNullable();
    table.integer('blog_id').unsigned();
    table.foreign('blog_id').references('blogs.id');
    table.integer('chatroom_id').unsigned();
    // table.foreign('chatroom_id').references('chatrooms.id');
    table.integer('user_id').unsigned();
    // table.foreign('user_id').references('users.id');
    table.integer('userDistrict_id').unsigned();
    table.foreign('userDistrict_id').references('users-districts.id');
    table.integer('locations_id').unsigned();
    table.foreign('locations_id').references('locations.id');
    table.boolean('private').defaultTo(false);
    table.timestamps(true, false);
  });
};

// exports.up = function (knex) {
//   return knex.schema.createTable('images', (table) => {
//     table.increments('id').primary();
//     table.text('url').notNullable();
//     table.integer('blog_id').unsigned();
//     table.foreign('blog_id').references('blogs.id');
// table.integer('userDistrict_id').unsigned();
// table.foreign('userDistrict_id').references('users-districts.id');
//     table.boolean('private').defaultTo(false);
//     table.timestamps(true, false);
//   });
// };

exports.down = function (knex) {
  return knex.schema.dropTable('images');
};
