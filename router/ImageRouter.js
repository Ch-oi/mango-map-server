const router = require('express').Router();

class ImageRouter {
    constructor(imageService) {
        this.imageService = imageService;
        this.router = router;
    }

    route() {
        this.router.get('/all', this.listImages.bind(this));
        this.router.get('/:id', this.getImage.bind(this));


        return this.router;
    }

    listImages(req, res) {
        return this.imageService.listImages()
            .then(images => res.send(images))
            .catch((err) => {
                console.log(err);
            });
    }
    getImage(req,res){
        let image_id = req.params.id
        return this.imageService.getImage(image_id)
            .then(image => res.send(image))
            .catch((err) => {
                console.log(err);
            });
    }
}

module.exports = ImageRouter