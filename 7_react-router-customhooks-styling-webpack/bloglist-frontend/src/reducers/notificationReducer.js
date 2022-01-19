const getId = () => (Math.random() * 10000).toFixed(0)

const asObject = (message) => {
  return {
    message: message,
    id: getId(),
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return [...state, action.data]
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
    setTimeout(
      () => dispatch(hideNotification(dispatchObject.data.id)),
      timeout * 1000
    )
  }
}

export default reducer
