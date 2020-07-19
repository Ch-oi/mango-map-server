
exports.up = function (knex) {
    return knex.schema.createTable('blogs', (table) => {
        table.increments().primary();
        table.string("title").notNullable();
        table.unique("title");
        table.text("body").notNullable();
        table.text("main_picture_URL");
        table.boolean("modified");
        table.timestamps(true,true);
        table.integer('userDistrict_id').notNullable().unsigned();
        table.foreign('userDistrict_id').references('users-districts.id');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('blogs')
};
