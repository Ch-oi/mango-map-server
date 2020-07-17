
exports.up = function (knex) {
    return knex.schema.createTable('blogs-images', (table) => {
        
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('blogs-images')
};
