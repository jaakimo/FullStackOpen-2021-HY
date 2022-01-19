import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BlogForm from './components/blogs/BlogForm'
import BlogList from './components/blogs/BlogList/BlogList'
import Error from './components/Error'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import SignupForm from './components/SignupForm'
import Togglable from './components/Togglable'
import UsersList from './components/users/UserList/UsersList'
import { getBlogs } from './reducers/blogsReducer'
import { setUser } from './reducers/userReducer'
import { getUsers } from './reducers/usersReducer'

import { Switch, Route, useRouteMatch } from 'react-router-dom'
import UserInfo from './components/users/UserInfo/UserInfo'
import BlogInfo from './components/blogs/BlogInfo/BlogInfo'
import Header from './components/header/Header'
import Container from 'react-bootstrap/esm/Container'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)
  const users = useSelector((state) => state.users)
  const blogs = useSelector((state) => state.blogs)

  const blogFormRef = useRef()
  const signupFormRef = useRef()

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('loggedUser'))
    if (user) {
      dispatch(setUser(user))
    }
    dispatch(getUsers())

    dispatch(getBlogs())
  }, [])
  const userMatch = useRouteMatch('/users/:id')
  const userSelected = userMatch
    ? users
      ? users.find((user) => user.id === userMatch.params.id)
      : null
    : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const blogSelected = blogMatch
    ? blogs
      ? blogs.find((blog) => blog.id === blogMatch.params.id)
      : null
    : null

  return (
    <div>
      <Header />
      {<Error />}
      {<Notification />}
      <Container className="fluid justify-content-center mt-4">
        <Switch>
          <Route path="/users/:id">
            <UserInfo user={userSelected} />
          </Route>
          <Route path="/users">
            <UsersList />
          </Route>
          <Route path="/blogs/:id">
            <BlogInfo blog={blogSelected} />
          </Route>
          <Route path="/login">
            <LoginForm />
          </Route>
          <Route path="/signup">
            <SignupForm />
          </Route>
          <Route path="/">
            <Togglable
              className=""
              buttonLabel="create a blog"
              ref={blogFormRef}
            >
              <h2>Create a new blog</h2>
              <BlogForm />
            </Togglable>
            <BlogList />
          </Route>
        </Switch>
      </Container>
    </div>
  )
}

export default App
