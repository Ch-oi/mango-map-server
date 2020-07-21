// const ChatroomService = require('../services/ChatroomService')

// const knex = require('../database/config')

// //complet test list & add
// describe('testing chatroom services', () => {
//     let chatroomService
//     let chatroom_id = 1
//     let list_user_id = [1, 2, 3]
//     let user_id =1
//     let new_charRecord = {
//         body: "i love my pepe",
//         images: "https://picsum.photos/200/300"
//     }
//     let new_chatroom = {
//         name: 'sdf',
//         descriptions: 'sdf'

//     }

//     beforeEach(async () => {
//         await knex.migrate.rollback([{ directory: '../database/migrations' }])
//         await knex.migrate.latest([{ directory: '../database/migrations' }])
//         await knex.seed.run([{ directory: '../database/seeds' }])

//         chatroomService = new ChatroomService()
//     })

//     afterAll(async () => {
//         await knex.migrate.rollback([{ directory: '../database/migrations' }])
//         await knex.migrate.latest([{ directory: '../database/migrations' }])
//         await knex.seed.run([{ directory: '../database/seeds' }])
//         await knex.destroy()

//     })

//     test('list all chatrooms', () => {
//         return chatroomService.listChatrooms()
//             .then(res => {
//                 expect(res.length).toBe(3)
//                 expect(res[0].name).toBe('chat1')
//                 expect(typeof res[0].chatroomUser).toBe('object')

//             })

//     })
//     test('get one chatroom', () => {
//         return chatroomService.getChatroom(chatroom_id)
//             .then(res => {
//                 expect(res.name).toBe('chat1')
//                 expect(typeof res.chatroomUser).toBe('object')
//                 expect(res.chatroomUser.length).toBe(3)
//             })

//     })

//     test('get all users in a chatroom', () => {
//         return chatroomService.getChatroomUsers(chatroom_id)
//             .then(res => {
//                 expect(res.length).toBe(3)
//                 expect(res[1].user_id).toBe(2)
//             })
//     })

//     test('get all chat records of a room', () => {
//         return chatroomService.getRoomAllChatRecords(chatroom_id)
//             .then(res => {
//                 expect(res.length).toBe(3)
//                 expect(res[2].user_id).toBe(3)
//                 expect(res[2].chatRecords[0].body).toBe('body3')
//             })
//     })

//     test('add one chatroom', () => {
//         return chatroomService.addChatroom(new_chatroom, list_user_id)
//             .then(res => {
//                 expect(res.length).toBe(3)
//                 expect(res[0].user_id).toBe(1)
//                 expect(res[0].chatroom_id).toBe(4)
//             })

//     })
//     test('add chat record', () => {
//         return chatroomService.addChatRecord(new_charRecord, chatroom_id, user_id)
//             .then(res => {
//                 expect(res[0].body).toBe("i love my pepe")
//                 expect(res[0].chatroomUser_id).toBe(1)
//             })

//     })
// })
