const knex = require('../database/config').knex;
const axios = require('axios');
const { response } = require('express');
require('dotenv').config();

class ImageService {
  constructor() {
    axios.defaults.headers.common[
      'Authorization'
    ] = `Client-ID ${process.env.IMGUR_CLIENT_ID}`;
  }

  // Private images that have userId and chatroomId
  // Image parameter should be base64 string
  async uploadToChatroom(img, userId, chatroomId) {
    console.log('uploadToChatroom method is invoked');

    let imgurURL = await axios
      .post('https://api.imgur.com/3/image', {
        image: img,
      })
      .then((response) => {
        return response.data.data.link;
      })
      .catch((err) => console.log(err));

    knex('images')
      .insert({
        user_id: userId,
        url: imgurURL,
        chatrooms_id: chatroomId,
      })
      .innerJoin('chatrooms-users', 'chatrooms-users.id', 'chatroomUser_id')
      .then((data) => {
        console.log('Insertion is finished');
      })
      // TODO: handle the error
      .catch((err) => console.log(err));

    // TODO: return something meaningful
    return 'Success';
  }

  // Loading images according to room id
  loadChatroomImages(chatroomId) {
    let query = knex('images')
      .innerJoin('chatrooms_users', 'chatrooms_users.id', 'chatroom_user_id')
      .where({ chatroom_id: chatroomId });

    return query.then((data) => data).catch((err) => console.log(err));
  }

  // Uploading images that belong to a location
  async uploadToLocation(chatroomId) {
    console.log('ImageService is invoked');
    let imgurURL = await axios
      .post('https://api.imgur.com/3/image', {
        image: img,
      })
      .then((response) => {
        console.log('Axios is called');
        return response.data.data.link;
      })
      .catch((err) => console.log(err));

    console.log('Inserting into database...');

    let insertion = knex('images')
      .insert({
        user_id: userId,
        url: imgurURL,
        chatroom_id: chatroomId,
      })
      .innerJoin('chatrooms-users', 'chatrooms-users.id', 'chatroomUser_id')
      // TODO: handle the error
      .catch((err) => console.log(err));

    // TODO: return something meaningful
    return 'Success';
  }

  // Loading images from a location
  loadLocationImages(locationId) {
    let query = knex('images')
      .innerJoin('users-locations', 'users-locations.id', 'userLocation_id')
      .select()
      .where({ location_id: locationId });
    return query.then((data) => data).catch((err) => console.log(err));
  }

  // Rmove an image
  removeImage(imageId) {
    let query = knex('images').select().where({ id: imageId }).del();
    return query.then((data) => {
      return 'Success';
    });
  }
}

module.exports = ImageService;
