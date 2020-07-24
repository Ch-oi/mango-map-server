const router = require('express').Router();

class ImageRouter {
  constructor(imageService) {
    this.imageService = imageService;
    this.router = router;
  }

  // All images are connected to a particular user
  route() {
    // Images that associate with chatroom id
    // Not public to outsiders
    this.router.post('/private', this.uploadToChatroom.bind(this));
    this.router.get('/private', this.loadChatroomImages.bind(this));

    // // Images that associate with a distrcit
    // // Could be in a blog or just the location
    this.router.post('/public', this.uploadToDistrict.bind(this));
    this.router.get('/public', this.loadDistrictImages.bind(this));

    // // Remove a particular image
    this.router.post('/', this.removeImage.bind(this));

    return this.router;
  }

  uploadToChatroom(req, res) {
    return this.imageService.uploadToChatroom('hi', 1, 1).then((data) => {
      res.send('uploadToChatroom working');
      console.log(data);
    });
  }

  loadChatroomImages(req, res) {
    return this.imageService.loadChatroomImages(1).then((data) => {
      res.send('data');
    });
  }

  uploadToDistrict(req, res) {
    return this.imageService.uploadToDistrict('hi', 1, 1).then((data) => {
      res.send('uploadToChatroom working');
      console.log(data);
    });
  }

  loadDistrictImages(req, res) {
    return this.imageService.loadDistrictImages(1).then((data) => {
      res.send('data');
    });
  }

  removeImage(req, res) {
    return this.imageService.removeImage(4).then((data) => {
      res.send(data);
    });
  }
}

module.exports = ImageRouter;
