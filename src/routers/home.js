const express = require('express')
const router = express.Router()
const db = require('../../models')
const Todo = db.Todo
const User = db.User

// import auth middleware
const { authenticated } = require('../../config/auth')

// todo-list homepage
router.get('/', authenticated, async (req, res) => {
  try {

    const user = await User.findByPk(req.user.id)
    if (!user) {
      return res.send('user not found')
    }
    const todos = await Todo.findAll({ where: { UserId: req.user.id } })
    res.render('index', { todos })


  } catch (e) {
    res.status(422).send(e)
  }

})

module.exports = router