const knex = require('../database/config').knex;
const bcrypt = require('bcrypt');

class UserService {
  constructor() {
    this.user = [];
  }

  async listUsers() {
    let users = await knex('users')
      .select('*')
      .catch((err) => console.log(err));

    // let userDetailed = await this.compileUserDistsFavBlogsChatRooms(users)

    return users;
  }

  async getUser(user_id) {
    let user = await knex('users')
      .select('*')
      .where('id', user_id)
      .catch((err) => console.log(err));

    let userDetailed = await this.compileUserDistsFavBlogsChatRooms(user);

    return userDetailed;
  }

  //all location that a user marked
  async getUserDistricts(user_id) {
    let userDistricts = await knex('users-districts')
      .innerJoin('districts', 'users-districts.district_id', 'districts.id')
      .select('en', 'cn', 'users-districts.id')
      .where('user_id', user_id)
      .catch((err) => console.log(err));

    let userDistrictsBlogs = await this.getUserDistrictsBlog(userDistricts);

    return userDistrictsBlogs;
  }

  async getUserDistrictsBlog(userDistricts) {
    let userDistrictsBlogs = [];

    for (let userDistrict of userDistricts) {
      let userBlogs = await knex('blogs')
        .select('id', 'title', 'main_picture_URL')
        .where('userDistrict_id', userDistrict.id)
        .catch((err) => console.log(err));

      userDistrict.userBlogs = userBlogs;
      userDistrictsBlogs.push(userDistrict);
    }
    return userDistrictsBlogs;
  }

  async getUserFavBlogs(user_id) {
    let favBlogs = await knex('users-favBlogs')
      .innerJoin('blogs', 'blogs.id', 'users-favBlogs.blog_id')
      .select('blogs.id', 'blogs.title')
      .where('user_id', user_id)
      .catch((err) => console.log(err));

    return favBlogs;
  }

  async getUserChat(user1_id) {
    let userChat = await knex('users-chats')
      .innerJoin('users', 'users.id', 'users-chats.user2_id')
      .select('users-chats.id', 'user2_id', 'user_name')
      .where('user1_id', user1_id)
      .catch((err) => console.log(err));

    return userChat;
  }

  async getUserChatrooms(user_id) {
    let chatrooms = await knex('chatrooms-users')
      .innerJoin('chatrooms', 'chatrooms.id', 'chatrooms-users.chatroom_id')
      .select('chatrooms-users.id', 'chatrooms-users.chatroom_id', 'name')
      .where('user_id', user_id)
      .catch((err) => console.log(err));

    return chatrooms;
  }

  //accepting chatroomUser object  returning particular user's records

  async getUserChatroomRecords(chatroom_id, user_id) {
    let chatRecords = await knex('chatrooms-users')
      .select('*')
      .innerJoin('chatRecords', 'chatroomUser_id', 'chatrooms-users.id')
      .where('chatroom_id', chatroom_id)
      .andWhere('user_id', user_id)
      .catch((err) => console.log(err));

    return chatRecords;
  }

  async compileUserDistsFavBlogsChatRooms(users) {
    let usersDetailed = [];
    for (let user of users) {
      let districts = await this.getUserDistricts(user.id);
      let chatrooms = await this.getUserChatrooms(user.id);
      let favBlogs = await this.getUserFavBlogs(user.id);
      let userChat = await this.getUserChat(user.id);
      user.districts = districts;
      user.chatrooms = chatrooms;
      user.favBlogs = favBlogs;
      user.userChat = userChat;
      usersDetailed.push(user);
    }

    return usersDetailed;
  }

  async addUser(user) {
    console.log(user);

    let hashedPwd = await bcrypt.hash(user.password.toString(), 10);
    await knex.raw(
      'SELECT setval(\'"users_id_seq"\', (SELECT MAX(id) from "users"));'
    );
    let results = await knex('users')
      .insert({ ...user, password: hashedPwd })
      .returning('*')
      .catch((err) => console.log(err));

    this.user = results;

    return this.user;
  }

  async addUserDistrict(user_id, district_id) {
    await knex.raw(
      'SELECT setval(\'"users-districts_id_seq"\', (SELECT MAX(id) from "users-districts"));'
    );
    let results = await knex('users-districts')
      .insert({ user_id: user_id, district_id: district_id })
      .returning('*')
      .catch((err) => console.log(err));

    return results;
  }

  async addUserFavBlog(user_id, blog_id) {
    await knex.raw(
      'SELECT setval(\'"users-favBlogs_id_seq"\', (SELECT MAX(id) from "users-favBlogs"));'
    );
    let results = await knex('users-favBlogs')
      .insert({ user_id: user_id, blog_id: blog_id })
      .returning('*')
      .catch((err) => console.log(err));

    return results;
  }

  async deleteUser() {
    let results = await knex('users').del();
  }
}

module.exports = UserService;
