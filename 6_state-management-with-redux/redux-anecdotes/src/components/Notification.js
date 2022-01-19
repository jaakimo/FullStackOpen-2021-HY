import React from 'react'
import { connect } from 'react-redux'

const Notifications = (props) => {
  const notifications = props.notifications

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }
  return (
    <>
      {notifications.map((notification) => (
        <div style={style} key={notification.id}>
          {notification.message}
        </div>
      ))}
    </>
  )
}
const mapStateToProps = (state) => {
  return {
    notifications: state.notifications,
  }
}

const ConnectedNotifications = connect(mapStateToProps)(Notifications)
export default ConnectedNotifications
