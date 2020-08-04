const router = require('express').Router();


class UserRouter {
  constructor(passport, userService) {
    this.userService = userService;
    this.passport = passport
    this.router = router;
  }
  route() {
    this.router.get('/all', this.listUsers.bind(this));
    this.router.get('/one/:id', this.passport.authenticate('token', { session: false }), this.getUser.bind(this));
    this.router.get('/:uid/tripDetails/:lid', this.passport.authenticate('token', { session: false }), this.getUserLocation.bind(this));
    
    this.router.put('/one/:id', this.passport.authenticate('token', { session: false }),this.updateUser.bind(this));
    
    // this.router.get('/one/:id/favoriteBlogs', this.getUserFavBlogs.bind(this));
    // this.router.post('/:uid/location/:lid', this.addUserLocation.bind(this));


    return this.router;
  }


  updateUser(req, res) {
    let payload = {
      userInfo:{...req.body},
      user_id : req.params.id
    }

    return this.userService.updateUser(payload)
      .then(result => res.send(result))
      .catch((err) => console.log(err));
  }

  getUserLocation(req, res) {
    let payload = {
      location_id: req.params.lid,
      user_id: req.params.uid
    }

    return this.userService.getUserLocation(payload)
      .then(result => res.send(result))
      .catch((err) => console.log(err));

  }


  listUsers(req, res) {
    return this.userService
      .listUsers()
      .then((users) => {
        res.send(users);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getUser(req, res) {
    let user_id = req.params.id;
    return this.userService
      .getUser(user_id)
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addUserFavBlog(req, res) {
    let user_id = req.params.uid;
    let blog_id = req.params.bid;
    return this.userService
      .addUserFavBlog(user_id, blog_id)
      .then((results) => {
        res.send(results);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  addUserLocation(req, res) {
    let user_id = req.params.uid;
    let location_id = req.params.did;
    return this.userService
      .addUserLocation(user_id, location_id)
      .then((results) => {
        res.send(results);
      })
      .catch((err) => {
        console.log(err);
      });
  }



}

module.exports = UserRouter;
