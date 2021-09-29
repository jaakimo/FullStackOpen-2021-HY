const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const User = require('../models/user')

usersRouter.post('/', async (req, res, next) => {
  const { body } = req

  if (body.password.length < 3) {
    next({
      message: 'password check failed: too short',
    })
    return res.status(400).json({ error: 'password too short' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const newUser = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })
  const savedUser = await newUser.save()
  res.status(201).json(savedUser)
})

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', {
    url: 1,
    title: 1,
    author: 1,
    id: 1,
  })
  res.status(200).json(users)
})

usersRouter.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) res.status(200).json(user)
  else res.status(404).json({ error: 'user not found' })
})

usersRouter.delete('/:id', async (req, res) => {
  const response = await User.findByIdAndDelete(req.params.id)
  if (response) res.status(204).end()
  else res.status(404).json({ error: 'user not found' })
})

usersRouter.put('/:id', async (req, res) => {
  const { body } = req
  const response = await User.findByIdAndUpdate(req.params.id, body)
  if (response) {
    const updatedUser = new User(response)
    res.status(200).json(updatedUser)
  }
})

module.exports = usersRouter
