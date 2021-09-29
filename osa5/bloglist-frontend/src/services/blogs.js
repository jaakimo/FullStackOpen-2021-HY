import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async ({ blogObject, user }) => {
  const response = await axios.post(baseUrl, blogObject, {
    headers: { Authorization: `bearer ${user.token}` },
  })
  return response.data
}
const like = async (blogObject, user) => {
  const response = await axios.put(
    `${baseUrl}/${blogObject.id}`,
    {
      likes: blogObject.likes + 1,
    },
    {
      headers: { Authorization: `bearer ${user.token}` },
    }
  )
  return response.data
}
const remove = async ({ id, user }) => {
  const response = await axios.delete(`${baseUrl}/${id}`, {
    headers: { Authorization: `bearer ${user.token}` },
  })
  return response.data
}

export default { getAll, create, remove, like }
