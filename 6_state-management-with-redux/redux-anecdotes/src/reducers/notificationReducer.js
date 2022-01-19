const initialState = []

const getId = () => (10000 * Math.random()).toFixed(0)
let timeoutId

const asObject = (message) => {
  return {
    message: message,
    id: getId(),
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      // return [action.data] single notification
      return [...state, action.data] // multiple notifications with timeouts
    case 'HIDE_NOTIFICATION':
      return state.filter((notification) => notification.id !== action.data.id)
    default:
      return state
  }
}
export const setNotification = (message) => {
  return {
    type: 'SET_NOTIFICATION',
    data: asObject(message),
  }
}
export const hideNotification = (id) => {
  return {
    type: 'HIDE_NOTIFICATION',
    data: { id },
  }
}

export const setNotificationWithSeconds = (message, timeout) => {
  return async (dispatch) => {
    const dispatchObject = setNotification(message)
    dispatch(dispatchObject)
    // clearTimeout(timeoutId) fix for single notification timeout bug
    timeoutId = setTimeout(
      () => dispatch(hideNotification(dispatchObject.data.id)),
      timeout * 1000
    )
  }
}

export default reducer
