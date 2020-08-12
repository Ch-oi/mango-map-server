exports.seed = function (knex) {
  // Deletes ALL existing entries

  // Inserts seed entries
  //password is 12345 in plain text
  return knex('users')
    .insert([
      {
        id: 1,
        user_name: 'Edwin123',
        email: 'e@e.com',
        password:
          '$2b$10$Es29aPU/0fGDU6B08pNDPOHL4wokeeMHs1W1Pwrsn6jUSFxVbMrhC',
        description: 'Hong Kong Hiker',
        gender: 'male',
        profile_picture_url:
          'https://i.imgur.com/8RcD034.png',
      },
      {
        id: 2,
        user_name: 'Pullip123',
        email: 'p@p.com',
        password:
          '$2b$10$Es29aPU/0fGDU6B08pNDPOHL4wokeeMHs1W1Pwrsn6jUSFxVbMrhC',
        description: 'Shopper holic',
        gender: 'female',
        profile_picture_url:
          'https://i.imgur.com/8RcD034.png',
      },
      {
        id: 3,
        user_name: 'Jacky123',
        email: 'j@j.com',
        password:
          '$2b$10$Es29aPU/0fGDU6B08pNDPOHL4wokeeMHs1W1Pwrsn6jUSFxVbMrhC',
        description: 'Exercism lover',
        gender: 'male',
        profile_picture_url:
          'https://i.imgur.com/8RcD034.png',
      },
    ])
    .then(function () {
      // Inserts seed entries
      return knex('users_locations').insert([
        { id: 1, user_id: 1, location_id: 1 },
        { id: 2, user_id: 2, location_id: 2 },
        { id: 3, user_id: 3, location_id: 3 },
        { id: 4, user_id: 1, location_id: 4 },
        { id: 5, user_id: 1, location_id: 5 },
        { id: 6, user_id: 1, location_id: 6 },
        { id: 7, user_id: 1, location_id: 7 },
        { id: 8, user_id: 1, location_id: 8 },
        { id: 9, user_id: 1, location_id: 9 },
        { id: 10, user_id: 2, location_id: 9 },
        { id: 11, user_id: 3, location_id: 9 },
        { id: 12, user_id: 2, location_id: 1 },
        { id: 13, user_id: 3, location_id: 1 },
      ]);
    });
};
