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

  async getBlogUserDistrict(userDistrict_id) {
    let results = await knex('users-districts')
      .innerJoin('users', 'user_id', 'users.id')
      .innerJoin('districts', 'districts.id', 'district_id')
      .select('user_name', 'en')
      .where('users-districts.id', userDistrict_id)
      .catch((err) => console.log(err));

    return results
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
      let userDistrict = await this.getBlogUserDistrict(blog.userDistrict_id)
      blog.images = images;
      blog.categories = categories;
      blog.comments = comments;
      blog.userName = userDistrict[0].user_name
      blog.districtName = userDistrict[0].en
      blogsDetailed.push(blog);
    }
    return blogsDetailed;
  }

  async addBlog(blog) {
    await knex.raw(
      'SELECT setval(\'"blogs_id_seq"\', (SELECT MAX(id) from "blogs"));'
    );

    let results = await knex('blogs')
      .insert(blog)
      .returning('*')
      .catch((err) => console.log(err));

    return results[0];
  }

  async updateBlog(blog,blog_id) {

    let results = await knex('blogs')
      .update(blog)
      .where('id',blog_id)
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
      .innerJoin('users-districts', 'userDistrict_id', 'users-districts.id')
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

  async addBlogCategories(categories_id, blog_id) {
    await knex.raw(
      'SELECT setval(\'"categories-blogs_id_seq"\', (SELECT MAX(id) from "categories-blogs"));'
    );

    let cates = [];

    for (let cate_id of categories_id) {
      let cate = await knex('categories-blogs')
        .insert({ category_id: cate_id, blog_id: blog_id })
        .returning('*')
        .catch((err) => console.log(err));
      cates.push(cate[0]);
    }
    return cates;
  }

  async listCategories() {
    let results = await knex('categories')
      .select('*')
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
