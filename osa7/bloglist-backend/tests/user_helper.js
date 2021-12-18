const User = require('../models/user')

const initialUsers = [
  {
    username: 'hellas',
    name: 'Arto Hellas',
    password: 'passu',
  },
  {
    username: 'seppo',
    name: 'seppo hovi',
    password: 'passu',
  },
  {
    username: 'teppo',
    name: 'Matin Teppo',
    password: 'passu',
  },
  {
    username: 'matti',
    name: 'Tepon Matti',
    password: 'passu',
  },
]

const usersInDb = async () => {
  const response = await User.find({})
  return response.map((user) => user.toJSON())
}

const validNonexistingId = async () => {
  const userRemovedSoon = new User({
    username: 'asdf',
    name: 'asdf',
    password: 'asdf',
  })
  const userSaved = await userRemovedSoon.save()
  const validId = userSaved.id
  await User.findByIdAndDelete(validId)
  return validId
}
module.exports = {
  usersInDb,
  initialUsers,
  validNonexistingId,
}
