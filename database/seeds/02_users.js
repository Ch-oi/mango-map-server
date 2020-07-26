exports.seed = function (knex) {
  // Deletes ALL existing entries

  // Inserts seed entries
  //password is 12345 in plain text
  return knex('users')
    .insert([
      {
        id: 1,
        user_name: 'Edwin',
        email: 'e@e.com',
        password:
          '$2b$10$Es29aPU/0fGDU6B08pNDPOHL4wokeeMHs1W1Pwrsn6jUSFxVbMrhC',
        description: '',
        profile_picture_URL: '',
      },
      {
        id: 2,
        user_name: 'Pulips',
        email: 'p@p.com',
        password:
          '$2b$10$Es29aPU/0fGDU6B08pNDPOHL4wokeeMHs1W1Pwrsn6jUSFxVbMrhC',
        description: '',
        profile_picture_URL: '',
      },
      {
        id: 3,
        user_name: 'Jacky',
        email: 'j@j.com',
        password:
          '$2b$10$Es29aPU/0fGDU6B08pNDPOHL4wokeeMHs1W1Pwrsn6jUSFxVbMrhC',
        description: '',
        profile_picture_URL: '',
      },
    ])
    .then(function () {
      // Inserts seed entries
      return knex('users-locations').insert([
        { id: 1, user_id: 1, location_id: 1 },
        { id: 2, user_id: 2, location_id: 2 },
        { id: 3, user_id: 3, location_id: 3 },
        { id: 4,user_id: 1, location_id: 16 },
        { id: 5,user_id: 1, location_id: 17 },
        { id: 6,user_id: 1, location_id: 19 },
        { id: 7,user_id: 1, location_id: 18 },
        { id: 8,user_id: 1, location_id: 22 },
        { id: 9,user_id: 1, location_id: 20 },
        { id: 10,user_id: 1, location_id: 21 },
        { id: 11,user_id: 1, location_id: 23 },
        { id: 12,user_id: 1, location_id: 24 },
      ]);
    });
};
