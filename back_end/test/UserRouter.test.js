const UserRouter = require('../router/UserRouter')

const UserService = require('../services/UserService')

const knex = require('../database/config')

let userService, userRouter, req, res
describe('UserRouter testing with userService', () => {

    beforeAll(() => {
        res = {
            send: jest.fn().mockReturnValue(true)
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

        req = {
            params: {
                id: 1,
                uid:1,
                cid:1,
                bid:1,
                did:1
            },
            body: {
                user_name:'1',
            }
        }
        userRouter = new UserRouter(userService)

    })
    it('userRouter should call listUsers in response to a GET request', () => {

        userRouter.listUsers(req, res)
            .then(() => {
                expect(userRouter.listUsers).toBeCalled()
                expect(res.send).toBeCalled()
            })
    })
    it('userRouter should call getUser in response to a GET request', () => {


        userRouter.getUser(req, res)
            .then(() => {
                expect(userRouter.getUser).toBeCalled()
                expect(res.send).toBeCalled()
            })
    })
    it('userRouter should call getUserDistricts in response to a GET request', () => {


        userRouter.getUserDistricts(req, res)
            .then(() => {
                expect(userRouter.getUserDistricts).toBeCalled()
                expect(res.send).toBeCalled()
            })
    })
    it('userRouter should call getUserFavBlogs in response to a GET request', () => {


        userRouter.getUserFavBlogs(req, res)
            .then(() => {
                expect(userRouter.getUserFavBlogs).toBeCalled()
                expect(res.send).toBeCalled()
            })
    })
    it('userRouter should call getUserChatrooms in response to a GET request', () => {


        userRouter.getUserChatrooms(req, res)
            .then(() => {
                expect(userRouter.getUserChatrooms).toBeCalled()
                expect(res.send).toBeCalled()
            })
    })

    it('userRouter should call getUserChatroomRecords in response to a GET request', () => {

        userRouter.getUserChatroomRecords(req, res)
            .then(() => {
                expect(userRouter.getUserChatroomRecords).toBeCalled()
                expect(res.send).toBeCalled()
            })
    })

    it('userRouter should call addUser in response to a POST request', () => {

        userRouter.addUser(req, res)
            .then(() => {
                expect(userRouter.addUser).toBeCalled()
                expect(res.send).toBeCalled()
            })
    })
    it('userRouter should call addUserFavBlog in response to a POST request', () => {

        userRouter.addUserFavBlog(req, res)
            .then(() => {
                expect(userRouter.addUserFavBlog).toBeCalled()
                expect(res.send).toBeCalled()
            })
    })
    it('userRouter should call addUserDistrict in response to a POST request', () => {

        userRouter.addUserDistrict(req, res)
            .then(() => {
                expect(userRouter.addUserDistrict).toBeCalled()
                expect(res.send).toBeCalled()
            })
    })




})