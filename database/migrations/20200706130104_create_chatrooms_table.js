
exports.up = function (knex) {
  return knex.schema.createTable('chatrooms', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable()
    table.text('descriptions');
    table.timestamps(true, false)
  })
};

exports.down = function (knex) {
  return knex.schema.dropTable('chatrooms')
};
