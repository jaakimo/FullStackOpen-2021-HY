const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(express.json());

morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(morgan(":method :url :status :response-time :body"));

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
];

const generateId = () => {
  const maxId = Math.max(...persons.map((n) => n.id));
  return maxId + 1;
};

app.get("/", (req, res) => {
  res.send("<h1>Hello world!</h1>");
});

app.get("/info", (req, res) => {
  res.send(
    `<div>Phonebook has info for ${
      persons.length
    } people</div> <div> ${new Date()}</div>`
  );
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});
app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const personfound = persons.find((person) => person.id === id);
  if (personfound) {
    res.json(personfound);
  } else
    res
      .status(404)
      .json({ error: "person has already been removed from the server" });
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).json({ ok: "person removed from phonebook" });
});

app.post("/api/persons", (req, res) => {
  const person = {
    id: Math.floor(Math.random() * 10000) /* generateId() */,
    ...req.body,
  };
  if (!person.number || !person.name) {
    res.status(400).json({ error: "name and number must be defined" });
  }
  console.log("created person", person);
  res.json(person);
});

const PORT = 3001;
app.listen(PORT);
console.log(`server running on port ${PORT}`);
