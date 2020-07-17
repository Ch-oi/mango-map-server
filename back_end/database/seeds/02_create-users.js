
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
    })
    .then(function () {
      // Inserts seed entries
      return knex('users-chats').insert([
        { id: 1, user1_id: 1, user2_id: 2 },
        { id: 2, user1_id: 2, user2_id: 3 },
        { id: 3, user1_id: 3, user2_id: 1 }
      ]);
    })
    .then(function () {
      // Inserts seed entries
      return knex('users-chatRecords').insert([
        { id: 1, userChat_id: 1, body: 'how are you' },
        { id: 2, userChat_id: 1, body: 'what the hell,man' },
        { id: 3, userChat_id: 1, body: 'sorry to bother you' }
      ]);
    });
};
