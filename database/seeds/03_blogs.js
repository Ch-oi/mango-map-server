exports.seed = function (knex) {
  // Deletes ALL existing entries

  // Inserts seed entries
  return knex('blogs')
    .insert([
      {
        title: 'title1',
        body: 'body1',
        main_picture_url: 'https://picsum.photos/200/300',
        modified: false,
        user_location_id: 1,
      },
      {
        title: 'title2',
        body: 'body2',
        main_picture_url: 'https://picsum.photos/200/300',
        modified: false,
        user_location_id: 2,
      },
      {
        title: 'title3',
        body: 'body3',
        main_picture_url: 'https://picsum.photos/200/300',
        modified: false,
        user_location_id: 3,
      },
    ])
    .then(function () {
      // Inserts seed entries
      return knex('users_fav_blogs').insert([
        { id: 1, user_id: 1, blog_id: 1 },
        { id: 2, user_id: 1, blog_id: 2 },
        { id: 3, user_id: 1, blog_id: 3 },
      ]);
    })
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([
        { id: 1, category: 'apply' },
        { id: 2, category: 'pen' },
        { id: 3, category: 'penapple' },
      ]);
    })
    .then(function () {
      // Inserts seed entries
      return knex('categories_blogs').insert([
        { id: 1, blog_id: 1, category_id: 1 },
        { id: 2, blog_id: 1, category_id: 2 },
        { id: 3, blog_id: 1, category_id: 3 },
      ]);
    });
  // .then(function () {
  //   // Inserts seed entries
  //   return knex('images').insert([
  //     {
  //       id: 1,
  //       blog_id: 1,
  //       url: 'https://picsum.photos/200/300',
  //       user_location_id: 1,
  //     },
  //     { id: 2, url: 'https://picsum.photos/200/300', user_location_id: 2 },
  //     { id: 3, url: 'https://picsum.photos/200/300', user_location_id: 3 },
  //   ]);
  // });
};
