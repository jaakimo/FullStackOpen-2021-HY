import axios from 'axios'

const baseUrl = '/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const anecdoteObject = { content, votes: 0 }
  const response = await axios.post(baseUrl, anecdoteObject)
  return response.data
}
const voteAnecdote = async (id) => {
  const { data } = await axios.get(`${baseUrl}/${id}`)
  const response = await axios.put(`${baseUrl}/${id}`, {
    ...data,
    votes: data.votes + 1,
  })
  return response.data
}

export default { getAll, createNew, voteAnecdote }
