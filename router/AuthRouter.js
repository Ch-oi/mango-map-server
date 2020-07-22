const router = require('express').Router()
const passport = require('passport');

class AuthRouter {
    constructor() {
        this.router = router
    }
    route() {
        this.router.post('/local-login', passport.authenticate('local-login', {
            successRedirect: '/',
            failureRedirect: '/local-login'
        }))
        return this.router

    }
}

module.exports = AuthRouter