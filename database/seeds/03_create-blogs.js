
exports.seed = function (knex) {
  // Deletes ALL existing entries


  // Inserts seed entries
  return knex('blogs').insert([
    { id: 1, title: 'title1', body: 'body1', main_picture_URL: 'https://picsum.photos/200/300', modified: false, userDistrict_id: 1 },
    { id: 2, title: 'title2', body: 'body2', main_picture_URL: 'https://picsum.photos/200/300', modified: false, userDistrict_id: 2 },
    { id: 3, title: 'title3', body: 'body3', main_picture_URL: 'https://picsum.photos/200/300', modified: false, userDistrict_id: 3 }
  ])

    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([
        { id: 1, category: 'apply' },
        { id: 2, category: 'pen' },
        { id: 3, category: 'penapple' }
      ]);
    })
    .then(function () {
      // Inserts seed entries
      return knex('categories-blogs').insert([
        { id: 1, blog_id: 1, category_id: 1 },
        { id: 2, blog_id: 1, category_id: 2 },
        { id: 3, blog_id: 1, category_id: 3 }
      ]);
    })
    .then(function () {
      // Inserts seed entries
      return knex('blogs-images').insert([
        { id: 1, blog_id: 1, url: 'https://picsum.photos/200/300' },
        { id: 2, blog_id: 1, url: 'https://picsum.photos/200/300' },
        { id: 3, blog_id: 1, url: 'https://picsum.photos/200/300' }
      ]);
    });
};
