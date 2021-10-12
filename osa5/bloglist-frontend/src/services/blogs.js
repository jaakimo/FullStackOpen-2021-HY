import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => { token = `bearer ${newToken}` }
const getAll = () => {
  const config = { headers: { Authorization: token } }
  const request = axios.get(baseUrl, config)
  return request.then((response) => response.data)
}

const create = async ({ blogObject }) => {
  const config = { headers: { Authorization: token } }

  const response = await axios.post(baseUrl, blogObject, config)
  return response.data
}
const like = async (blogObject) => {
  const response = await axios.put(
    `${baseUrl}/${blogObject.id}`,
    {
      likes: blogObject.likes + 1,
    },
    {
      headers: { Authorization: token },
    }
  )
  return response.data
}
const remove = async ({ id }) => {
  const response = await axios.delete(`${baseUrl}/${id}`, {
    headers: { Authorization: token },
  })
  return response.data
}

export default { setToken, getAll, create, remove, like }
