import React, { useState } from 'react'

import PropTypes from 'prop-types'

const LoginForm = ({ loginUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    loginUser({ username, password })
    setUsername('')
    setPassword('')
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username:{' '}
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          ></input>
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

        <button id="submit-login" type="submit">
          login
        </button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  loginUser: PropTypes.func.isRequired,
}

export default LoginForm
