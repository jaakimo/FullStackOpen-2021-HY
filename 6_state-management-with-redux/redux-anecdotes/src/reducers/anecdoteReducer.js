import anecdoteService from '../services/anecdoteService'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      return state
        .map((anecdote) =>
          anecdote.id === action.data.id ? action.data : anecdote
        )
        .sort((a, b) => b.votes - a.votes)
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data.sort((a, b) => b.votes - a.votes)
    default:
      return state
  }
}
export const voteAnecdote = (id) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.voteAnecdote(id)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote,
    })
  }
}
export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}
export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}
export default reducer
