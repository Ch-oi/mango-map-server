exports.up = function (knex) {
  return knex.schema.createTable("images", (table) => {
    table.increments("id").primary();
    table.text("url").notNullable();
    table.integer("blog_id").unsigned();
    table.foreign("blog_id").references("blogs.id");
    table.integer("chatroom_user_id").unsigned();
    table.foreign("chatroom_user_id").references("chatrooms_users.id");
    table.integer("user_location_id").unsigned();
    table.foreign("user_location_id").references("users_locations.id");
    table.integer("chatroom_location_id").unsigned();
    table.foreign("chatroom_location_id").references("chatrooms_locations.id");
    table.boolean("private").defaultTo(false);
    table.timestamps(true, false);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("images");
};
