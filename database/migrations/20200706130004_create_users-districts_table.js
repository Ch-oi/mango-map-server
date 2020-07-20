
exports.up = function (knex) {
    return knex.schema.createTable('users-districts', (table) => {
      table.increments('id').primary();
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('users.id')
      table.integer('district_id').unsigned()
      table.foreign('district_id').references('districts.id')
      table.timestamps(true, true)
    })
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('users-districts')
  };
  