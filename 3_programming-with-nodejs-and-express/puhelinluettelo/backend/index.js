const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const Person = require('./models/person');

const app = express();

app.use(express.static(path.join(__dirname, '/build/')));
app.use(cors());
app.use(express.json());

morgan.token('body', (req) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time :body'));

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

app.get('/', (req, res) => {
  res.send('<h1>hello worlds</h1>');
});

app.get('/info', (req, res) => {
  Person.find({}).then((people) => res.send(
    `<div>Phonebook has info for ${people.length
    } people</div> <div> ${new Date()}</div>`,
  ));
});

app.get('/api/persons', (req, res) => {
  Person.find({}).then((notes) => res.json(notes));
});

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) res.json(person);
      else res.status(404).end();
    })
    .catch((err) => next(err));
});

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((result) => res.status(204).json(result))
    .catch((err) => next(err));
});

app.post('/api/persons', (req, res, next) => {
  const { body } = req;

  if (!body.number || !body.name) {
    return res.status(204).json({ error: 'name and number must be defined' });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    res.status(201).json(savedPerson);
  })
    .catch((err) => next(err));
});

app.put('/api/persons/:id', (req, res, next) => {
  const { body } = req;

  const person = {
    name: body.name,
    number: body.number,
  };
  Person.findByIdAndUpdate(req.params.id, person, { new: true, runValidators: true })
    .then((updatedPerson) => {
      if (updatedPerson) { res.status(201).json(updatedPerson); } else {
        res.status(400).json({ error: 'person already removed from database' });
      }
      res.status(201).json(updatedPerson);
    })
    .catch((err) => next(err));
});

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`server running on port ${PORT}`);
