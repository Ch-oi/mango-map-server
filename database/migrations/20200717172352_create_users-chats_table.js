
exports.up = function(knex) {
  return knex.schema.createTable('users-chats',(table)=>{
    table.increments();
    table.integer('user1_id').unsigned()
    table.foreign('user1_id').references('users.id')
    table.integer('user2_id').unsigned()
    table.foreign('user2_id').references('users.id')
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable('users-chats')
};
