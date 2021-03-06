// const { read } = require('fs/promises');

const router = require("express").Router();

class ImageRouter {
  constructor(imageService) {
    this.imageService = imageService;
    this.router = router;
  }

  // All images are connected to a particular user
  route() {
    // Images that associate with chatroom id
    // Not public to outsiders
    this.router.post("/private", this.uploadToChatroom.bind(this));
    this.router.get("/private/:id", this.loadChatroomImages.bind(this));

    // // Images that associate with a district
    // // Could be in a blog or just the location
    this.router.post("/public", this.uploadToLocation.bind(this));
    this.router.get("/public/:id", this.loadLocationImages.bind(this));

    this.router.get("/");

    // // Remove a particular image
    this.router.post("/", this.removeImage.bind(this));

    this.router.get("/public", this.getAllImages.bind(this));

    return this.router;
  }

  getAllImages(req, res) {
    return this.imageService.getAllImages().then((result) => res.send(result));
  }

  uploadToChatroom(req, res) {
    const { img, currentRoomId, chatroomUserId, userId } = req.body;
    return this.imageService
      .uploadToChatroom(img, currentRoomId, chatroomUserId, userId)
      .then((data) => {
        res.send(data);
      });
  }

  loadChatroomImages(req, res) {
    return this.imageService.loadChatroomImages(req.params.id).then((data) => {
      res.send(data);
    });
  }

  uploadToLocation(req, res) {
    return this.imageService.uploadToLocation("hi", 1, 1).then((data) => {
      res.send(data);
    });
  }

  loadLocationImages(req, res) {
    return this.imageService.loadLocationImages(req.params.id).then((data) => {
      res.send(data);
    });
  }

  removeImage(req, res) {
    return this.imageService.removeImage(4).then((data) => {
      res.send(data);
    });
  }
}

module.exports = ImageRouter;
