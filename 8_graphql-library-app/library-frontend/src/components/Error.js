import React from 'react'

const style = {
  fontSize: '25px',
  color: 'black',
  backgroundColor: '#bbb',
  padding: '10px',
  border: '5px solid red',
  borderRadius: '10px',
}
const Error = ({ errorMessage }) => {
  return <div style={style}>{errorMessage}</div>
}

export default Error
