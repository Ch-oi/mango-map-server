const knex = require('../database/config').knex;

class ChatroomService {
  constructor() {
    this.chatrooms = [];
    this.chatroom = {};
  }

  //list all chatrooms
  async listChatrooms(userId) {
    let chatrooms = await knex('chatrooms')
      .join('chatrooms_users', 'chatrooms.id', 'chatrooms_users.chatroom_id')
      .select('*')
      .where({ user_id: userId })
      .catch((err) => console.log(err));

    this.chatrooms = chatrooms;
    return this.chatrooms;
  }

  //get one specfic chatroom by id
  async getChatroom(chatroom_id) {
    let chatroom = await knex('chatrooms')
      .select('*')
      .where('id', chatroom_id)
      .catch((err) => console.log(err));

    let chatroomUser = await this.getRoomAllChatRecords(chatroom[0].id);
    chatroom[0].chatroomUser = chatroomUser;
    this.chatroom = chatroom[0];
    return this.chatroom;
  }

  //add new chatroom
  //chatroom = {name:'sdf',descriptions:'sdf'}
  //user_id = [...]
  async addChatroom(chatroomName, chatroomDescription, usersId) {
    await knex.raw(
      "SELECT setval('chatrooms_id_seq', (SELECT MAX(id) from chatrooms));"
    );
    let newChatRoom = await knex('chatrooms')
      .insert({ room_name: chatroomName, descriptions: chatroomDescription })
      .returning('*')
      .catch((err) => console.log(err));

    const fieldToInsert = usersId.map((userId) => ({
      chatroom_id: newChatRoom[0].id,
      user_id: userId,
    }));

    console.log(fieldToInsert);

    await knex.raw(
      'SELECT setval(\'"chatrooms_users_id_seq"\', (SELECT MAX(id) from "chatrooms_users"));'
    );
    let newChatroomDetailed = await knex('chatrooms_users')
      .insert(fieldToInsert)
      .returning('*')
      .catch((err) => console.log(err));

    return newChatroomDetailed;
  }

  async addChatroomUsers(chatroomId, newUsers) {
    const fieldToInsert = newUsers.map((userId) => ({
      chatroom_id: chatroomId,
      user_id: userId,
    }));
  }

  async updateChatroom(chatroom, chatroom_id, users_id) {
    let updateChatRoom = await knex('chatrooms')
      .update(chatroom)
      .where('id', chatroom_id)
      .returning('*')
      .catch((err) => console.log(err));

    await knex('chatrooms-users')
      .del()
      .where('chatroom_id', updateChatRoom[0].id)
      .catch((err) => console.log(err));

    await knex.raw(
      'SELECT setval(\'"chatrooms-users_id_seq"\', (SELECT MAX(id) from "chatrooms-users"));'
    );

    const fieldToInsert = users_id.map((user_id) => ({
      chatroom_id: updateChatRoom[0].id,
      user_id: user_id,
    }));

    let newChatroomDetailed = await knex('chatrooms_users')
      .insert(fieldToInsert)
      .returning('*')
      .catch((err) => console.log(err));

    return newChatroomDetailed;
  }

  //add a new chat record
  //charRecord={body:"",images:""}
  async addChatRecord(chatRecord, chatroom_id, user_id) {
    let chatroomUser = await knex('chatrooms_users')
      .select('*')
      .where('chatroom_id', chatroom_id)
      .andWhere('user_id', user_id)
      .catch((err) => console.log(err));

    console.log(chatroomUser);

    await knex.raw(
      'SELECT setval(\'"chat_records_id_seq"\', (SELECT MAX(id) from "chat_records"));'
    );

    let newChatRecord = await knex('chat_records')
      .insert({ body: chatRecord, chatroom_user_id: chatroomUser[0].id })
      .returning('*')
      .catch((err) => console.log(err));

    return newChatRecord;
  }

  // delete one specfic chatroom by id
  async deleteChatroom(chatroom_id) {
    let chatroomUsers = await this.getChatroomUsers(chatroom_id);

    for (let chatroomUser of chatroomUsers) {
      await knex('chatRecords')
        .del()
        .where('chatroomUser_id', chatroomUser.id)
        .catch((err) => console.log(err));
    }

    await knex('chatrooms-users')
      .del()
      .where('chatroom_id', chatroom_id)
      .returning('*')
      .catch((err) => console.log(err));

    await knex('chatrooms')
      .del()
      .where('id', chatroom_id)
      .catch((err) => console.log(err));

    return chatroom_id;
  }

  // get all users id in a chatroom
  async getChatroomUsers(chatroom_id) {
    let chatroomUsers = await knex('chatrooms_users')
      .join('users', 'chatrooms_users.user_id', 'users.id')
      .select()
      .where('chatrooms_users.chatroom_id', chatroom_id)
      .catch((err) => console.log(err));

    return chatroomUsers;
  }

  // get all chat records of a room
  async getRoomAllChatRecords(chatroom_id) {
    let chatroomUsers = await this.getChatroomUsers(chatroom_id);

    let chatRecords = [];

    for (let chatroomUser of chatroomUsers) {
      chatRecords = await this.getChatroomUserRecords(chatroomUser.id);
      // Not exporting user password for safety
      delete chatroomUser.password;
      chatroomUser.chatRecords = chatRecords;
    }
    return chatroomUsers;
  }

  async getChatroomUserRecords(id) {
    let chatRecords = await knex('chat_records')
      .select('*')
      .where('chatroom_user_id', id)
      .catch((err) => console.log(err));

    return chatRecords;
  }
}

module.exports = ChatroomService;
