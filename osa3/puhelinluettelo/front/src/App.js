import React, { useState, useEffect } from 'react';
import FilterForm from './components/Filter';
import PersonForm from './components/PersonForm';
import PersonTable from './components/PersonTable';
import personService from './services/person';
import Error from './components/Error';
import Notification from './components/Notification';
import './index.css';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState(null);
  const [error, setError] = useState(null);

  // HANDLERS

  const handleNameChange = (e) => setNewName(e.target.value);

  const handleNumberChange = (e) => setNewNumber(e.target.value);

  const handleFilterChange = (e) => {
    const replaceRegex = /[^a-zöäå ]/gi;
    setFilter(e.target.value.replace(replaceRegex, ''));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // check if person is already in PhoneBook
    const personWithSameName = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase(),
    );
    if (personWithSameName) {
      if (
        // eslint-disable-next-line no-alert
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with new one?`,
        )
      ) {
        personService
          .update(personWithSameName.id, {
            name: newName,
            number: newNumber,
          })
          .then((res) => {
            setPersons([
              ...persons.filter((person) => person.name !== newName),
              res.data,
            ]);
            setNotification(`${res.data.name}'s number updated`);
            setTimeout(() => setNotification(null), 5000);
          })
          .catch((err) => {
            setError(`${err.response.data.error}`);
            setTimeout(() => setError(null), 5000);
          });
      }
    } else {
      personService
        .create({ name: newName, number: newNumber })
        .then((res) => {
          const createdPerson = res.data;
          setPersons([...persons, res.data]);
          setNotification(`Person ${createdPerson.name} added to phonebook`);
          setTimeout(() => setNotification(null), 5000);
        })
        .catch((err) => {
          setError(`${err.response.data.error}`);
          setTimeout(() => setError(null), 5000);
        });
    }

    // empty form
    setNewName('');
    setNewNumber('');
  };

  const handleDelete = (e) => {
    personService
      .deletePerson(e.target.id)
      .then(() => {
        setPersons(persons.filter((person) => (person.id !== e.target.id)));
        setNotification(`Person ${e.target.name} removed from phonebook`);
        setTimeout(() => setNotification(null), 5000);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
        setTimeout(() => setError(null), 5000);
      });
  };

  // UseEffect

  useEffect(() => {
    personService.getAll().then((res) => {
      setPersons(res.data);
    });
  }, []);

  return (
    <div>
      <div>
        <h2>Phonebook</h2>
        <Error message={error} />
        <Notification message={notification} />
        <form>
          <div>
            <FilterForm handler={handleFilterChange} />
            <PersonForm
              name={newName}
              number={newNumber}
              nameHandler={handleNameChange}
              numberHandler={handleNumberChange}
            />
          </div>
          <div>
            <button type="submit" onClick={handleSubmit}>
              add
            </button>
          </div>
        </form>
      </div>
      <div>
        <h2>Numbers</h2>
        <PersonTable
          persons={persons}
          filter={filter}
          deleteHandler={handleDelete}
        />
      </div>
    </div>
  );
};

export default App;
