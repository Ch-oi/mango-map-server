exports.seed = function (knex) {
  // Deletes ALL existing entries

  // Inserts seed entries
  //password is 12345 in plain text
  return knex('users')
    .insert([
      {
        user_name: 'Edwin',
        email: 'e@e.com',
        password:
          '$2b$10$Es29aPU/0fGDU6B08pNDPOHL4wokeeMHs1W1Pwrsn6jUSFxVbMrhC',
        description: '',
        gender: 'male',
        profile_picture_url: '',
      },
      {
        user_name: 'Pulips',
        email: 'p@p.com',
        password:
          '$2b$10$Es29aPU/0fGDU6B08pNDPOHL4wokeeMHs1W1Pwrsn6jUSFxVbMrhC',
        description: '',
        gender: 'female',
        profile_picture_url: '',
      },
      {
        user_name: 'Jacky',
        email: 'j@j.com',
        password:
          '$2b$10$Es29aPU/0fGDU6B08pNDPOHL4wokeeMHs1W1Pwrsn6jUSFxVbMrhC',
        description: '',
        gender: 'male',
        profile_picture_url: '',
      },
    ])
    .then(function () {
      // Inserts seed entries
      return knex('users_locations').insert([
        { user_id: 1, location_id: 1 },
        { user_id: 2, location_id: 2 },
        { user_id: 3, location_id: 3 },
        { user_id: 1, location_id: 4 },
        { user_id: 1, location_id: 5 },
        { user_id: 1, location_id: 6 },
        { user_id: 1, location_id: 7 },
        { user_id: 1, location_id: 8 },
        { user_id: 1, location_id: 9 },
        { user_id: 1, location_id: 7 },
        { user_id: 1, location_id: 8 },
        { user_id: 1, location_id: 9 },
      ]);
    });
};
