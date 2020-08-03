const io = require('./server');

const startSocketIO = () => {
  io.on('connection', (socket) => {
    socket.on('new-user', ({ name, roomList }) => {
      socket.broadcast.emit('user-connected', name);
      roomList.forEach((roomId) => {
        console.log(roomId);
        socket
          .join(roomId)
          .emit('join-chatroom', 'A user has joined a room ' + roomId);
      });
      socket.join('Testroom');
    });

    socket.on('send-message', (message) => {
      console.log(message);
      socket.to(1).emit('chat-message', message);
    });

    socket.to('Testroom').emit('test-message', 'I want to play a game');

    socket.on('send-chat-message', (message, cb) => {
      console.log(message);
      //   socket.broadcast.emit('chat-message', {
      //     message,
      //     // TODO - this should return the username as well
      //   });
      cb();
    });
    socket.on('add-chatroom-user', (data) => {
      socket.broadcast.emit('join-chatroom-user', data);
    });

    socket.on('disconnect', () => {
      // socket.broadcast.emit('user-disconnected', user[socket.id]);
      // delete users[socket.id];
    });
  });
};

module.exports = startSocketIO;
