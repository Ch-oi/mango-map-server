const router = require('express').Router()
const passport = require('passport');
const jwt = require('jsonwebtoken')
require('dotenv').config()

class AuthRouter {
    constructor() {
        this.router = router

    }
    route() {
        this.router.post('/local-login', passport.authenticate('local-login', {
            session: false
        }), async (req, res) => {
            try {

                const token = jwt.sign({ id: req.user[0].id }, process.env.SECRET_KEY);
                return res.json({ token });
            } catch (error) {
                return res.send(error);
            }
        })

        this.router.post('/local-signup', passport.authenticate('local-signup', {
            session: false
        }), (req, res) => {
            res.json({
                message: 'Signup successful',
                user: req.user
            });
        })
        return this.router

    }

}

module.exports = AuthRouter