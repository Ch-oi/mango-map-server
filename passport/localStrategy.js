// const JWTStrategy = require('passport-jwt').Strategy
// const ExtractJWT = require('passport-jwt').ExtractJwt
// const config = require('./config')
const knex = require('../database/config')

// const express = require('express')
// const app = express()
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt')

// const options =
// {
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrKey: webkitConvertPointFromPageToNode.jwtSecret,
// }



function initializeLocal(passport) {
    
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
    },
        async (email, password, done) => {
            try {

                let user = await knex('users').where({ email: email })
                if (user.length == 0) {
                    return done(null, false, { message: 'Incorrect email' })
                }
                console.log(user)
                let result = await bcrypt.compare(password, user[0].password)
                console.log(result)
                if (result) {
                    return done(null, user)
                }
                else {
                    return done(null, false, { message: 'Incorrect password' })
                }
            }
            catch (err) {
                return done(err);
            }
        }
    ))
    passport.serializeUser((user, done) => { 
        done(null, user.id) 
    })
    passport.deserializeUser(async (id, done) => {
        let users = await knex('users').where({ id: id });
        if (users.length == 0) {
            return done(new Error(`Wrong user id ${id}`));
        }
        let user = users[0];
        return done(null, user);
    });
}

module.exports = initializeLocal