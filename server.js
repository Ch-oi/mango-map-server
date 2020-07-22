// var fs = require('fs');
// var https = require('https');
require('dotenv').config()

const passport = require('passport')
const express = require('express');
const session = require('express-session');
const port = process.env.PORT || 8000;
const app = express();
const initializeLocal = require('./passport/localStrategy')


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}
));

app.use(passport.initialize());
app.use(passport.session());

initializeLocal(passport)


const knex = require('./database/config')

const UserRouter = require('./router/UserRouter');
const BlogRouter = require('./router/BlogRouter');
const ChatroomRouter = require('./router/ChatroomRouter');
const MapRouter = require('./router/MapRouter');
const AuthRouter = require('./router/AuthRouter');

const UserService = require('./services/UserService');
const BlogService = require('./services/BlogService');
const ChatroomService = require('./services/ChatroomService');
const MapService = require('./services/MapService');

const userService = new UserService();
const blogService = new BlogService();
const chatroomService = new ChatroomService();
const mapService = new MapService();

app.use('/chatroom', new ChatroomRouter(chatroomService).route());
app.use('/user', new UserRouter(userService).route());
app.use('/blog', new BlogRouter(blogService).route());
app.use('/map', new MapRouter(mapService).route());
app.use('/auth', new AuthRouter().route());

app.get('/', async (req, res) => {
  res.send();
});

app.get('/auth/local-login', async (req, res) => {
  console.log(req.session)
  res.send();
});

app.listen(port, function () {
  console.log('listening on port' + port);
});
