import { logoutUser } from './userReducer'

const getId = () => (Math.random() * 10000).toFixed(0)

const asObject = (message) => {
  return {
    message: message,
    id: getId(),
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ERROR':
      return [...state, action.data]
    case 'HIDE_ERROR':
      return state.filter((error) => error.id !== action.data.id)
    default:
      return state
  }
}

export const setError = (message) => {
  return {
    type: 'SET_ERROR',
    data: asObject(message),
  }
}
export const hideError = (id) => {
  return {
    type: 'HIDE_ERROR',
    data: { id },
  }
}

export const setErrorWithSeconds = (errorObject, timeout) => {
  return async (dispatch) => {
    let error = await JSON.parse(errorObject.request.response)
    if (error.error === 'invalid token') {
      error = `${error}, logged out`
      dispatch(logoutUser())
    }
    const dispatchObject = setError(error.error)
    dispatch(dispatchObject)
    setTimeout(
      () => dispatch(hideError(dispatchObject.data.id)),
      timeout * 1000
    )
  }
}

export default reducer
