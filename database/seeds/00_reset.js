exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('categories_blogs')
    .del()
    .then(function () {
      return knex.raw(
        'ALTER SEQUENCE "categories_blogs_id_seq" RESTART WITH 1'
      );
    })
    .then(function () {
      return knex('categories').del();
    })
    .then(function () {
      return knex.raw('ALTER SEQUENCE categories_id_seq RESTART WITH 1');
    })
    .then(function () {
      return knex('images').del();
    })
    .then(function () {
      return knex.raw('ALTER SEQUENCE "images_id_seq" RESTART WITH 1');
    })
    .then(function () {
      return knex('comments').del();
    })
    .then(function () {
      return knex.raw('ALTER SEQUENCE comments_id_seq RESTART WITH 1');
    })
    .then(function () {
      return knex('users_fav_blogs').del();
    })
    .then(function () {
      return knex.raw('ALTER SEQUENCE "users_fav_blogs_id_seq" RESTART WITH 1');
    })
    .then(function () {
      return knex('blogs').del();
    })
    .then(function () {
      return knex.raw('ALTER SEQUENCE blogs_id_seq RESTART WITH 1');
    })
    .then(function () {
      return knex('users_locations').del();
    })
    .then(function () {
      return knex.raw('ALTER SEQUENCE "users_locations_id_seq" RESTART WITH 1');
    })
    .then(function () {
      return knex('chat_records').del();
    })
    .then(function () {
      return knex.raw('ALTER SEQUENCE "chat_records_id_seq" RESTART WITH 1');
    })
    .then(function () {
      return knex('chatrooms_users').del();
    })
    .then(function () {
      return knex.raw('ALTER SEQUENCE "chatrooms_users_id_seq" RESTART WITH 1');
    })
    .then(function () {
      return knex('images').del();
    })
    .then(function () {
      return knex.raw('ALTER SEQUENCE "images_id_seq" RESTART WITH 1');
    })
    .then(function () {
      return knex('locations').del();
    })
    .then(function () {
      return knex.raw('ALTER SEQUENCE locations_id_seq RESTART WITH 1');
    })
    .then(function () {
      return knex('districts').del();
    })
    .then(function () {
      return knex.raw('ALTER SEQUENCE districts_id_seq RESTART WITH 1');
    })
    .then(function () {
      return knex('chatrooms').del();
    })
    .then(function () {
      return knex.raw('ALTER SEQUENCE chatrooms_id_seq RESTART WITH 1');
    })
    .then(function () {
      return knex('users').del();
    })
    .then(function () {
      return knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 1');
    });
};
