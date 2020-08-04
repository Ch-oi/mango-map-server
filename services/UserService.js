const knex = require('../database/config').knex;
const bcrypt = require('bcrypt');

class UserService {
  constructor() {

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

  async compileUserLocsFavBlogsChatRooms(user) {
    let locations = await this.getUserLocations(user.id);
    let chatrooms = await this.getUserChatrooms(user.id);
    let favBlogs = await this.getUserFavBlogs(user.id);
    let userBlogs = await this.getUserLocationsBlog(user.id);
    user.locations = locations;
    user.chatrooms = chatrooms;
    user.favBlogs = favBlogs;
    user.userBlogs = userBlogs;

    return user;
  }

  

  //work with getUserLocation
  async getUserLocationImages(id) {
    let images = await knex('images')
      .where('user_location_id', id)
      .catch((err) => console.log(err));
    console.log(images);
    return images;
  }

  //all location that a user have been (write a post , upload images, create that location)
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
  //one userlocation and it's images
  async getUserLocation(payload) {
    let locationUser = await knex('locations')
      .innerJoin(
        'users_locations',
        'locations.id',
        'users_locations.location_id'
      )
      .where('user_id', payload.user_id)
      .andWhere('location_id', payload.location_id)
      .catch((err) => console.log(err));

    let images = await this.getUserLocationImages(locationUser[0].id)
    locationUser[0].images = images;

    return locationUser;
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
      .select(
        'chatrooms_users.id',
        'chatrooms_users.chatroom_id',
        'room_name',
        'chatrooms.created_at'
      )
      .where('user_id', user_id)
      .catch((err) => console.log(err));

    return chatrooms;
  }


  async addUserLocation(user_id, location_id) {
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

  async updateUser(payload) {
    let user = await this.getUser(payload.user_id);
    let updateUser;
    if (user.password == payload.userInfo.password) {
      updateUser = await knex('users')
        .update({ ...payload.userInfo })
        .where('id', payload.user_id)
        .returning('*')
        .catch((err) => console.log(err));
    } else {
      let newpwd = await bcrypt.hash(payload.userInfo.password.toString(), 10);

      updateUser = await knex('users')
        .update({ ...payload.userInfo, password: newpwd })
        .where('id', payload.user_id)
        .returning('*')
        .catch((err) => console.log(err));
    }
    console.log(updateUser);
    return updateUser;
  }




}

module.exports = UserService;
