import { setNotificationWithSeconds } from './notificationReducer'
import userService from '../services/user'
import { setErrorWithSeconds } from './errorReducer'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'SIGNUP':
      return [...state, action.data]
    case 'USERS_INITIALIZE':
      return action.data
    default:
      return state
  }
}

export const signupUser = (user) => {
  return async (dispatch) => {
    try {
      const response = await userService.signup(user)
      dispatch(setNotificationWithSeconds('User signed up', 5))
      dispatch({ type: 'SIGNUP', data: response })
    } catch (error) {
      dispatch(setErrorWithSeconds(error, 5))
    }
  }
}

export const getUsers = () => {
  return async (dispatch) => {
    const response = await userService.getAll()
    dispatch({ type: 'USERS_INITIALIZE', data: response })
  }
}




export default reducer
