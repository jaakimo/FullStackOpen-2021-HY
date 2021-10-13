const initialState = null

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET':
      return action.data
    default:
      return state
  }
}

export const setFilter = (filter) => {
  return {
    type: 'SET',
    data: filter,
  }
}

export default reducer
