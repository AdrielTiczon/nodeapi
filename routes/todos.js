const express = require('express');
const router = express.Router();

const Todos = require('../models/Todo');

router.get('/', async (req, res) => {
  try {
    const todos = await Todos.find();
    console.log(todos)
    res.json(todos);   
  } catch(e) {
    res.json({message: e })
  }
})

router.post('/addTodo', async (req, res) => {
  const todo = new Todos({
    title: req.body.title
  });
  try {
    const saveTodo = await todo.save();
    res.json(saveTodo);   
  } catch(e) {
    res.json({ message: e })
  }
})

router.get('/:todoId', async (req, res) => {
  try {
    const todo = await Todos.find({ _id: req.params.todoId })
    res.json(todo);
  } catch(e) {
    res.json({ message: e })
  }
})

router.delete('/:todoId', async (req, res) => {
  try {
    const todo = await Todos.delete({ _id: req.params.todoId })
    res.json(todo);
  } catch(e) {
    res.json({ message: e })
  }
});

router.patch('/:todoId', async (req, res) => {
  try {
    const updateTodo = await Todos.updateOne(
      { _id: req.params.todoId }, 
      { $set: { title: req.body.title, isDone: req.body.isDone }})
    res.json(updateTodo);
  } catch(e) {
    res.json({ message: e });
  }
})

module.exports = router;
