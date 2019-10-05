const express = require('express')
const router = express.Router()
const passport = require('passport')
const db = require('../../models')
const User = db.User


// show login page
router.get('/login', async (req, res) => {
  try {
    res.render('login', { message: req.flash('error') })
  } catch (e) {
    res.status(500).send(e)
  }
})

// login authentication
router.post('/login', async (req, res, next) => {
  try {
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/users/login',
      badRequestMessage: 'The email does not match any account',
      failureFlash: true
    })(req, res, next)
  } catch (e) {
    res.status(400).send(e)
  }
})
// show register page
router.get('/register', async (req, res) => {

  try {

    res.render('register')
  } catch (e) {
    res.status(500).send(e)
  }
})


// register authentication
router.post('/register', async (req, res) => {
  const { name, email, password, password2 } = req.body
  try {

    let errors = []
    if (!email || !password || !password2) {
      errors.push({ message: 'All fields are required' })
    }

    if (password !== password2) {
      errors.push({ message: 'Passwords are not the same' })
    }

    if (errors.length > 0) {
      res.render('register', {
        errors,
        name,
        email,
        password,
        password2
      })
    } else {
      const user = await User.findOne({ where: { email } })
      // user already exists 
      if (user) {
        errors.push({ message: 'This Email is already registered' })
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        })
      } else {
        // Add new user if user not exists
        const newUser =
          await User.create({
            name,
            email,
            password
          })
        await newUser.save()
        res.redirect('/')
      }
    }

  } catch (e) {
    res.status(400).send(e)
  }
})

// logout
router.get('/logout', async (req, res) => {
  try {
    res.send('logout')
  } catch (e) {
    res.status(500).send(e)
  }
})

module.exports = router