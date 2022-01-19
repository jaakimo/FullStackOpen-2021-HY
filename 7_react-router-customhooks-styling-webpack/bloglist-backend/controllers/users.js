const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const checkUpdateAuthorization = require('../middleware/checkupdateauthorization')
const userExtractor = require('../middleware/userextractor')
const User = require('../models/user')

usersRouter.post('/', async (req, res, next) => {
  const { body } = req

  if (body.password.length < 3) {
    next({
      message: 'password check failed: too short',
      data: body,
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
  return res.status(201).json(savedUser)
})

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', {
    url: 1,
    title: 1,
    author: 1,
    id: 1,
  })
  return res.status(200).json(users)
})

usersRouter.get('/:id', async (req, res, next) => {
  const user = await User.findById(req.params.id)
  if (!user) {
    next({
      message: 'user not found: id does not exist in db',
      data: req.body,
    })
    return res.status(404).json({ error: 'user not found' })
  }
  return res.status(200).json(user)
})

usersRouter.delete(
  '/:id',
  userExtractor,
  checkUpdateAuthorization,
  async (req, res, next) => {
    // if (req.params.id !== req.user._id) {
    //   next({
    //     message: 'not authorized to remove that user',
    //     data: req.body,
    //   })
    //   return res.status(400).end()
    // }
    const response = await User.findByIdAndDelete(req.params.id)
    if (!response) {
      next({
        message: 'user not found',
        data: req.body,
      })
      return res.status(404).json({ error: 'user not found' })
    }
    return res.status(204).end()
  }
)

usersRouter.put(
  '/:id',
  userExtractor,
  checkUpdateAuthorization,
  async (req, res, next) => {
    const { body } = req
    // if (req.params.id !== req.user._id) {
    //   next({
    //     message: 'not authorized to update that user',
    //     data: req.body,
    //   })
    //   return res.status(400).end()
    // }
    const response = await User.findByIdAndUpdate(req.params.id, body)
    if (!response) {
      next({
        message: 'user update failed',
        data: req.body,
      })
      return res.status(404).json({ error: 'user not found' })
    }

    const updatedUser = new User(response)
    return res.status(200).json(updatedUser)
  }
)

usersRouter.post('/like/:blogid', userExtractor, async (req, res, next) => {
  let updatedUser
  // already liked -> remove
  if (req.user.userlikes.find((blogid) => blogid === req.params.blogid)) {
    updatedUser = await User.findByIdAndUpdate(req.user._id, {
      userlikes: req.user.userlikes.filter((blogid) => blogid === req.body.id),
    })
  }
  // not liked -> add to liked blogs
  else {
    updatedUser = await User.findByIdAndUpdate(req.user._id, {
      userlikes: [...req.user.userlikes, req.body.id],
    })
  }

  // failure to update results in error
  if (!updatedUser) {
    next({
      message: 'user addLike failed',
      data: req.body,
    })
    return res.status(500).json({ error: 'could not add like' })
  }
  return res.status(200).json(updatedUser)
})

module.exports = usersRouter
