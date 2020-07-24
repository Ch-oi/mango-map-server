const router = require('express').Router();

class ImageRouter {
  constructor(imageRouter) {
    this.imageRouter = imageRouter;
    this.router = router;
  }

  // All images are connected to a particular user
  route() {
    // Images that associate with chatroom id
    // Not public to outsiders
    this.router.get('/image/private', this.addDistrict.bind(this));
    this.router.post('/image/private', this.addDistrict.bind(this));

    // Images that associate with a distrcit
    // Could be in a blog or just the location
    this.router.get('/image/public', this.addDistrict.bind(this));
    this.router.post('/image/public', this.addDistrict.bind(this));

    // Remove a particular image
    this.router.delete('/image/private', this.addDistrict.bind(this));

    return this.router;
  }

  uploadToChatroom(req, res) {}
}
