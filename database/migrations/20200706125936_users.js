exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments().primary();
    table.string('user_name').notNullable().unique();
    // table.unique('user_name');
    table.string('email').notNullable();
    table.unique('email');
    table.string('password');
    table.string('gender').notNullable();
    table.text('description');
    table.text('profile_picture_url');
    table.string('facebook_ID');
    table.string('facebook_token');
    table.string('google_ID');
    table.string('google_token');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
