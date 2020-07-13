
exports.up = function(knex) {
  return knex.schema.createTable('users',(table)=>{
    table.increments().primary();
    table.string("user_name").notNullable();
    table.unique('user_name')
    table.string('email').notNullable()
    table.unique('email')
    table.string("password");
    table.text("description");
    table.text("profile_picture_URL");
    table.string("security_question");
    table.string("security_answer");
    table.integer("number_reviews").unsigned();
    table.integer("number_blogs").unsigned();
    table.integer("number_comments").unsigned();
    table.timestamps(true,true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users')
};
