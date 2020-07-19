const ChatroomRouter = require('../router/ChatroomRouter')

const ChatroomService = require('../services/ChatroomService')

let chatroomService, chatroomRouter, req, res

describe('test chatroom router method', () => {

    beforeAll(() => {
        chatroomService = {
            listChatrooms: jest.fn().mockResolvedValue(true),
            getChatroom: jest.fn().mockResolvedValue(true),
            addChatroom: jest.fn().mockResolvedValue(true),
            getChatroomUsers: jest.fn().mockResolvedValue(true),
            addChatRecord: jest.fn().mockResolvedValue(true),
            getRoomAllChatRecords: jest.fn().mockResolvedValue(true),
        }

        req = {
            params: {
                id: 1
            },
            body: {
                name: '123',
                descriptions: 'd',
            },
            user: {
                id: 1
            }
        }

        res = {
            send: jest.fn().mockReturnValue(true)
        }
        chatroomRouter = new ChatroomRouter(chatroomService)
    })

    it('chatroom router should call ',()=>{
        
    })
})