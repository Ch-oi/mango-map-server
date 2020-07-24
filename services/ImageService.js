const knex = require('../database/config').knex

class ImageService {

    async listImages() {
        let images = await knex('images')
            .innerJoin('users-districts', 'userDistrict_id', 'users-districts.id')
            .catch(err => console.log(err))

        return images

    }

    async getImage(image_id) {
        let image = await knex('images')
            .innerJoin('users-districts', 'userDistrict_id', 'users-districts.id')
            .where('images.id', image_id)
            .catch(err => console.log(err))

        return image
    }


}

module.exports = ImageService