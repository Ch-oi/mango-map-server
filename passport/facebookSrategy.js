require('dotenv').config()

const FacebookStrategy = require('passport-facebook').Strategy

function initializeFacebook(passport) {
    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: `https://localhost:${process.env.PORT}/auth/facebook/redirect`,
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            console.log("access token: ", accessToken);
            let registeredWithFacebook = await knex('users').where('Facebook_ID', profile.id)
            let registeredWithLocal = await knex('users').where('email', profile.emails[0].value)

            if (registeredWithFacebook) {
                done(null, registeredWithFacebook[0])
            } else if (registeredWithLocal) {
                let updateUser = await knex('users').update('Facebook_ID', profile.id).where('email', profile.emails[0].value)
                done(null, updateUser)
            } else {
                let newUser = await knex('users').insert({ ...profile, email: profile.emails[0].value })
                done(null, newUser)
            }
        }
        catch (err) {
            done(null, false, { messages: err })
        }

    }))
}

module.exports=initializeFacebook