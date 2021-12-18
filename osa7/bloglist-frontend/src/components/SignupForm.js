import React, { useState } from 'react'

import { useDispatch } from 'react-redux'
import { signupUser } from '../reducers/usersReducer'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useHistory } from 'react-router'

const SignupForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const handleSignup = async (e) => {
    e.preventDefault()
    dispatch(signupUser({ username, name, password }))
    history.push('/')
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
      <Form onSubmit={handleSignup}>
        <Form.Label>UserName</Form.Label>
        <Form.Control
          id="username"
          type="text"
          value={username}
          onChange={handleUsernameChange}
        />
        <Form.Label>Full Name</Form.Label>
        <Form.Control
          id="name"
          type="text"
          value={name}
          onChange={handleNameChange}
        />
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <Button className="outline-success" type="submit" id="signup-button">
          signup
        </Button>
      </Form>
    </div>
  )
}

export default SignupForm
