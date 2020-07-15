const UserService = require('../services/UserService')

const knex = require('../database/config')

describe('test user services',()=>{
    let userService
    let user_id = 1
    let chatroom_id = 1
    let district_id = 1 
    let blog_id = 1 
    let new_user ={
        user_name:'demo',
        email:'d@d',
        password: 'password',
        description: 'demo1',
        profile_picture_URL: 'https://picsum.photos/200/300',
        security_question:'demo q',
        security_answer:'demo a',
        }

    beforeEach(async () => {
        await knex.migrate.rollback([{ directory: '../database/migrations' }])
        await knex.migrate.latest([{ directory: '../database/migrations' }])
        await knex.seed.run([{ directory: '../database/seeds' }])

        userService = new UserService()
    })

    afterAll(async () => {
        await knex.migrate.rollback([{directory: '../database/migrations'}])
        await knex.migrate.latest([{directory: '../database/migrations'}])
        await knex.seed.run([{directory: '../database/seeds'}])
    })

    test('list all users',()=>{
        return userService.listUsers()
        .then(res=>{
            expect(res.length).toBe(3)
            expect(res[0].id).toBe(1)
            expect(typeof res[0].districts).toBe('object')
            expect(typeof res[0].chatrooms).toBe('object')
            expect(typeof res[0].favBlogs).toBe('object')
        })
    })
    test('get one user',()=>{
        return userService.getUser(user_id)
        .then(res=>{
            expect(res[0].id).toBe(1)
            expect(res[0].user_name).toBe('Edwin')
            expect(typeof res[0].districts).toBe('object')
            expect(typeof res[0].chatrooms).toBe('object')
            expect(typeof res[0].favBlogs).toBe('object')
        })
    })
    test('get one user\'s districts',()=>{
        return userService.getUserDistricts(user_id)
        .then(res=>{
            console.log(res)
            expect(res[0].id).toBe(1)
            expect(res[0].name).toBe('central')
        })
    })
    test('get user\'s fav blogs',()=>{
        return userService.getUserFavBlogs(user_id)
        .then(res=>{
            console.log(res)
            expect(res.length).toBe(3)
            expect(res[1].title).toBe('title2')
        })
    })
    test('get user\'s Chatrooms',()=>{
        return userService.getUserChatrooms(user_id)
        .then(res=>{
            console.log(res)
            expect(res[0].chatroom_id).toBe(1)
            expect(res[0].name).toBe('chat1')
        })
    })
    test('get user\'s ChatRecords in one room',()=>{
        return userService.getUserChatRecords(chatroom_id,user_id)
        .then(res=>{
            console.log(res)
            expect(res[0].chatroom_id).toBe(1)
            expect(res[0].user_id).toBe(1)
            expect(res[0].chatRecords[0].body).toBe('body1')
        })
    })

    test('add new user',()=>{
        return userService.addUser(new_user)
        .then(res=>{
            console.log(res)
           expect(res[0].id).toBe(4)
           expect(res[0].security_question).toBe('demo q')
        })
    })

    test('add user new district',()=>{
        return userService.addUserDistrict(user_id,district_id)
        .then(res=>{
            console.log(res)
           expect(res[0].id).toBe(4)
           expect(res[0].district_id).toBe(1)
        })
    })

    test('add user new favBlog',()=>{
        return userService.addUserFavBlog(user_id,blog_id)
        .then(res=>{
            console.log(res)
           expect(res[0].id).toBe(4)
           expect(res[0].blog_id).toBe(1)
        })
    })

})