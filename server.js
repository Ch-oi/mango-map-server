var fs = require('fs');
var https = require('https');
require('dotenv').config();

const passport = require('passport');
const express = require('express');
// const session = require('express-session');
const port = process.env.PORT || 8000;
const app = express();
<<<<<<< HEAD
const initializeLocal = require('./passport/localStrategy');
=======

const initializeLocal = require('./passport/localStrategy')
const initializeJwt = require('./passport/jwtStrategy')
const initializeGoogle = require('./passport/googleStrategy')
const initializeFacebook = require('./passport/facebookSrategy')
>>>>>>> 1b2d73642076f93a1ebd67333859bdbec566fa93

const key = fs.readFileSync('./key.pem');
const cert = fs.readFileSync('./cert.pem');

const server = https.createServer({ key: key, cert: cert }, app);
const socketio = require('socket.io');
const io = socketio(server);

const axios = require('axios');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

<<<<<<< HEAD
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
=======

// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false
// }
// ));
>>>>>>> 1b2d73642076f93a1ebd67333859bdbec566fa93

app.use(passport.initialize());
// app.use(passport.session());

<<<<<<< HEAD
initializeLocal(passport);

const knex = require('./database/config');

=======

initializeLocal(passport)
initializeGoogle(passport)
initializeFacebook(passport)
initializeJwt(passport)

const ImageRouter = require('./router/ImageRouter');
>>>>>>> 1b2d73642076f93a1ebd67333859bdbec566fa93
const UserRouter = require('./router/UserRouter');
const BlogRouter = require('./router/BlogRouter');
const ChatroomRouter = require('./router/ChatroomRouter');
const MapRouter = require('./router/MapRouter');
const AuthRouter = require('./router/AuthRouter');

const ImageService = require('./services/ImageService');
const UserService = require('./services/UserService');
const BlogService = require('./services/BlogService');
const ChatroomService = require('./services/ChatroomService');
const MapService = require('./services/MapService');

const userService = new UserService();
const blogService = new BlogService();
const chatroomService = new ChatroomService();
const mapService = new MapService();
const imageService = new ImageService();

app.use('/chatroom', new ChatroomRouter(chatroomService).route());
app.use('/user', new UserRouter(userService).route());
app.use('/blog', new BlogRouter(blogService).route());
app.use('/map', new MapRouter(mapService).route());
app.use('/image', new ImageRouter(imageService).route());
app.use('/auth', new AuthRouter().route());

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

app.get('/',
  passport.authenticate('token',
    { session: false }), (req, res) => {
      res.json({
        message: 'You made it to the secure route',
        user: req.user
      })
    
    });


server.listen(port, function () {
  console.log('listening on port' + port);
});

