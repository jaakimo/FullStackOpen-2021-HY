import React, { useState } from 'react'

import { useDispatch } from 'react-redux'

import { loginUser } from '../reducers/userReducer'

import { useHistory } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const LoginForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    dispatch(loginUser({ username, password }))
    history.push('/')
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
      <Form onSubmit={handleLogin}>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          id="username"
          required
          value={username}
          onChange={handleUsernameChange}
        ></Form.Control>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="text"
          id="password"
          required
          value={password}
          onChange={handlePasswordChange}
        ></Form.Control>
        <Button
          className="m-2"
          variant="primary"
          id="submit-login"
          type="submit"
        >
          login
        </Button>
        <Button className="m-2" variant="outline-primary" href="/signup">
          Sign up
        </Button>
      </Form>
    </div>
  )
}

export default LoginForm
