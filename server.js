var fs = require('fs');
var https = require('https');

const express = require('express');
const app = express();

const key = fs.readFileSync('./key.pem');
const cert = fs.readFileSync('./cert.pem');

const server = https.createServer({ key: key, cert: cert }, app);
const socketio = require('socket.io');
const io = socketio(server);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const knex = require('./database/config');

const UserRouter = require('./router/UserRouter');
const BlogRouter = require('./router/BlogRouter');
// const ChatroomRouter = require('./router/ChatroomRouter');
const MapRouter = require('./router/MapRouter');

const UserService = require('./services/UserService');
const BlogService = require('./services/BlogService');
// const ChatroomService = require('./services/ChatroomService');
const MapService = require('./services/MapService');

const userService = new UserService();
const blogService = new BlogService();
// const chatroomService = new ChatroomService();
const mapService = new MapService();

app.use('/user', new UserRouter(userService).route());
app.use('/blog', new BlogRouter(blogService).route());
// app.use('/chatroom', new ChatroomRouter(chatroomService).route());
app.use('/map', new MapRouter(mapService).route());

io.on('connection', (socket) => {
  console.log('New user connected to server');

  socket.on('new-user', ({ name }) => {
    console.log(name);
    // users[socket.id] = name;
    socket.broadcast.emit('user-connected', name);
  });

  socket.on('send-chat-message', (message, cb) => {
    console.log(message);
    socket.broadcast.emit('chat-message', {
      message,
      // TODO This should return the username as well
    });
    cb();
  });

  socket.on('disconnect', () => {
    // socket.broadcast.emit('user-disconnected', user[socket.id]);
    // delete users[socket.id];
    console.log('A user has disconnected from the server');
  });
});

app.get('/', (req, res) => {
  res.send('This is a secure server');
});

server.listen(8000, () => {
  console.log('listening on 8000');
});
