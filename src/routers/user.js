const express = require('express')
const router = express.Router()

// show login page
router.get('/login', async (req, res) => {
  try {
    res.render('login')
  } catch (e) {
    res.status(500).send(e)
  }
})

// login authentication
router.post('/login', async (req, res) => {
  try {
    res.render('login')
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
  try {
    res.render('register')
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