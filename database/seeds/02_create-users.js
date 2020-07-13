
exports.seed = function (knex) {
  // Deletes ALL existing entries

  // Inserts seed entries
  return knex('users').insert([
    {
      id: 1,
      user_name: 'Edwin',
      email: 'e@e.com',
      password: '',
      description: '',
      profile_picture_URL: '',
      security_question: '',
      security_answer: '',
      number_reviews: 0,
      number_blogs: 0,
      number_comments: 0
    },
    {
      id: 2,
      user_name: 'Pulips',
      email: 'p@p.com',
      password: '',
      description: '',
      profile_picture_URL: '',
      security_question: '',
      security_answer: '',
      number_reviews: 0,
      number_blogs: 0,
      number_comments: 0
    },
    {
      id: 3,
      user_name: 'Jacky',
      email: 'j@j.com',
      password: '',
      description: '',
      profile_picture_URL: '',
      security_question: '',
      security_answer: '',
      number_reviews: 0,
      number_blogs: 0,
      number_comments: 0
    }
  ])
    .then(function () {
    // Inserts seed entries
    return knex('users-districts').insert([
      { id: 1, user_id: 1, district_id: 1 },
      { id: 2, user_id: 2, district_id: 2 },
      { id: 3, user_id: 3, district_id: 3 }
    ]);
  });
};
