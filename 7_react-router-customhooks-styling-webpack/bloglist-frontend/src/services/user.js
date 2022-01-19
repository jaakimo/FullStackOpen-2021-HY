import axios from 'axios'
import getAuthorization from '../components/utils/getauthorization'
const baseUrl = '/api/users'

const signup = async (userObject) => {
  const response = await axios.post(baseUrl, userObject)
  return response.data
}
const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const update = async (id, updateObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, updateObject)
  return response.data
}

export const addLike = async (id) => {
  const config = await getAuthorization()
  console.log('config', config)
  const response = await axios.post(`${baseUrl}/like/${id}`, {}, config)
  return response.data
}

export default { signup, getAll, update, addLike }
