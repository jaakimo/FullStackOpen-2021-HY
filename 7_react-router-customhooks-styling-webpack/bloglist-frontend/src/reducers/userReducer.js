import loginService from '../services/login'
import userService from '../services/user'

import { getBlogs } from './blogsReducer'
import { setErrorWithSeconds } from './errorReducer'
import { setNotificationWithSeconds } from './notificationReducer'

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data
    case 'UNSET_USER':
      return null
    default:
      return state
  }
}

export const loginUser = ({ username, password }) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      dispatch({ type: 'SET_USER', data: user })
      dispatch(getBlogs())
      dispatch(setNotificationWithSeconds('User logged in', 5))
    } catch (error) {
      dispatch(setErrorWithSeconds(error, 5))
    }
  }
}
export const setUser = (user) => {
  return { type: 'SET_USER', data: user }
}

export const logoutUser = () => {
  return (dispatch) => {
    window.localStorage.removeItem('loggedUser')
    dispatch(setNotificationWithSeconds('User logged out', 5))
    dispatch({ type: 'UNSET_USER' })
  }
}

export const addUserLike = (id) => {
  return async (dispatch) => {
    const updatedUser = await userService.addLike(id)
    dispatch({ type: 'SET_USER', data: updatedUser })
  }
}
export default reducer
