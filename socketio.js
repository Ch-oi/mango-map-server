const io = require('./server');

const startSocketIO = () => {
  io.on('connection', (socket) => {
    socket.on('new-user', ({ name, roomList }) => {
      socket.broadcast.emit('user-connected', name);
      roomList.forEach((roomId) => {
        socket
          .join(roomId)
          .emit('join-chatroom', 'A user has joined a room ' + roomId);
      });
    });

    socket.on('chat-message', (message) => {
      console.log('[socketio.js]', { ...message });
      socket.to(message.roomId).emit('chat-message', { ...message });
    });

    socket.to('Testroom').emit('test-message', 'I want to play a game');

    socket.on('send-chat-message', (message, cb) => {
      console.log(message);

      cb();
    });
    socket.on('add-chatroom-user', (data) => {
      socket.broadcast.emit('join-chatroom-user', data);
    });

    socket.on('disconnect', () => {});
  });
};

module.exports = startSocketIO;
