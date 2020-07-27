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

    // let userDetailed = await this.compileUserLocsFavBlogsChatRooms(users)

    return users;
  }

  async getUser(user_id) {
    let user = await knex('users')
      .where('id', user_id)
      .catch((err) => console.log(err));

    let userDetailed = await this.compileUserLocsFavBlogsChatRooms(user[0]);

    return userDetailed;
  }

  //all location that a user marked
  async getUserLocations(user_id) {
    let userLocations = await knex('users-locations')
      .innerJoin('locations', 'users-locations.location_id', 'locations.id')
      .select('en', 'cn', 'users-locations.id','users-locations.created_at')
      .where('user_id', user_id)
      .catch((err) => console.log(err));

    let userLocationsBlogs = await this.getUserLocationsBlog(userLocations);

    return userLocationsBlogs;
  }

  async getUserLocationsBlog(userLocations) {
    let userLocationsBlogs = [];

    for (let userLocation of userLocations) {
      let userBlogs = await knex('blogs')
        .select('id', 'title', 'main_picture_URL','blogs.created_at')
        .where('userLocation_id', userLocation.id)
        .catch((err) => console.log(err));

      userLocation.userBlogs = userBlogs;
      userLocationsBlogs.push(userLocation);
    }
    return userLocationsBlogs;
  }

  async getUserFavBlogs(user_id) {
    let favBlogs = await knex('users-favBlogs')
      .innerJoin('blogs', 'blogs.id', 'users-favBlogs.blog_id')
      .select('blogs.id', 'blogs.title')
      .where('user_id', user_id)
      .catch((err) => console.log(err));

    return favBlogs;
  }

  async getUserChatrooms(user_id) {
    let chatrooms = await knex('chatrooms-users')
      .innerJoin('chatrooms', 'chatrooms.id', 'chatrooms-users.chatroom_id')
      .select('chatrooms-users.id', 'chatrooms-users.chatroom_id', 'name','chatrooms.created_at')
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

  async compileUserLocsFavBlogsChatRooms(user) {
      let locations = await this.getUserLocations(user.id);
      let chatrooms = await this.getUserChatrooms(user.id);
      let favBlogs = await this.getUserFavBlogs(user.id);
      user.locations = locations;
      user.chatrooms = chatrooms;
      user.favBlogs = favBlogs;
    

    return user;
  }

  // async addUser(user) {
  //   console.log(user);

  //   let hashedPwd = await bcrypt.hash(user.password.toString(), 10);
  //   await knex.raw(
  //     'SELECT setval(\'"users_id_seq"\', (SELECT MAX(id) from "users"));'
  //   );
  //   let results = await knex('users')
  //     .insert({ ...user, password: hashedPwd })
  //     .returning('*')
  //     .catch((err) => console.log(err));

  //   this.user = results;

  //   return this.user;
  // }

  async adduserLocation(user_id, location_id) {
    await knex.raw(
      'SELECT setval(\'"users-locations_id_seq"\', (SELECT MAX(id) from "users-locations"));'
    );
    let results = await knex('users-locations')
      .insert({ user_id: user_id, location_id: location_id })
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
