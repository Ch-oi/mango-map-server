const BlogRouter = require('../router/BlogRouter')

const BlogService = require('../services/BlogService')

const knex = require('../database/config')

let blogRouter, blogService , req, res

describe('BlogRouter testing with BlogService',()=>{

    beforeAll(()=>{
        blogService={
            listBlogs:jest.fn().mockResolvedValue(true),
            getBlog:jest.fn().mockResolvedValue(true),
            addBlog:jest.fn().mockResolvedValue(true),
            addBlogImages:jest.fn().mockResolvedValue(true),
            addBlogCategories:jest.fn().mockResolvedValue(true),
            addBlogComment:jest.fn().mockResolvedValue(true),
            listCategories:jest.fn().mockResolvedValue(true),
            addCategories:jest.fn().mockResolvedValue(true)
        }
        res={
            send:jest.fn().mockReturnValue(true),
        }
        req = {
            params:{
                id:1
            },
            body:{
                urls:'',
                categories_id:[1,2],
                categories:["a","b"]
            }
        } 
        blogRouter = new BlogRouter(blogService)
    })

    it('blogRouter should call listBlogs',()=>{
        blogRouter.listBlogs(req,res)
        .then(()=>{
            expect(blogService.listBlogs).toBeCalled()
            expect(res.send).toBeCalled()
        })
    })
    it('blogRouter should call getBlog',()=>{
        blogRouter.getBlog(req,res)
        .then(()=>{
            expect(blogService.getBlog).toBeCalled()
            expect(res.send).toBeCalled()
        })
    })
    it('blogRouter should call addBlog',()=>{
        blogRouter.addBlog(req,res)
        .then(()=>{
            expect(blogService.addBlog).toBeCalled()
            expect(res.send).toBeCalled()
        })
    })
    it('blogRouter should call addBlogImages',()=>{
        blogRouter.addBlogImages(req,res)
        .then(()=>{
            expect(blogService.addBlogImages).toBeCalled()
            expect(res.send).toBeCalled()
        })
    })
    it('blogRouter should call addBlogCategories',()=>{
        blogRouter.addBlogCategories(req,res)
        .then(()=>{
            expect(blogService.addBlogCategories).toBeCalled()
            expect(res.send).toBeCalled()
        })
    })
    it('blogRouter should call addBlogComment',()=>{
        blogRouter.addBlogComment(req,res)
        .then(()=>{
            expect(blogService.addBlogComment).toBeCalled()
            expect(res.send).toBeCalled()
        })
    })
    it('blogRouter should call listCategories',()=>{
        blogRouter.listCategories(req,res)
        .then(()=>{
            expect(blogService.listCategories).toBeCalled()
            expect(res.send).toBeCalled()
        })
    })
    it('blogRouter should call addCategories',()=>{
        blogRouter.addCategories(req,res)
        .then(()=>{
            expect(blogService.addCategories).toBeCalled()
            expect(res.send).toBeCalled()
        })
    })
})