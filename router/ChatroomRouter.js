const router = require('express').Router();

class ChatroomRouter {
  constructor(chatroomService) {
    this.chatroomService = chatroomService;
    this.router = router;
  }

  route() {
    this.router.get('/all/:userId', this.listChatrooms.bind(this));
    this.router.get('/:id', this.getChatroom.bind(this));
    this.router.post('/', this.addChatroom.bind(this));
    this.router.get('/:id/users', this.getChatroomUsers.bind(this));
    this.router.get('/:id/records', this.getRoomAllChatRecords.bind(this));
    this.router.post('/record', this.addChatRecord.bind(this));

    // Find user with username
    this.router.post('/username', this.findUserWithUsername.bind(this));

    return this.router;
  }

  listChatrooms(req, res) {
    console.log(req.body);
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

  // TODO- change the user_id to real one
  addChatroom(req, res) {
    const chatroomName = req.body.chatroomName;
    const chatroomDescription = req.body.chatroomDescription;
    const userIds = [1, 2, 3];
    return this.chatroomService
      .addChatroom(chatroomName, chatroomDescription, userIds)
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

  addChatroomUsers(req, res) {
    const chatroomId = req.body.roomId;
    const newUsers = req.body.newUsers;
    return this.chatroomService
      .addChatroomUsers(chatroomId, newUsers)
      .then((chatroom) => res.send(chatroom))
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
    let { roomId, roomUserId } = req.body;
    let message = req.body.message[0];

    // let user_id = req.user.id;
    // let chatroom_id = req.params.id;
    // let new_chatRecord = { ...req.body.chatRecord };

    return this.chatroomService
      .addChatRecord(message, roomId, roomUserId)
      .then((chatRecord) => {
        console.log(chatRecord);
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
