const jwt = require('jsonwebtoken')
const User = require('../models/user')

const userExtractor = async (request, response, next) => {
  const { token } = request
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  request.user = user
  next()
}

module.exports = userExtractor
