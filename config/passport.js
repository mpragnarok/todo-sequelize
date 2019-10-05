const LocalStrategy = require('passport-local').Strategy

// User model
const db = require('../models/')
const User = db.User


module.exports = passport => {
  // setup local passport
  passport.use(
    new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, async (email, password, done) => {
      try {

        const user = await User.findOne({ where: { email } })
        if (!user) {
          return done(null, false, { message: 'That email is not registered' })
        }
        if (user.password != password) {
          return done(user.errors, null, { message: 'Email or password incorrect' })
        }

        return done(null, user)

      } catch (e) {
        throw e
      }
    })
  )

  // passport serializeUser & deserializeUser
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findByPk(id).then((user) => {
      done(null, user)
    })
  })
}