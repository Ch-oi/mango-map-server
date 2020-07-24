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
    let imgurURL = await axios
      .post('https://api.imgur.com/3/image', {
        image: img,
      })
      .then((response) => {
        return response.data.data.link;
      })
      .catch((err) => console.log(err));

    let insertion = knex('images')
      .insert({
        user_id: userId,
        url: imgurURL,
        chatroom_id: chatroomId,
      })
      // TODO: handle the error
      .catch((err) => console.log(err));

    // TODO: return something meaningful
    return 'Success';
  }

  // Loading images according to room id
  loadChatroomImages(chatroomId) {
    let query = knex('images').select().where({ chatroom_id: 1 });

    return query.then((data) => data);
    // .catch((err) => console.log(err));
  }

  // Uploading images that belong to a district
  async uploadToDistrict(chatroomId) {
    let imgurURL = await axios
      .post('https://api.imgur.com/3/image', {
        image: img,
      })
      .then((response) => {
        return response.data.data.link;
      })
      .catch((err) => console.log(err));

    let insertion = knex('images')
      .insert({
        user_id: userId,
        url: imgurURL,
        chatroom_id: chatroomId,
      })
      // TODO: handle the error
      .catch((err) => console.log(err));

    // TODO: return something meaningful
    return 'Success';
  }

  // Loading images from a district
  loadDistrictImages(chatroomId) {
    let query = knex('images').select().where({ chatroom_id: 1 });

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
