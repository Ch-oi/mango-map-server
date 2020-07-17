const express = require('express')
const port = process.env.PORT || 8000
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
const knex = require('./database/config')

const UserRouter = require('./router/UserRouter')
const BlogRouter = require('./router/BlogRouter')
const ChatroomRouter = require('./router/ChatroomRouter')
const MapRouter = require('./router/MapRouter')

const UserService = require('./services/UserService')
const BlogService = require('./services/BlogService')
const ChatroomService = require('./services/ChatroomService')
const MapService = require('./services/MapService')

const userService = new UserService()
const blogService = new BlogService()
const chatroomService = new ChatroomService()
const mapService = new MapService()

// app.use('/user', new UserRouter(userService ).route());
// app.use('/chatroom', new ChatroomRouter(chatroomService ).route());
// app.use('/blog', new BlogRouter(blogService ).route());
// app.use('/map', new MapRouter(mapService ).route());


app.get('/', async (req, res) => {
    res.send()
})

app.listen(port, function () {
    console.log('listening on port' + port)
})

