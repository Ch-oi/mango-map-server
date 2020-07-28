const knex = require('../database/config').knex;

const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function initializeLocal(passport) {
  passport.use(
    'local-signup',
    new LocalStrategy(
      {
        usernameField: 'email',
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          let confirmUser = await knex('users').where('email', email);

          if (confirmUser.length == 0) {
            let hashedPwd = await bcrypt.hash(password.toString(), 10);

            console.log(hashedPwd);

            await knex.raw(
              'SELECT setval(\'"users_id_seq"\', (SELECT MAX(id) from "users"));'
            );
            let newUser = await knex('users')
              .insert({ ...req.body, password: hashedPwd })
              .returning('*')
              .catch((err) => console.log(err));
            console.log(newUser);
            return done(null, newUser[0]);
          } else {
            return done(null, false, { message: 'Email already taken' });
          }
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.use(
    'local-login',
    new LocalStrategy(
      {
        usernameField: 'email',
      },
      async (email, password, done) => {
        try {
          let user = await knex('users').where({ email: email });
          if (user.length == 0) {
             done(null, false, { message: 'Incorrect email' });
          }
          console.log(user);
          let result = await bcrypt.compare(password, user[0].password);
          if (result) {
            console.log(user[0])
            
             done(null, user[0]);
          } else {
             done(null, false, { message: 'Incorrect password' });
          }
        } catch (err) {
           done(err);
        }
      }
    )
  );
  // passport.serializeUser((user, done) => {
  //     done(null, user.id)
  // })
  // passport.deserializeUser(async (id, done) => {
  //     let users = await knex('users').where({ id: id });
  //     if (users.length == 0) {
  //         return done(new Error(`Wrong user id ${id}`));
  //     }
  //     let user = users[0];
  //     return done(null, user);
  // });
}

module.exports = initializeLocal;
