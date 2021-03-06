const knex = require("../database/config").knex;

class BlogService {
  constructor() {}

  async listBlogs() {
    let results = await knex("blogs")
      .select("id", "title", "user_location_id", "created_at")
      .catch((err) => console.log(err));

    for (let post of results) {
      let UserLocation = await this.getBlogUserLocation(post.user_location_id);
      let images = await this.getBlogImages(post.id);
      post.userName = UserLocation[0].user_name;
      post.locationName = UserLocation[0].en;
      post.images = images;
    }
    return results;
  }

  async listCategories() {
    let results = await knex("categories")
      .select("id", "category")
      .catch((err) => console.log(err));

    return results;
  }

  async getBlog(blog_id) {
    let results = await knex("blogs")
      .select("*")
      .where("id", blog_id)
      .catch((err) => console.log(err));

    let blogsDetailed = await this.compileImgCatCmt(results);

    return blogsDetailed;
  }
  //hello

  async compileImgCatCmt(blogs) {
    let blogsDetailed = [];

    for (let blog of blogs) {
      let images = await this.getBlogImages(blog.id);
      let categories = await this.getBlogCategories(blog.id);
      let comments = await this.getBlogComments(blog.id);
      let UserLocation = await this.getBlogUserLocation(blog.user_location_id);
      let favUsers = await this.getBlogFavUser(blog.id);

      blog.images = images;
      blog.categories = categories;
      blog.comments = comments;
      blog.userName = UserLocation[0].user_name;
      blog.locationName = UserLocation[0].en;
      blog.favUsers = favUsers;

      blogsDetailed.push(blog);
    }
    return blogsDetailed;
  }

  async getBlogImages(blog_id) {
    let results = await knex("images")
      .select("url")
      .where("blog_id", blog_id)
      .catch((err) => console.log(err));

    return results;
  }

  async getBlogCategories(blog_id) {
    let cates = await knex("categories_blogs")
      .select("category")
      .innerJoin("categories", "categories.id", "categories_blogs.category_id")
      .where("blog_id", blog_id)
      .catch((err) => console.log(err));

    return cates;
  }

  async getBlogComments(blog_id) {
    let comments = await knex("comments")
      .select(
        "comments.id",
        "user_id",
        "body",
        "ref_comment_id",
        "user_name",
        "blog_id"
      )
      .innerJoin("users", "user_id", "users.id")
      .where("blog_id", blog_id)
      .catch((err) => console.log(err));

    return comments;
  }

  async getBlogUserLocation(user_location_id) {
    let results = await knex("users_locations")
      .innerJoin("users", "user_id", "users.id")
      .innerJoin("locations", "locations.id", "location_id")
      .select("user_name", "en")
      .where("users_locations.id", user_location_id)
      .catch((err) => console.log(err));

    return results;
  }

  async getBlogFavUser(blog_id) {
    let users = await knex("users_fav_blogs")
      .select("id", "user_id")
      .where("blog_id", blog_id)
      .catch((err) => console.log(err));

    return users;
  }

  // blog=={location_id:,user_id:,title:,body:,category:[]}
  async addBlog(blog) {
    console.log(blog);

    let { title, body } = blog;
    let userLocation = await this.getUserLocation(
      blog.location_id,
      blog.user_id
    );

    console.log(typeof userLocation[0]);

    //if cannot get the userLocation create a new one
    if (typeof userLocation[0] == "undefined") {
      await knex.raw(
        'SELECT setval(\'"users_locations_id_seq"\', (SELECT MAX(id) from "users_locations"));'
      );
      userLocation = await knex("users_locations")
        .insert({ user_id: blog.user_id, location_id: blog.location_id })
        .returning("*")
        .catch((err) => console.log(err));

      console.log(userLocation);
    }

    await knex.raw(
      'SELECT setval(\'"blogs_id_seq"\', (SELECT MAX(id) from "blogs"));'
    );
    let newBlog = await knex("blogs")
      .insert({ title, body, user_location_id: userLocation[0].id })
      .innerJoin("users_locations", "user_location_id", "users_locations.id")
      .returning("*")
      .catch((err) => console.log(err));

    // link categories to post
    let cates = await this.addBlogCategories(blog.category, newBlog[0].id);

    newBlog[0].cates = cates;

    return newBlog[0];
  }

  // used by add Blog
  async getUserLocation(location_id, user_id) {
    let res = await knex("users_locations")
      .where({ location_id: location_id, user_id: user_id })
      .catch((err) => console.log(err));

    return res;
  }

  //comment={body:"",ref_comment_id:"",user_id:,blog_id:}
  async addBlogComment(comment) {
    await knex.raw(
      "SELECT setval('comments_id_seq', (SELECT MAX(id) from comments));"
    );

    let results = await knex("comments")
      .insert(comment)
      .returning("*")
      .catch((err) => console.log(err));

    console.log(results);
    return results[0];
  }

  //categories==[]
  async addBlogCategories(categories, blog_id) {
    let res = [];

    await knex.raw(
      'SELECT setval(\'"categories_blogs_id_seq"\', (SELECT MAX(id) from "categories_blogs"));'
    );
    for (let cate of categories) {
      let res = await knex("categories_blogs")
        .insert({ blog_id: blog_id, category_id: cate.id })
        .returning("*")
        .catch((err) => console.log(err));
      res.push(cate[0]);
    }
    return res;
  }

  //urls=['','']
  async addBlogImages(urls, blog_id) {
    await knex.raw(
      'SELECT setval(\'"images_id_seq"\', (SELECT MAX(id) from "images"));'
    );
    let imgs = [];

    for (let url of urls) {
      let img = await knex("images")
        .insert({ url: url, blog_id: blog_id })
        .returning("*")
        .catch((err) => console.log(err));

      imgs.push(img[0]);
    }
    console.log(imgs);
    return imgs;
  }

  async addFavBlog(blog_id, user_id) {
    await knex.raw(
      'SELECT setval(\'"users_fav_blogs_id_seq"\', (SELECT MAX(id) from "users_fav_blogs"));'
    );

    let resu = await knex("users_fav_blogs")
      .insert({ blog_id: blog_id, user_id: user_id })
      .returning("*")
      .catch((err) => console.log(err));

    return resu;
  }

  async deleteFavBlog(blog_id, user_id) {
    let resu = await knex("users_fav_blogs")
      .del()
      .where({ blog_id: blog_id, user_id: user_id })
      .returning("*")
      .catch((err) => console.log(err));

    return resu;
  }

  //comment=={body:}
  async updateComment(comment, comment_id) {
    let updated = await knex("comments")
      .update(comment)
      .where("id", comment_id)
      .returning("*")
      .catch((err) => console.log(err));

    return updated;
  }

  async deleteComment(comment_id) {
    let res = await knex("comments")
      .del()
      .where("id", comment_id)
      .returning("*")
      .catch((err) => console.log(err));
    return res;
  }

  // async getComment(comment_id) {
  //   let comment = await knex('comments')
  //     .select('id', 'body', 'ref_comment_id')
  //     .where('id', comment_id)
  //     .catch((err) => console.log(err));
  //   return comment;
  // }

  // async updateBlog(blog, blog_id) {
  //   let results = await knex('blogs')
  //     .update(blog)
  //     .where('id', blog_id)
  //     .returning('*')
  //     .catch((err) => console.log(err));

  //   return results[0];
  // }

  // // categories = ["",""]
  // async addCategories(categories) {
  //   await knex.raw(
  //     "SELECT setval('categories_id_seq', (SELECT MAX(id) from categories));"
  //   );

  //   let cates = [];
  //   for (let category of categories) {
  //     let cate = await knex('categories')
  //       .insert({ category: category })
  //       .returning('*')
  //       .catch((err) => console.log(err));
  //     cates.push(cate[0]);
  //   }
  //   return cates;
  // }

  // async deleteBlogs(blog_id) {
  //   await knex('categories_blogs')
  //     .del()
  //     .where('blog_id', blog_id)
  //     .returning('*')
  //     .catch((err) => console.log(err));

  //   await knex('images')
  //     .del()
  //     .where('blog_id', blog_id)
  //     .returning('*')
  //     .catch((err) => console.log(err));

  //   await knex('comments')
  //     .del()
  //     .where('blog_id', blog_id)
  //     .returning('*')
  //     .catch((err) => console.log(err));

  //   await knex('users_fav_blogs')
  //     .del()
  //     .where('blog_id', blog_id)
  //     .returning('*')
  //     .catch((err) => console.log(err));

  //   await knex('blogs')
  //     .del()
  //     .where('id', blog_id)
  //     .returning('*')
  //     .catch((err) => console.log(err));
  // }
}

module.exports = BlogService;
