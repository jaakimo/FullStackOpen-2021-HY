const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlenght: 3,
  },
  favoriteGenre: {
    type: String,
    required: true,
    minlenght: 3,
  },
})

schema.plugin(uniqueValidator)

module.exports = mongoose.model('User', schema)
