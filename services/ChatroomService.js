
const knex = require('../database/config')

class ChatroomService {
    constructor() {
        this.chatrooms = []
        this.chatroom = {}
    }

    //list all chatrooms
    async listChatrooms() {
        let chatrooms =
            await knex('chatrooms')
                .select('*')
                .catch(err => console.log(err))

        // for (let chatroom of chatrooms) {
        //     let chatroomUsers = await this.getRoomAllChatRecords(chatroom.id)
        //     chatroom.chatroomUser = chatroomUsers
        // }
        this.chatrooms = chatrooms
        return this.chatrooms
    }

    //get one specfic chatroom by id
    async getChatroom(chatroom_id) {
        let chatroom =
            await knex('chatrooms')
                .select('*')
                .where('id', chatroom_id)
                .catch(err => console.log(err))

        let chatroomUser = await this.getRoomAllChatRecords(chatroom[0].id)
        chatroom[0].chatroomUser = chatroomUser
        this.chatroom = chatroom[0]
        return this.chatroom
    }

    //add new chatroom 
    //chatroom = {name:'sdf',descriptions:'sdf'}
    //user_id = [...]
    async addChatroom(chatroom, users_id) {

        await knex.raw('SELECT setval(\'chatrooms_id_seq\', (SELECT MAX(id) from chatrooms));')
        let newChatRoom =
            await knex('chatrooms')
                .insert(chatroom)
                .returning('*')
                .catch(err => console.log(err))

        const fieldToInsert = users_id.map(user_id =>
            ({ chatroom_id: newChatRoom[0].id, user_id: user_id }))

        await knex.raw('SELECT setval(\'"chatrooms-users_id_seq"\', (SELECT MAX(id) from "chatrooms-users"));')
        let newChatroomDetailed = await knex('chatrooms-users')
            .insert(fieldToInsert)
            .returning('*')
            .catch(err => console.log(err))

        return newChatroomDetailed
    }

    async updateChatroom(chatroom, chatroom_id, users_id) {

        let updateChatRoom =
            await knex('chatrooms')
                .update(chatroom)
                .where('id', chatroom_id)
                .returning('*')
                .catch(err => console.log(err))


        await knex('chatrooms-users').del().where('chatroom_id',updateChatRoom[0].id).catch(err => console.log(err))

        await knex.raw('SELECT setval(\'"chatrooms-users_id_seq"\', (SELECT MAX(id) from "chatrooms-users"));')

        const fieldToInsert = users_id.map(user_id =>
            ({ chatroom_id: updateChatRoom[0].id, user_id: user_id }))

        let newChatroomDetailed = await knex('chatrooms-users')
            .insert(fieldToInsert)
            .returning('*')
            .catch(err => console.log(err))

        return newChatroomDetailed
    }



    //add a new chat record 
    //charRecord={body:"",images:""}
    async addChatRecord(chatRecord, chatroom_id, user_id) {

        let chatroomUser = await knex('chatrooms-users')
            .select('*')
            .where('chatroom_id', chatroom_id)
            .andWhere('user_id', user_id)
            .catch(err => console.log(err))

        await knex.raw('SELECT setval(\'"chatRecords_id_seq"\', (SELECT MAX(id) from "chatRecords"));')
        let newChatRecord =
            await knex('chatRecords')
                .insert({ ...chatRecord, chatroomUser_id: chatroomUser[0].id })
                .returning('*')
                .catch(err => console.log(err))

        return newChatRecord
    }

    //delete one specfic chatroom by id
    async deleteChatroom(chatroom_id) {

        let chatroomUsers = await this.getChatroomUsers(chatroom_id)

        for (let chatroomUser of chatroomUsers) {
            await knex('chatRecords')
                .del()
                .where('chatroomUser_id', chatroomUser.id)
                .catch((err) => console.log(err))
        }

        await knex('chatrooms-users')
            .del()
            .where('chatroom_id', chatroom_id)
            .returning('*')
            .catch((err) => console.log(err))

        await knex('chatrooms')
            .del()
            .where('id', chatroom_id)
            .catch((err) => console.log(err))

        return chatroom_id
    }

    //get all users id in a chatroom
    async getChatroomUsers(chatroom_id) {
        let chatroomUsers =
            await knex('chatrooms-users')
                .select('*')
                .where('chatroom_id', chatroom_id)
                .catch((err) => console.log(err))

        return chatroomUsers
    }



    //get all chat records of a room
    async getRoomAllChatRecords(chatroom_id) {
        let chatroomUsers = await this.getChatroomUsers(chatroom_id)

        let chatRecords = []

        for (let chatroomUser of chatroomUsers) {
            chatRecords = await this.getChatroomUserRecords(chatroomUser)
            chatroomUser.chatRecords = chatRecords
        }
        return chatroomUsers
    }

    async getChatroomUserRecords(chatroomUser) {
        let chatRecords =
            await knex('chatRecords')
                .select('*')
                .where('chatroomUser_id', chatroomUser.id)
                .catch((err) => console.log(err))

        return chatRecords
    }
}


module.exports = ChatroomService