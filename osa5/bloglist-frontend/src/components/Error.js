import React from 'react'

const Error = ({ message }) => {
  return (
    <div
      style={{
        fontSize: '25px',
        color: 'red',
        backgroundColor: '#bbb',
        padding: '10px',
        border: '5px solid red',
        borderRadius: '10px',
      }}
    >
      {message}
    </div>
  )
}

export default Error
