import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../../reducers/userReducer'
import Togglable from '../Togglable'
import LoginForm from '../LoginForm'
import SignupForm from '../SignupForm'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

const Header = () => {
  const user = useSelector((state) => state.user)

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
  }
  const dispatch = useDispatch()
  return (
    <Navbar expand="sm">
      <Container>
        <Navbar.Brand href="/">Blogs</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/users">Users</Nav.Link>
        </Nav>
        <Nav>
          {user ? (
            <span>
              <Navbar.Text className="px-2">{user.name} logged in</Navbar.Text>
              <Button variant="outline-primary" href="/" onClick={logout}>
                LOG OUT
              </Button>
            </span>
          ) : (
            <Button variant="outline-primary" href="/login">
              SIGN IN
            </Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  )
  //   <Link to="/users">users</Link>
  // {user ? (
  //   <span>
  //     {user.name} logged in
  //     <button onClick={() => dispatch(logoutUser())}>logout</button>
  //   </span>
  // ) : (
  //   <span>
  //     <Link to="/login">Login</Link>

  //     <Link to="/signup">Signup</Link>
  //   </span>
  // )}
}

export default Header
