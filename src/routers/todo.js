const express = require('express')
const router = new express.Router()
const db = require('../../models')
const Todo = db.Todo
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
    const todo = await Todo.findOne({ where: { _id: req.params.id, userId: req.user._id } })
    if (!todo) {
      return res.status(404).send()
    }
    res.render('detail', { todo })
  } catch (e) {
    res.status(500).send()
  }
})


// create a new todo

router.post('/', authenticated, async (req, res) => {

  try {

    res.redirect('/')
  } catch (e) {
    res.status(400).send(e)
  }
})

// update a todo in page

router.get('/:id/edit', authenticated, async (req, res) => {
  try {
    res.render('edit')
  } catch (e) {
    res.status(500).send(e)
  }
})
// update a todo

router.put('/:id/edit', authenticated, async (req, res) => {
  try {
    res.render('edit')
  } catch (e) {
    res.status(400).send(e)
  }
})
// delete a todo
router.get('/:id/', authenticated, async (req, res) => {
  try {

    res.redirect('/')

  } catch (e) {
    res.status(500).send(e)
  }
})

module.exports = router