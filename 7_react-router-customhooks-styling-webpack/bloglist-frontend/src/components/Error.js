import React from 'react'
import { useSelector } from 'react-redux'

const style = {
  fontSize: '25px',
  color: 'red',
  backgroundColor: '#bbb',
  padding: '10px',
  border: '5px solid red',
  borderRadius: '10px',
}

const Error = () => {
  const errors = useSelector((state) => state.errors)

  return (
    <>
      {errors.map((error) => (
        <div key={error.id} style={style}>
          {error.message}
        </div>
      ))}
    </>
  )
}

export default Error
