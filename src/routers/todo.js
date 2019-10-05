const express = require('express')
const router = new express.Router()
const db = require('../../models')
const Todo = db.Todo
const User = db.User
const { authenticated } = require('../../config/auth')

// fetch all todos
router.get('/', authenticated, async (req, res) => {
  try {
    res.redirect('/')
  } catch (e) {
    res.status(500).send()
  }
})

// fetch a todo by its id
router.get('/:id', authenticated, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id)
    if (!user) {
      return res.status(404).send()
    }
    const todo = await Todo.findOne({ where: { Id: req.params.id, UserId: req.user.id } })

    if (!todo) {
      return res.status(422).send()
    }

    res.render('detail', { todo })
  } catch (e) {
    res.status(500).send(e)
  }
})


// create a new todo

router.post('/', authenticated, async (req, res) => {

  const todo = await Todo.create({ name: req.body.name, done: false, UserId: req.user.id })
  try {
    if (!req.body.name) {
      return res.redirect('/')
    }
    await todo.save()
    res.status(201).redirect('/')
  } catch (e) {
    res.status(422).send(e)
  }
})

// update a todo in page

router.get('/:id/edit', authenticated, async (req, res) => {
  try {
    const todo = await Todo.findOne({ where: { Id: req.params.id, UserId: req.user.id } })
    if (!todo) {
      return res.status(404).send()
    }
    res.render('edit', { todo })
  } catch (e) {
    res.status(500).send()
  }
})
// update a todo

router.put('/:id', authenticated, async (req, res) => {
  const updates = Object.keys(req.body)
  try {
    const todo = await Todo.findOne({ where: { Id: req.params.id, UserId: req.user.id } })
    updates.forEach(update => todo[update] = req.body[update])
    await todo.save()
    res.redirect(`/todos/${req.params.id}`)

    if (!todo) {
      return res.status(404).send()
    }

  } catch (e) {
    res.status(400).send(e)
  }
})
// delete a todo
router.delete('/:id/', authenticated, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id)
    if (!user) {
      return res.status(404).send()
    }
    await Todo.destroy({ where: { Id: req.params.id, UserId: req.user.id } })

    res.redirect('/')

  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router