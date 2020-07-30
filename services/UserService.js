const knex = require('../database/config').knex;

class UserService {
  constructor() {
    this.user = [];
    this.images = []
  }


  async getUserLocation(payload) {
    let locationUser = await knex('locations')
      .innerJoin('users_locations', 'locations.id', 'users_locations.location_id')
      .where('user_id', payload.user_id)
      .andWhere('location_id', payload.location_id)
      .catch((err) => console.log(err));

    console.log(locationUser[0].id)

    let images = await this.getUserLocationImages(locationUser[0].id)

    locationUser[0].images = images
    
    return locationUser
  }

  async getUserLocationImages(id) {

    let images = await knex('images')
      .where('user_location_id', id)
      .catch((err) => console.log(err));
    console.log(images)
    return images

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
    let userLocations = await knex('users_locations')
      .innerJoin('locations', 'users_locations.location_id', 'locations.id')
      .select('en', 'cn', 'users_locations.id', 'users_locations.created_at')
      .where('user_id', user_id)
      .catch((err) => console.log(err));


    return userLocations;
  }

  async getUserLocationsBlog(user_id) {

    let userBlogs = await knex('blogs')
      .select('blogs.id', 'title', 'blogs.created_at')
      .innerJoin('users_locations', 'users_locations.id', 'user_location_id')
      .where('user_id', user_id)
      .catch((err) => console.log(err));


    return userBlogs;
  }

  async getUserFavBlogs(user_id) {
    let favBlogs = await knex('users_fav_blogs')
      .innerJoin('blogs', 'blogs.id', 'users_fav_blogs.blog_id')
      .where('user_id', user_id)
      .catch((err) => console.log(err));

    return favBlogs;
  }

  async getUserChatrooms(user_id) {
    let chatrooms = await knex('chatrooms_users')
      .innerJoin('chatrooms', 'chatrooms.id', 'chatrooms_users.chatroom_id')
      .select('chatrooms_users.id', 'chatrooms_users.chatroom_id', 'room_name', 'chatrooms.created_at')
      .where('user_id', user_id)
      .catch((err) => console.log(err));

    return chatrooms;
  }

  //accepting chatroomUser object  returning particular user's records

  async getUserChatroomRecords(chatroom_id, user_id) {
    let chatRecords = await knex('chatrooms_users')
      .select('*')
      .innerJoin('chatRecords', 'chatroom_user_id', 'chatrooms_users.id')
      .where('chatroom_id', chatroom_id)
      .andWhere('user_id', user_id)
      .catch((err) => console.log(err));

    return chatRecords;
  }

  async compileUserLocsFavBlogsChatRooms(user) {
    let locations = await this.getUserLocations(user.id);
    let chatrooms = await this.getUserChatrooms(user.id);
    let favBlogs = await this.getUserFavBlogs(user.id);
    let userBlogs = await this.getUserLocationsBlog(user.id)
    user.locations = locations;
    user.chatrooms = chatrooms;
    user.favBlogs = favBlogs;
    user.userBlogs = userBlogs;


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
      'SELECT setval(\'"users_locations_id_seq"\', (SELECT MAX(id) from "users_locations"));'
    );
    let results = await knex('users_locations')
      .insert({ user_id: user_id, location_id: location_id })
      .returning('*')
      .catch((err) => console.log(err));

    return results;
  }

  async addUserFavBlog(user_id, blog_id) {
    await knex.raw(
      'SELECT setval(\'"users_fav_blogs_id_seq"\', (SELECT MAX(id) from "users_fav_blogs"));'
    );
    let results = await knex('users_fav_blogs')
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
