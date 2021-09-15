/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
require('dotenv').config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('couldnt connect to DB', err));

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name required'],
    unique: true,
    minlength: 3,
  },
  number: {
    type: String,
    required: [true, 'phone number required'],
    minlength: 8,
  },

});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

mongoose.plugin(uniqueValidator);

// Add dummy data for testing if db is empty
const persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

const Person = mongoose.model('Person', personSchema);
Person.find({}).then((res) => {
  if (res.length === 0) {
    persons.forEach((person) => {
      const newPerson = new Person(person);
      newPerson.save();
    });
  }
});

module.exports = Person;
