const knex = require('../database/config').knex;

class BlogService {
  constructor() {
    this.blogs = [];
    this.images = [];
    this.categories = [];
  }

  async listBlogs() {
    let results = await knex('blogs')
      .select('*')
      .catch((err) => console.log(err));

    let blogs = await this.compileImgCatCmt(results);
    this.blogs = blogs;
    return this.blogs;
  }

  async getBlog(blog_id) {
    let results = await knex('blogs')
      .select('*')
      .where('id', blog_id)
      .catch((err) => console.log(err));

    let blogs = await this.compileImgCatCmt(results);
    this.blogs = blogs;
    return this.blogs;
  }

  async getBlogUserLocation(UserLocation_id) {
    let results = await knex('users-districts')
      .innerJoin('users', 'user_id', 'users.id')
      .innerJoin('districts', 'districts.id', 'district_id')
      .select('user_name', 'en')
      .where('users-districts.id', UserLocation_id)
      .catch((err) => console.log(err));

    return results;
  }

  async getBlogImages(blog_id) {
    let results = await knex('images')
      .select('url')
      .where('blog_id', blog_id)
      .catch((err) => console.log(err));

    return results;
  }

  async getBlogCategories(blog_id) {
    let cates = await knex('categories-blogs')
      .select('category')
      .innerJoin('categories', 'categories.id', 'categories-blogs.category_id')
      .where('blog_id', blog_id)
      .catch((err) => console.log(err));

    return cates;
  }

  async getBlogComments(blog_id) {
    let comments = await knex('comments')
      .select('body', 'ref_comment_id')
      .where('blog_id', blog_id)
      .catch((err) => console.log(err));

    return comments;
  }

  async getComment(comment_id) {
    let comment = await knex('comments')
      .select('body', 'ref_comment_id')
      .where('id', comment_id)
      .catch((err) => console.log(err));
    return comment;
  }

  async compileImgCatCmt(blogs) {
    let blogsDetailed = [];

    for (let blog of blogs) {
      let images = await this.getBlogImages(blog.id);
      let categories = await this.getBlogCategories(blog.id);
      let comments = await this.getBlogComments(blog.id);
      let UserLocation = await this.getBlogUserLocation(blog.UserLocation_id);
      blog.images = images;
      blog.categories = categories;
      blog.comments = comments;
      blog.userName = UserLocation[0].user_name;
      blog.districtName = UserLocation[0].en;
      blogsDetailed.push(blog);
    }
    return blogsDetailed;
  }

  async addBlog(blog) {

    let { title, body } = blog
    let userLocation = await this.getUserLocation(blog.location_id,blog.user_id)
    
    await knex.raw(
      'SELECT setval(\'"blogs_id_seq"\', (SELECT MAX(id) from "blogs"));'
    );

    let newBlog = await knex('blogs')
      .insert({title,body,userLocation_id:userLocation.id})
      .innerJoin('users-locations','userLocation_id','users-locations.id')
      .returning('*')
      .catch((err) => console.log(err));

      await this.addBlogCategories(blog.categories,newBlog[0].id)
      
    return newBlog[0];
  }




  async getUserLocation(location_id,user_id){
    let res = await knex('users-locations')
    .where({location_id:location_id,user_id:user_id})

    return res[0]
  }

  async addBlogCategories(categories, blog_id) {


    let res = [];

    await knex.raw(
      'SELECT setval(\'"categories-blogs_id_seq"\', (SELECT MAX(id) from "categories-blogs"));'
    );
    for (let cate of categories) {
      
      let res = await knex('categories-blogs')
        .insert({ blog_id: blog_id ,category_id:cate.id})
        .returning('*')
        .catch((err) => console.log(err));
      res.push(cate[0]);
    }
    return res;
  }

  async updateBlog(blog, blog_id) {
    let results = await knex('blogs')
      .update(blog)
      .where('id', blog_id)
      .returning('*')
      .catch((err) => console.log(err));

    return results[0];
  }

  //comment={body:"",ref_comment_id:"",user_id:,blog_id:}
  async addBlogComment(comment) {
    await knex.raw(
      "SELECT setval('comments_id_seq', (SELECT MAX(id) from comments));"
    );

    let results = await knex('comments')
      .insert(comment)
      .returning('*')
      .catch((err) => console.log(err));

    return results[0];
  }

  //urls=[url,url]
  async addBlogImages(urls, blog_id) {
    let results = await knex('blogs')
      .innerJoin('users-districts', 'UserLocation_id', 'users-districts.id')
      .select('district_id')
      .where('blogs.id', blog_id)
      .catch((err) => console.log(err));

    let district_id = results[0].district_id;
    await knex.raw(
      'SELECT setval(\'"images_id_seq"\', (SELECT MAX(id) from "images"));'
    );
    let imgs = [];

    for (let url of urls) {
      let img = await knex('images')
        .insert({ url: url, blog_id: blog_id, district_id: district_id })
        .returning('*')
        .catch((err) => console.log(err));

      imgs.push(img[0]);
    }
    return imgs;
  }

  // categories = ["",""]
  async addCategories(categories) {
    await knex.raw(
      "SELECT setval('categories_id_seq', (SELECT MAX(id) from categories));"
    );

    let cates = [];
    for (let category of categories) {
      let cate = await knex('categories')
        .insert({ category: category })
        .returning('*')
        .catch((err) => console.log(err));
      cates.push(cate[0]);
    }
    return cates;
  }


  async listCategories() {
    let results = await knex('categories')
      .select('id','category')
      .catch((err) => console.log(err));

    return results;
  }

  async deleteBlogs(blog_id) {
    await knex('categories-blogs')
      .del()
      .where('blog_id', blog_id)
      .returning('*')
      .catch((err) => console.log(err));

    await knex('images')
      .del()
      .where('blog_id', blog_id)
      .returning('*')
      .catch((err) => console.log(err));

    await knex('comments')
      .del()
      .where('blog_id', blog_id)
      .returning('*')
      .catch((err) => console.log(err));

    await knex('users-favBlogs')
      .del()
      .where('blog_id', blog_id)
      .returning('*')
      .catch((err) => console.log(err));

    await knex('blogs')
      .del()
      .where('id', blog_id)
      .returning('*')
      .catch((err) => console.log(err));
  }
}

module.exports = BlogService;
