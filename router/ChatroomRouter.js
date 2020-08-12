const router = require("express").Router();

class ChatroomRouter {
  constructor(chatroomService) {
    this.chatroomService = chatroomService;
    this.router = router;
  }

  route() {
    this.router.get("/all/:userId", this.listChatrooms.bind(this));
    this.router.get("/:id", this.getChatroom.bind(this));
    this.router.get("/info/:id", this.getChatroomInfo.bind(this));
    this.router.post("/", this.addChatroom.bind(this));
    this.router.get("/:id/users", this.getChatroomUsers.bind(this));
    this.router.get("/:id/records", this.getRoomAllChatRecords.bind(this));
    this.router.post("/record", this.addChatRecord.bind(this));

    this.router.get("/trips/:id", this.listTrips.bind(this));
    // TODO - change to get request
    // Find user with username
    this.router.post("/username", this.findUserWithUsername.bind(this));
    this.router.post("/username/check", this.checkIfChatroomHasUser.bind(this));

    this.router.post("/user", this.addChatroomUser.bind(this));

    return this.router;
  }

  listTrips(req, res) {
    return this.chatroomService
      .listTrips(req.params.id)
      .then((trips) => res.send(trips))
      .catch((err) => console.log(err));
  }

  listChatrooms(req, res) {
    return this.chatroomService
      .listChatrooms(req.params.userId)
      .then((chatrooms) => res.send(chatrooms))
      .catch((err) => console.log(err));
  }

  getChatroom(req, res) {
    let chatroom_id = req.params.id;
    return this.chatroomService
      .getChatroom(chatroom_id)
      .then((chatroom) => res.send(chatroom))
      .catch((err) => console.log(err));
  }

  getChatroomInfo(req, res) {
    let chatroom_id = req.params.id;
    return this.chatroomService
      .getChatroomInfo(chatroom_id)
      .then((chatroom) => res.send(chatroom))
      .catch((err) => console.log(err));
  }

  // TODO- change the user_id to real one
  addChatroom(req, res) {
    const chatroomName = req.body.chatroomName;
    const chatroomDescription = req.body.chatroomDescription;
    const userId = req.body.userId;
    return this.chatroomService
      .addChatroom(chatroomName, chatroomDescription, userId)
      .then((chatroom) => res.send(chatroom))
      .catch((err) => console.log(err));
  }

  findUserWithUsername(req, res) {
    const username = req.body.username;
    return this.chatroomService
      .findUserWithUsername(username)
      .then((username) => res.send(username))
      .catch((err) => console.log(err));
  }

  checkIfChatroomHasUser(req, res) {
    const userId = req.body.userId;
    const currentRoomId = req.body.currentRoomId;

    console.log(userId, currentRoomId);
    return this.chatroomService
      .checkIfChatroomHasUser(currentRoomId, userId)
      .then((response) => {
        res.send(response);
      });
  }

  addChatroomUser(req, res) {
    const chatroomId = req.body.chatroomId;
    const userId = req.body.userId;

    return this.chatroomService
      .addChatroomUser(chatroomId, userId)
      .then((response) => {
        delete response[0].password;
        res.send(response);
      })
      .catch((err) => console.log(err));
  }

  getChatroomUsers(req, res) {
    let chatroom_id = req.params.id;
    return this.chatroomService
      .getChatroomUsers(chatroom_id)
      .then((chatroom) => res.send(chatroom))
      .catch((err) => console.log(err));
  }

  addChatRecord(req, res) {
    let message = req.body.message;
    let roomId = req.body.roomId;
    let userId = req.body.userId;
    let username = req.body.username;

    console.log("[ChatroomRouter]", req.body);

    return this.chatroomService
      .addChatRecord(message, roomId, userId, username)
      .then((chatRecord) => {
        res.send(chatRecord);
      })
      .catch((err) => console.log(err));
  }

  getRoomAllChatRecords(req, res) {
    let chatroom_id = req.params.id;
    return this.chatroomService
      .getRoomAllChatRecords(chatroom_id)
      .then((chatRecords) => res.send(chatRecords))
      .catch((err) => console.log(err));
  }
}

module.exports = ChatroomRouter;
