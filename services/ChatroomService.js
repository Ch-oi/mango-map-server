const knex = require('../database/config').knex;

class ChatroomService {
  constructor() {}

  //list all chatrooms
  async listChatrooms(userId) {
    let chatrooms = await knex('chatrooms')
      .innerJoin(
        'chatrooms_users',
        'chatrooms.id',
        'chatrooms_users.chatroom_id'
      )
      .select('*')
      .where({ user_id: userId })
      .catch((err) => console.log(err));

    // console.log(chatrooms);
    return chatrooms;
  }

  //get one specfic chatroom by chatroom id
  async getChatroom(chatroom_id) {
    let chatroom = await knex('chatrooms')
      .select('*')
      .where('id', chatroom_id)
      .catch((err) => console.log(err));

    let chatroomUser = await this.getRoomAllChatRecords(chatroom[0].id);
    chatroom[0].chatroomUser = chatroomUser;
    this.chatroom = chatroom[0];
    console.log(this.chatroom);
    return this.chatroom;
  }

  //get one specfic chatroom information by chatroom id
  async getChatroomInfo(chatroom_id) {
    let chatroom = await knex('chatrooms_users')
      .leftJoin('users', 'chatrooms_users.user_id', 'users.id')
      .leftJoin('chatrooms', 'chatrooms.id', 'chatrooms_users.chatroom_id')
      .select(
        'users.user_name',
        'chatrooms.descriptions',
        'chatrooms.created_at'
      )
      .where('chatrooms_users.chatroom_id', chatroom_id)
      .catch((err) => console.log(err));

    return chatroom;
  }

  async listTrips(chatroom_id) {
    let trips = await knex('chatrooms_locations')
      // .leftJoin("chatrooms", "chatrooms_locations.chatroom_id", "chatrooms.id")
      .leftJoin('locations', 'locations.id', 'chatrooms_locations.location_id')
      .select(
        'chatrooms_locations.id',
        'locations.en',
        'locations.cn',
        'location_id',
        'chatrooms_locations.trip_date',
        'chatrooms_locations.trip_description',
        'chatrooms_locations.lat',
        'chatrooms_locations.lng'
      )
      .where('chatrooms_locations.chatroom_id', chatroom_id)
      .catch((err) => console.log(err));

    for (let trip of trips) {
      let images = await knex('images')
        .where('chatroom_location_id', trip.id)
        .select('id', 'url', 'private')
        .catch((err) => console.log(err));
      trip.images = images;
    }

    return trips;
  }

  //add new chatroom
  //chatroom = {name:'dragonback trail',descriptions:'A group for hikers'}
  //user_id = [...]
  async addChatroom(chatroomName, chatroomDescription, userId) {
    await knex.raw(
      "SELECT setval('chatrooms_id_seq', (SELECT MAX(id) from chatrooms));"
    );

    let newChatRoom = await knex('chatrooms')
      .insert({ room_name: chatroomName, descriptions: chatroomDescription })
      .returning('*')
      .catch((err) => console.log(err));

    await knex.raw(
      'SELECT setval(\'"chatrooms_users_id_seq"\', (SELECT MAX(id) from "chatrooms_users"));'
    );
    let newChatroomDetailed = await knex('chatrooms_users')
      .insert({ chatroom_id: newChatRoom[0].id, user_id: userId })
      .returning('*')
      .catch((err) => console.log(err));

    return newChatroomDetailed;
  }

  async addTrip(chatroomId, locationId, date, description, lat, lng) {
    if (locationId) {
      await knex('chatrooms_locations').insert({
        chatroom_id: chatroomId,
        location_id: locationId,
        trip_description: description,
        trip_date: date,
      });
    } else {
      await knex('chatrooms_locations').insert({
        chatroom_id: chatroomId,
        lat: lat,
        lng: lng,
        trip_description: description,
        trip_date: date,
      });
    }

    let query = await knex('chatrooms_locations')
      .select()
      .where({ chatroom_id: chatroomId });

    return query;
    // return 'Success';
  }

  // Find the user to add to chatroom
  async findUserWithUsername(username) {
    let user = await knex('users')
      .select('id', 'user_name', 'profile_picture_url')
      .where({ user_name: username });

    if (user.length === 0) {
      return 'No such user';
    }
    if (user.length === 1) {
      return user;
    }
    return 'Error';
  }

  // Check if the user is already in the chatroom
  async checkIfChatroomHasUser(currentRoomId, userId) {
    let check = await knex('users')
      .join('chatrooms_users', 'users.id', 'chatrooms_users.user_id')
      .where('chatrooms_users.chatroom_id', currentRoomId)
      .andWhere('users.id', userId)
      .select();

    return check;
  }

  async addChatroomUser(chatroomId, userId) {
    await knex('chatrooms_users').insert({
      chatroom_id: chatroomId,
      user_id: userId,
    });

    let query = await knex('users').select().where({ id: userId });

    return query;
  }

  //add a new chat record
  //charRecord={body:"",images:""}
  async addChatRecord(chatRecord, chatroom_id, user_id, username) {
    console.log('[ChatrromService]', chatroom_id, user_id);

    let chatroomUser = await knex('chatrooms_users')
      .select('*')
      .where('chatroom_id', chatroom_id)
      .andWhere('user_id', user_id)
      .catch((err) => console.log(err));

    await knex.raw(
      'SELECT setval(\'"chat_records_id_seq"\', (SELECT MAX(id) from "chat_records"));'
    );

    let newChatRecord = await knex('chat_records')
      .insert({ body: chatRecord, chatroom_user_id: chatroomUser[0].id })
      .returning('*')
      .catch((err) => console.log(err));

    newChatRecord[0].user_name = username;

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
      .leftJoin('users', 'chatrooms_users.user_id', 'users.id')
      .select(
        'chatrooms_users.id',
        'users.user_name',
        'chatrooms_users.user_id'
      )
      // .select()
      .where('chatrooms_users.chatroom_id', chatroom_id)
      // .where('chatroom_id', chatroom_id)
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
}

module.exports = ChatroomService;
