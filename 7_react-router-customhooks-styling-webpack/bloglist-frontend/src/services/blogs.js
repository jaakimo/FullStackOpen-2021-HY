import axios from 'axios'
const baseUrl = '/api/blogs'
import getAuthorization from '../components/utils/getauthorization'
const getAll = async () => {
  const config = await getAuthorization()
  const response = await axios.get(baseUrl, config)
  return response.data
}

const getById = async (id) => {
  const config = await getAuthorization()
  const response = await axios.get(`${baseUrl}/${id}`, config)
  return response.data
}
const create = async (blogObject) => {
  const config = await getAuthorization()

  const response = await axios.post(baseUrl, blogObject, config)
  return response.data
}
const like = async (blogObject) => {
  const config = await getAuthorization()
  const response = await axios.put(
    `${baseUrl}/${blogObject.id}`,
    {
      ...blogObject,
      likes: blogObject.likes + 1,
    },
    config
  )
  return response.data
}

const comment = async ({ id, comment }) => {
  const config = await getAuthorization()
  const response = await axios.post(
    `${baseUrl}/${id}/comment`,
    { comment },
    config
  )
  return response.data
}

const remove = async (id) => {
  const config = await getAuthorization()
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, getById, create, remove, like, comment }
