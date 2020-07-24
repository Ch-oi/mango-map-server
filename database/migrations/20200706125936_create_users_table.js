exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments().primary();
<<<<<<< HEAD
    table.string('user_name').notNullable();
    table.unique('user_name');
    table.string('email').notNullable();
    table.unique('email');
    table.string('password');
    table.text('description');
    table.text('profile_picture_URL');
    table.string('security_question');
    table.string('security_answer');
    table.integer('number_reviews').unsigned();
    table.integer('number_blogs').unsigned();
    table.integer('number_comments').unsigned();
    table.timestamps(true, true);
  });
=======
    table.string("user_name").notNullable();
    table.unique('user_name')
    table.string('email').notNullable()
    table.unique('email')
    table.string("password");
    table.boolean("gender").notNullable().defaultTo(true)
    table.text("description");
    table.text("profile_picture_URL");
    table.string("security_question");
    table.string("security_answer");
    table.string("facebook_ID");
    table.string("facebook_token");
    table.string("google_ID");
    table.string("google_token");
    table.timestamps(true,true);
  })
>>>>>>> 1b2d73642076f93a1ebd67333859bdbec566fa93
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
