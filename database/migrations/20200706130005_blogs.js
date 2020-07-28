exports.up = function (knex) {
  return knex.schema.createTable('blogs', (table) => {
    table.increments().primary();
    table.string('title').notNullable();
    table.unique('title');
    table.text('body').notNullable();
    table.text('main_picture_url');
    table.boolean('modified');
    table.timestamps(true, true);
    table.integer('user_location_id').notNullable().unsigned();
    table.foreign('user_location_id').references('users_locations.id');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('blogs');
};
