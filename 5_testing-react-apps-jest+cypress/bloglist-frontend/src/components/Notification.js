import React from 'react'

const Notification = ({ message }) => {
  return (
    <div
      style={{
        fontSize: '25px',
        color: 'green',
        backgroundColor: '#bbb',
        padding: '10px',
        border: '5px solid green',
        borderRadius: '10px',
      }}
    >
      {message}
    </div>
  )
}

export default Notification
