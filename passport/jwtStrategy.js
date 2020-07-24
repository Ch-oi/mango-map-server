const knex = require('../database/config').knex
const passportJwt = require('passport-jwt')
const JwtStrategy = passportJwt.Strategy
const ExtractJwt = passportJwt.ExtractJwt

require('dotenv').config()



function initializeJwt(passport) {
    const options = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRET_KEY
    }


    passport.use('token', new JwtStrategy(
        options,
        async (payload, done) => {
            try {
                console.log(payload)
                const user = await knex('users').where('id', payload.id)
                return done(null, user)

            }
            catch (error) {
                return done(error);
            }

        }))
}

module.exports = initializeJwt