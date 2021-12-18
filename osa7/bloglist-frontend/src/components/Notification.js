import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const style = {
    fontSize: '25px',
    color: 'green',
    backgroundColor: '#bbb',
    padding: '10px',
    border: '5px solid green',
    borderRadius: '10px',
  }
  const notifications = useSelector((state) => state.notifications)
  return (
    <>
      {notifications.map((notification) => (
        <div key={notification.id} style={style}>
          {notification.message}
        </div>
      ))}
    </>
  )
}

export default Notification
