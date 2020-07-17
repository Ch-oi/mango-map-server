const UserRouter = require('../router/UserRouter')

const UserService = require('../services/UserService')

const knex = require('../database/config')

let userService, userRouter, req, res, query
describe('UserRouter testing with userService', () => {

    beforeAll( async() => {
        res = {
            send: jest.fn().mockResolvedValue(true)
        }
        userService = {
            listUsers: jest.fn().mockResolvedValue(true),
            getUser: jest.fn().mockResolvedValue(true),
            getUserDistricts: jest.fn().mockResolvedValue(true),
            getUserDistrictsBlog: jest.fn().mockResolvedValue(true),
            getUserFavBlogs: jest.fn().mockResolvedValue(true),
            getUserChatrooms: jest.fn().mockResolvedValue(true),
            getUserChatroomRecords: jest.fn().mockResolvedValue(true),

            addUser: jest.fn().mockResolvedValue(true),
            addUserDistrict: jest.fn().mockResolvedValue(true),
            addUserFavBlog: jest.fn().mockResolvedValue(true),
            deleteUser: jest.fn().mockResolvedValue(true)
        }
        userRouter = new UserRouter(userService)

        req = {
            params:{
                id:1
            }
        } 
    })
    test('userRouter should call listUsers in response to a GET request', () => {

          userRouter.listUsers(req, res)
            .then(() => {
                expect(userRouter.listUsers).toHaveBeenCalled()
                expect(res.send).toHaveBeenCalled()
            })
    })
    test('userRouter should call getUser in response to a GET request', () => {


         userRouter.getUser(req, res)
            .then(() => {
                expect(userRouter.getUser).toHaveBeenCalledWith(req.params.id)
                expect(res.send).toHaveBeenCalled()
            })
    })
    test('userRouter should call getUserDistricts in response to a GET request', () => {


         userRouter.getUserDistricts(req, res)
            .then(() => {
                expect(userRouter.getUserDistricts).toHaveBeenCalledWith(req.params.id)
                expect(res.send).toHaveBeenCalled()
            })
    })
    test('userRouter should call getUserFavBlogs in response to a GET request', () => {


         userRouter.getUserFavBlogs(req, res)
            .then(() => {
                expect(userRouter.getUserFavBlogs).toHaveBeenCalledWith(req.params.id)
                expect(res.send).toHaveBeenCalled()
            })
    })
    test('userRouter should call getUserChatrooms in response to a GET request', () => {


         userRouter.getUserChatrooms(req, res)
            .then(() => {
                expect(userRouter.getUserChatrooms).toHaveBeenCalledWith(req.params.id)
                expect(res.send).toHaveBeenCalled()
            })
    })

    test('userRouter should call getUserChatroomRecords in response to a GET request', () => {

         userRouter.getUserChatroomRecords(req, res)
            .then(() => {
                expect(userRouter.getUserChatroomRecords).toHaveBeenCalledWith(req.params.id,req.params.id)
                expect(res.send).toHaveBeenCalled()
            })
    })

    test('userRouter should call getUserChatroomRecords in response to a GET request', () => {

         userRouter.getUserChatroomRecords(req, res)
            .then(() => {
                expect(userRouter.getUserChatroomRecords).toHaveBeenCalledWith(req.params.id,req.params.id)
                expect(res.send).toHaveBeenCalled()
            })
    })

    test('userRouter should call getUserChatroomRecords in response to a GET request', () => {

         userRouter.getUserChatroomRecords(req, res)
            .then(() => {
                expect(userRouter.getUserChatroomRecords).toHaveBeenCalledWith(req.params.id,req.params.id)
                expect(res.send).toHaveBeenCalled()
            })
    })

    
})