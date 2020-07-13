import knex from '../database/index'

class BlogService {
    constructor() {
        this.blog = []
        this.images = []
        this.categories = []
    }

    async listBlogs() {
        let results =
            await knex('blogs')
                .select('*')
                .catch(err => console.log(err))

        return results
    }

    async listBlogImages(blog_id) {
        let results =
            await knex('blogs-images')
                .select('*')
                .where('blog_id', blog_id)
                .catch(err => console.log(err))

        this.images = results

        return this.images
    }

    async listBlogCategories(blog_id) {
        let results =
            await knex('categories-blogs')
                .select('category_id')
                .where('blog_id', blog_id)
                .catch(err => console.log(err))

        for (let cateId of results) {
            let blogCate = await knex('categories')
                .select('*')
                .where('id', cateId)
                .catch(err => console.log(err))

            this.categories.push(blogCate)
        }
        return this.categories
    }

    async compileImgCate(blogs){
        this.blog =[]

        for (let blog of blogs){

        let images = await this.listBlogImages(blog.id)
        let categories = await this.listBlogCategories(blog.id)

        blog.images = images
        blog.categories = categories

        }
        this.blog.push(blogs)

        return this.blog
    }

    async addBlogs(blog) {
        let results =
            await knex('blogs')
                .insert(blog)
                .returning('*')
                .catch(err => console.log(err))

        return results[0]
    }
    async deleteBlogs(id) {

    }



}