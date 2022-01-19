import axios from 'axios';

const baseUrl = '/api/persons';

const getAll = () => axios.get(baseUrl);

const create = (newPerson) => axios.post(baseUrl, newPerson);
const deletePerson = (id) => axios.delete(`${baseUrl}/${id}`);
const update = (id, updatedPerson) => axios.put(`${baseUrl}/${id}`, updatedPerson);

export default {
  getAll, create, deletePerson, update,
};
