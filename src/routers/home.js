const express = require('express')
const router = express.Router()
const db = require('../../models')
const Todo = db.Todo

// import auth middleware
const { authenticated } = require('../../config/auth')

// todo-list homepage
router.get('/', authenticated, async (req, res) => {
  try {
    const todos = await Todo.findAll({ where: { UserId: req.user.id } })
    console.log(todos)
    res.render('index', { todos })
  } catch (e) {

  }

})

module.exports = router