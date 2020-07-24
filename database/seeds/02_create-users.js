
exports.seed = function (knex) {
  // Deletes ALL existing entries

  // Inserts seed entries
  //password is 12345 in plain text
  return knex('users').insert([
    {
      id: 1,
      user_name: 'Edwin',
      email: 'e@e.com',
      password: '$2b$10$Es29aPU/0fGDU6B08pNDPOHL4wokeeMHs1W1Pwrsn6jUSFxVbMrhC',
      description: '',
      profile_picture_URL: '',
      security_question: '',
      security_answer: '',

    },
    {
      id: 2,
      user_name: 'Pulips',
      email: 'p@p.com',
      password: '$2b$10$Es29aPU/0fGDU6B08pNDPOHL4wokeeMHs1W1Pwrsn6jUSFxVbMrhC',
      description: '',
      profile_picture_URL: '',
      security_question: '',
      security_answer: '',

    },
    {
      id: 3,
      user_name: 'Jacky',
      email: 'j@j.com',
      password: '$2b$10$Es29aPU/0fGDU6B08pNDPOHL4wokeeMHs1W1Pwrsn6jUSFxVbMrhC',
      description: '',
      profile_picture_URL: '',
      security_question: '',
      security_answer: '',

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
   
};
