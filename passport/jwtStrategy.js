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
                const user = await knex('users').where('id', payload.id)
                return done(null, user)

            }
            catch (error) {
                return done(error);
            }
            // let res = await User.forge({ id: payload.id }).fetch()
            // next(null, res);
        }))
}

module.exports = initializeJwt