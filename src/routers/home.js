const express = require('express')
const router = express.Router()


// todo-list homepage
router.get('/', async (req, res) => {
  res.render('index')
})

module.exports = router