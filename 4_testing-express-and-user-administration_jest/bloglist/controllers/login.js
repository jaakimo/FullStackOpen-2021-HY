const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

loginRouter.post('/', async (req, res) => {
  const { body } = req
  const user = await User.findOne({ username: body.username })
  const passwordCorrect =
    user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash)

  if (!(passwordCorrect && user)) {
    return res.status(400).json({ error: 'invalid username or password' })
  }
  const userForToken = {
    username: body.username,
    name: user.name,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  })
  res.status(200).send({ token, ...userForToken })
})

module.exports = loginRouter
