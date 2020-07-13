
exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('categories-blogs').del()
    //   .then(function () {
    //     return knex.raw('ALTER SEQUENCE categories-blogs_id_seq RESTART WITH 1')
    //   })
      .then(function () {
        return knex('categories').del()
      })
      .then(function () {
        return knex.raw('ALTER SEQUENCE categories_id_seq RESTART WITH 1')
      })
      .then(function () {
        return knex('blogs-images').del()
      })
    //   .then(function () {
    //     return knex.raw('ALTER SEQUENCE blogs-images_id_seq RESTART WITH 1')
    //   })
      .then(function () {
        return knex('comments').del()
      })
      .then(function () {
        return knex.raw('ALTER SEQUENCE comments_id_seq RESTART WITH 1')
      })
      .then(function () {
        return knex('users').del()
      })
      .then(function () {
        return knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 1')
      })
      .then(function () {
        return knex('users-districts').del()
      })
    //   .then(function () {
    //     return knex.raw('ALTER SEQUENCE users-districts_id_seq RESTART WITH 1')
    //   })
      .then(function () {
        return knex('districts').del()
      })
      .then(function () {
        return knex.raw('ALTER SEQUENCE districts_id_seq RESTART WITH 1')
      })
      .then(function () {
        return knex('area').del()
      })
      .then(function () {
        return knex.raw('ALTER SEQUENCE area_id_seq RESTART WITH 1')
      })
      .then(function () {
        return knex('users').del()
      })
      .then(function () {
        return knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 1')
      })
      .then(function () {
        return knex('chatrooms').del()
      })
      .then(function () {
        return knex.raw('ALTER SEQUENCE chatrooms_id_seq RESTART WITH 1')
      })
      .then(function () {
        return knex('chatrooms-users').del()
      })
    //   .then(function () {
    //     return knex.raw('ALTER SEQUENCE chatrooms-users_id_seq RESTART WITH 1')
    //   })
      .then(function () {
        return knex('chatRecords').del()
      })
    //   .then(function () {
    //     return knex.raw('ALTER SEQUENCE chatRecords_id_seq RESTART WITH 1')
    //   })
    //   .then(function () {
    //     return knex('restaurants').del()
    //   })
    //   .then(function () {
    //     return knex.raw('ALTER SEQUENCE restaurants_id_seq RESTART WITH 1')
    //   })
    //   .then(function () {
    //     return knex('users').del()
    //   })
    //   .then(function () {
    //     return knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 1')
    //   })
    //   .then(function () {
    //     return knex('districts').del()
    //   })
    //   .then(function () {
    //     return knex.raw('ALTER SEQUENCE districts_id_seq RESTART WITH 1')
    //   })
    //   .then(function () {
    //     return knex('areas').del()
    //   })
    //   .then(function () {
    //     return knex.raw('ALTER SEQUENCE areas_id_seq RESTART WITH 1')
    //   })
  };
  