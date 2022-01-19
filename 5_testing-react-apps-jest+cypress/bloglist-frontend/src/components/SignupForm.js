import React, { useState } from 'react'

import PropTypes from 'prop-types'

const SignupForm = ({ signup }) => {
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const handleSignup = async (e) => {
    e.preventDefault()
    signup({ username, password, name })
    setUsername('')
    setName('')
    setPassword('')
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }
  const handleNameChange = (e) => {
    setName(e.target.value)
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <div>
          username:{' '}
          <input
            id="username"
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          name:{' '}
          <input
            id="name"
            type="text"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div>
          password:{' '}
          <input
            type="text"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          ></input>
        </div>

        <button type="submit" id="signup-button">
          signup
        </button>
      </form>
    </div>
  )
}

SignupForm.propTypes = {
  signup: PropTypes.func.isRequired,
}

export default SignupForm
