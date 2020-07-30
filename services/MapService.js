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


  async getDistrictLocations(district_id) {
    let locations = await knex('locations')
      .select('*')
      .where('district_id', district_id)
      .catch((err) => console.log(err));

    return locations;
  }

  async getLocationUsers(district_id) {
    let districtUsers = await knex('users_locations')
      .innerJoin('users', 'users_locations.user_id', 'users.id')
      .select('users_locations.id', 'user_id', 'user_name')
      .where('district_id', district_id);

    return districtUsers;
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

  async getLocationImages(district_id) {
    let results = await knex('images')
      .innerJoin('users_locations', 'user_location_id', 'users_locations.id')
      .where('district_id', district_id)
      .catch((err) => console.log(err));

    return results;
  }
  async addLocation(district) {
    await knex.raw(
      "SELECT setval('locations_id_seq', (SELECT MAX(id) from locations));"
    );
    let newLocation = await knex('locations')
      .insert(district)
      .returning('*')
      .catch((err) => console.log(err));

    return newLocation;
  }

  async addLocationImages(imageObject) {
    await knex.raw(
      'SELECT setval(\'"images_id_seq"\', (SELECT MAX(id) from "images"));'
    );
    let imgs = [];

    for (let url of imageObject.urls) {
      let img = await knex('images')
        .innerJoin('users_locations', 'user_location_id', 'users_locations.id')
        .insert({ ...imageObject, url: url })
        .returning('*')
        .catch((err) => console.log(err));

      imgs.push(img[0]);
    }
    return imgs;
  }
}

module.exports = MapService;
