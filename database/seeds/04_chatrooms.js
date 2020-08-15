exports.seed = function (knex) {
  // Deletes ALL existing entries

  // Inserts seed entries
  return knex('chatrooms')
    .insert([
      { room_name: 'Capstone Project', descriptions: 'des1' },
      { room_name: 'Dragonback trail', descriptions: 'des2' },
      { room_name: 'Lion Rock trail', descriptions: 'des3' },
    ])
    .then(function () {
      // Inserts seed entries
      return knex('chatrooms_users').insert([
        { chatroom_id: 1, user_id: 1 },
        { chatroom_id: 1, user_id: 2 },
        { chatroom_id: 3, user_id: 1 },
        { chatroom_id: 3, user_id: 2 },
        { chatroom_id: 2, user_id: 3 },
        { chatroom_id: 2, user_id: 2 },
      ]);
    })
    .then(function () {
      // Inserts seed entries
      return knex('chat_records').insert([
        { body: 'Hi, nice to meet you!', chatroom_user_id: 1 },
        { body: 'How are you doing?', chatroom_user_id: 1 },
        { body: 'Well, this is a nice chatroom', chatroom_user_id: 2 },
        { body: 'What are you doing?', chatroom_user_id: 2 },
        { body: 'Glad to see you!', chatroom_user_id: 3 },
        { body: 'So long', chatroom_user_id: 5 },
        {
          body: 'I feel really excited for this application!',
          chatroom_user_id: 4,
        },
        { body: 'Mango Map is a nice application', chatroom_user_id: 2 },
      ]);
    })
    .then(function () {
      // Inserts seed entries
      return knex('chatrooms_locations').insert([
        {
          chatroom_id: 1,
          location_id: 1,
          trip_date: '2017-01-30 16:49:19',
          trip_description: 'Xccelerateer first time hiking together!',
        },
        {
          chatroom_id: 2,
          location_id: 2,
          trip_date: '2017-01-30 16:49:19',
          trip_description: 'Go out for some fresh air',
        },
        {
          chatroom_id: 3,
          location_id: 3,
          trip_date: '2017-01-30 16:49:19',
          trip_description: 'Sometimes you need a break...',
        },
        {
          chatroom_id: 1,
          lat: 22.3168841,
          lng: 114.2351135,
          trip_date: '2017-01-30 16:49:19',
          trip_description: 'Embark on the journey!',
        },
        {
          chatroom_id: 1,
          lat: 22.3245323,
          lng: 114.2133214,
          trip_date: '2017-01-30 16:49:19',
          trip_description: 'Spice your life up!',
        },
        {
          chatroom_id: 1,
          lat: 22.325146,
          lng: 114.2238857,
          trip_date: '2017-01-30 16:49:19',
          trip_description: 'Enjoy a holiday',
        },
      ]);
    });
};
