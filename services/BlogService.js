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

    let blogsDetailed = await this.compileImgCatCmt(results);

    return blogsDetailed;
  }

  async getBlogUserLocation(user_location_id) {
    let results = await knex('users_locations')
      .innerJoin('users', 'user_id', 'users.id')
      .innerJoin('locations', 'locations.id', 'location_id')
      .select('user_name', 'en')
      .where('users_locations.id', user_location_id)
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
    let cates = await knex('categories_blogs')
      .select('category')
      .innerJoin('categories', 'categories.id', 'categories_blogs.category_id')
      .where('blog_id', blog_id)
      .catch((err) => console.log(err));

    return cates;
  }
// get comments of individual blog post
  async getBlogComments(blog_id) {
    let comments = await knex('comments')
      .select('user_id','body', 'ref_comment_id','user_name')
      .innerJoin('users','user_id','users.id')
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
      let UserLocation = await this.getBlogUserLocation(blog.user_location_id);
      blog.images = images;
      blog.categories = categories;
      blog.comments = comments;
      blog.userName = UserLocation[0].user_name;
      blog.locationName = UserLocation[0].en;
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
      .insert({title,body,user_location_id:userLocation.id})
      .innerJoin('users_locations','user_location_id','users_locations.id')
      .returning('*')
      .catch((err) => console.log(err));

      await this.addBlogCategories(blog.categories,newBlog[0].id)
      
    return newBlog[0];
  }




  async getUserLocation(location_id,user_id){
    let res = await knex('users_locations')
    .where({location_id:location_id,user_id:user_id})

    return res[0]
  }

  async addBlogCategories(categories, blog_id) {


    let res = [];

    await knex.raw(
      'SELECT setval(\'"categories_blogs_id_seq"\', (SELECT MAX(id) from "categories_blogs"));'
    );
    for (let cate of categories) {
      
      let res = await knex('categories_blogs')
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

      console.log(results)
    return results[0];
  }

  //urls=[url,url]
  async addBlogImages(urls, blog_id) {
    let results = await knex('blogs')
      .innerJoin('users_locations', 'user_location_id', 'users_locations.id')
      .select('location_id')
      .where('blogs.id', blog_id)
      .catch((err) => console.log(err));

    let location_id = results[0].location_id;
    await knex.raw(
      'SELECT setval(\'"images_id_seq"\', (SELECT MAX(id) from "images"));'
    );
    let imgs = [];

    for (let url of urls) {
      let img = await knex('images')
        .insert({ url: url, blog_id: blog_id, location_id: location_id })
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
    await knex('categories_blogs')
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

    await knex('users_fav_blogs')
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
