const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

function initializeGoogle(passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: '/auth/google/redirect',
        profileFields: ['id', 'displayName', 'emails', 'coverPhoto', 'gender'],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log('access token: ', accessToken);
          let registeredWithGoogle = await knex('users').where(
            'google_ID',
            profile.id
          );
          let registeredWithLocal = await knex('users').where(
            'email',
            profile.emails[0].value
          );

          if (registeredWithGoogle) {
            done(null, registeredWithGoogle[0]);
          } else if (registeredWithLocal) {
            let updateUser = await knex('users')
              .update('google_ID', profile.id)
              .where('email', profile.emails[0].value);
            done(null, updateUser);
          } else {
            let newUser = await knex('users').insert({
              ...profile,
              email: profile.emails[0].value,
            });
            done(null, newUser);
          }
        } catch (err) {
          done(null, false, { messages: err });
        }
      }
    )
  );
}

module.exports = initializeGoogle;
