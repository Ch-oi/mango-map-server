exports.seed = function (knex) {
  // Deletes ALL existing entries

  // Inserts seed entries
  return knex('chatrooms')
    .insert([
      { id: 1, name: 'chat1', descriptions: 'des1' },
      { id: 2, name: 'chat2', descriptions: 'des2' },
      { id: 3, name: 'chat3', descriptions: 'des3' },
    ])
    .then(function () {
      // Inserts seed entries
      return knex('chatrooms_users').insert([
        { id: 1, chatroom_id: 1, user_id: 1 },
        { id: 2, chatroom_id: 1, user_id: 2 },
        { id: 3, chatroom_id: 1, user_id: 3 },
      ]);
    })
    .then(function () {
      // Inserts seed entries
      return knex('chat_records').insert([
        { id: 1, body: 'body1', chatroom_user_id: 1 },
        { id: 2, body: 'body2', chatroom_user_id: 2 },
        { id: 3, body: 'body3', chatroom_user_id: 3 },
      ]);
    });
};
