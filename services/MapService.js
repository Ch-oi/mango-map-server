const knex = require('../database/config').knex;

class MapService {
  async listDistricts() {
    let districts = await knex('districts')
      .select('*')
      .catch((err) => console.log(err));

    return districts;
  }

  async listLocations() {
    let locations = await knex('locations')
      .select('*')
      .catch((err) => console.log(err));

    return locations;
  }

  async getLocation(location_id) {
    let location = await knex('locations')
      .where('locations.id', location_id)
      .catch((err) => console.log(err));

    let images = await this.getLocationImages(location[0].id);

    location[0].images = images;

    return location;
  }

  async getLocationImages(location_id) {
    let results = await knex('images')
      .innerJoin('users_locations', 'user_location_id', 'users_locations.id')
      .where('location_id', location_id)
      .catch((err) => console.log(err));

    return results;
  }

  //work with above result
  async getLocationUserBlogs(districtUsers) {
    let districtUsersBlogs = [];

    for (let districtUser of districtUsers) {
      let userBlogs = await knex('blogs')
        .select('id', 'title', 'main_picture_URL')
        .where('user_location_id', districtUser.id)
        .catch((err) => console.log(err));

      districtUser.userBlogs = userBlogs;
      districtUsersBlogs.push(districtUser);
    }
    return districtUsersBlogs;
  }

  async addLocation(location) {
    await knex.raw(
      "SELECT setval('locations_id_seq', (SELECT MAX(id) from locations));"
    );
    let newLocation = await knex('locations')
      .insert(location)
      .returning('*')
      .catch((err) => console.log(err));

    return newLocation;
  }

  async addLocationImages(urls, user_id, location_id) {

    let userLocation = await knex('users_locations')
      .where('user_id', user_id)
      .andWhere('location_id', location_id)
      .catch((err) => console.log(err));

    if (typeof userLocation[0] == 'undefined') {
      await knex.raw(
        'SELECT setval(\'"users_locations_id_seq"\', (SELECT MAX(id) from "users_locations"));'
      );
      userLocation = await knex('users_locations')
        .insert({ user_id: user_id, location_id: location_id })
        .returning('*')
        .catch((err) => console.log(err));
    }

    console.log(userLocation)

    await knex.raw(
      'SELECT setval(\'"images_id_seq"\', (SELECT MAX(id) from "images"));'
    );
    let imgs = [];

    for (let url of urls) {
      let img = await knex('images')
        .innerJoin('users_locations', 'user_location_id', 'users_locations.id')
        .insert({ url: url, user_location_id: userLocation[0].id })
        .returning('*')
        .catch((err) => console.log(err));

      imgs.push(img[0]);
    }

    return imgs;
  }

  // async addLocationImages(imageObject) {
  //   await knex.raw(
  //     'SELECT setval(\'"images_id_seq"\', (SELECT MAX(id) from "images"));'
  //   );
  //   let imgs = [];

  //   for (let url of imageObject.urls) {
  //     let img = await knex('images')
  //       .innerJoin('users_locations', 'user_location_id', 'users_locations.id')
  //       .insert({ ...imageObject, url: url })
  //       .returning('*')
  //       .catch((err) => console.log(err));

  //     imgs.push(img[0]);
  //   }
  //   return imgs;
  // }
}

module.exports = MapService;
