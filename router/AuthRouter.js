const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class AuthRouter {
  constructor() {
    this.router = router;
  }
  route() {
    this.router.post(
      '/local-login',
      passport.authenticate('local-login', {
        session: false,
      }),
      this.jwtSigning
    );

    this.router.post(
      '/local-signup',
      passport.authenticate('local-signup', {
        session: false,
      }),
      (req, res) => {
        res.json({
          message: 'Signup successful',
          user: req.user,
        });
      }
    );

    this.router.get(
      '/google-login',
      passport.authenticate('google', {
        scope: ['profile', 'email'],
      })
    );
    this.router.get(
      '/google/redirect',
      passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/',
      })
    );

    this.router.get(
      '/facebook-login',
      passport.authenticate('facebook', {
        scope: ['profile', 'email'],
      })
    );
    this.router.get(
      '/facebook/redirect',
      passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/',
      })
    );
    this.router.get('/logout', this.logout.bind(this));

    return this.router;
  }
  async jwtSigning(req, res) {
    try {
      console.log(req.user);
      const { id, user_name } = req.user
      const token = jwt.sign({ id: req.user.id }, process.env.SECRET_KEY);

      return res.json({
        id,
        user_name,
        token: token
      });
    } catch (error) {
      return res.send(error);
    }
  }

  logout(req, res) {
    req.logout();
    console.log('Logged out');
    res.redirect('/');
  }
}

module.exports = AuthRouter;
