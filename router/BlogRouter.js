const router = require('express').Router();

class BlogRouter {
  constructor(passport,blogService) {
    this.blogService = blogService;
    this.router = router;
    this.passport = passport
  }

  route() {
    this.router.get('/all', this.listBlogs.bind(this));
    this.router.get('/categories', this.listCategories.bind(this));
    this.router.get('/:id', this.getBlog.bind(this));
    this.router.post('/images/:id', this.addBlogImages.bind(this));
    this.router.post('/categories/:id', this.addBlogCategories.bind(this));

    this.router.post('/favBlog/:bid/:uid', this.addFavBlog.bind(this));
    this.router.delete('/favBlog/:bid/:uid', this.deleteFavBlog.bind(this));

    this.router.post('/comment/', this.addBlogComment.bind(this));
    this.router.put('/comment/:id', this.updateComment.bind(this));
    this.router.delete('/comment/:id', this.deleteComment.bind(this));
    this.router.post('/', this.passport.authenticate('token', { session: false }),this.addBlog.bind(this));

    this.router.post('/categories', this.addCategories.bind(this));

    return this.router;
  }

  addFavBlog(req,res){
    let blog_id = req.params.bid
    let user_id = req.params.uid

    return this.blogService
      .addFavBlog(blog_id,user_id)
      .then((resu) => {
        res.send(resu);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteFavBlog(req,res){
    let blog_id = req.params.bid
    let user_id = req.params.uid

    return this.blogService
      .deleteFavBlog(blog_id,user_id)
      .then((resu) => {
        res.send(resu);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateComment(req, res) {
    let comment_id = req.params.id
    let comment = req.body

    return this.blogService
      .updateComment(comment,comment_id)
      .then((comment) => {
        res.send(comment);
      })
      .catch((err) => {
        console.log(err);
      });
  }


  deleteComment(req, res) {
    let comment_id = req.params.id

    return this.blogService
      .deleteComment(comment_id)
      .then((resu) => {
        res.send(resu);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  listBlogs(req, res) {
    return this.blogService
      .listBlogs()
      .then((blogs) => {
        res.send(blogs);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getBlog(req, res) {
    let blog_id = req.params.id;
    return this.blogService
      .getBlog(blog_id)
      .then((blog) => {
        res.send(blog);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // get comments individual blog post
  getBlogComments(req,res){
    let blog_id = req.params.id;
    return this.blogService
    .getBlogComments(blog_id)
    .then((comments) => {
      res.send(comments)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  addBlog(req, res) {
    let new_blog = { ...req.body };
    return this.blogService
      .addBlog(new_blog)
      .then((newBlog) => {
        res.send(newBlog);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  addBlogImages(req, res) {
    let urls = [...req.body.urls];
    let blog_id = req.params.id;
    return this.blogService
      .addBlogImages(urls, blog_id)
      .then((newImgs) => {
        res.send(newImgs);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addBlogComment(req, res) {
    let comment = { ...req.body };
    return this.blogService
      .addBlogComment(comment)
      .then((newComment) => {
        res.send(newComment);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addBlogCategories(req, res) {
    let cates_id = [...req.body.categories_id];
    let blog_id = req.params.id;
    return this.blogService
      .addBlogCategories(cates_id, blog_id)
      .then((newBlogCates) => {
        res.send(newBlogCates);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  listCategories(req, res) {
    return this.blogService
      .listCategories()
      .then((categories) => {
        res.send(categories);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addCategories(req, res) {
    let new_categories = [...req.body.categories];

    return this.blogService
      .addCategories(new_categories)
      .then((new_categories) => {
        res.send(new_categories);
      })
      .catch((err) => {
        console.log(err);
      });
  }

}


module.exports = BlogRouter;
