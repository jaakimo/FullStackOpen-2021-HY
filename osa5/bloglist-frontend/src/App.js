import React, { useState, useEffect, useRef } from 'react'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Error from './components/Error'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import SignupForm from './components/SignupForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/user'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [notification, setNotification] = useState(null)

  const blogFormRef = useRef()

  useEffect(async () => {
    const userInStorage = JSON.parse(
      window.localStorage.getItem('loggedBloglistUser')
    )
    if (userInStorage) setUser(userInStorage)
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => a.likes < b.likes)))
  }, [])

  const createBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      console.log('blogObject', blogObject)
      const response = await blogService.create({ blogObject, user })
      setBlogs([...blogs, response].sort((a, b) => a.likes < b.likes))
      setNotification(
        `Blog ${blogObject.title} by ${blogObject.author} created`
      )
      setTimeout(() => setNotification(null), 5000)
    } catch (error) {
      setError(error.response.data.error)
      setTimeout(() => setError(null), 5000)
    }
  }

  const loginUser = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      setUser(user)
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
    } catch (error) {
      setError(error.response.data.error)
      setTimeout(() => setError(null), 5000)
    }
  }

  const signup = async (userObject) => {
    try {
      const user = await userService.signup(userObject)
      if (user) {
        setUser(user)
        window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      }
    } catch (error) {
      setError(error.response.data.error)
      setTimeout(() => setError(null), 5000)
    }
  }

  const likeBlog = async (blogObject) => {
    const { id, likes } = blogObject
    try {
      // update backend
      await blogService.like({ id, likes: Number(likes) }, user)

      // update state
      const updatedBlogs = blogs.map((blog) =>
        blog.id === id ? { ...blog, likes: blog.likes + 1 } : blog
      )
      setBlogs(updatedBlogs.sort((a, b) => a.likes < b.likes))
    } catch (error) {
      setError(error.response.data.error)
      setTimeout(() => setError(null), 5000)
    }
  }
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
    setNotification('User logged out')
    setTimeout(() => setNotification(null), 5000)
  }

  const deleteBlog = async (e) => {
    try {
      if (
        window.confirm(
          `remove blog ${e.target.attributes.blogTitle.value} by ${e.target.attributes.blogAuthor.value}?`
        )
      ) {
        await blogService.remove({ id: e.target.id, user })
        setBlogs(blogs.filter((blog) => blog.id !== e.target.id))
      }
    } catch (error) {
      console.log('error', error)
      setError(error.response.data.error)
      setTimeout(() => setError(null), 5000)
    }
  }

  return (
    <div>
      {error ? <Error message={error} /> : <></>}
      {notification ? <Notification message={notification} /> : <></>}

      <div>
        <h1>blogs</h1>
        {user ? (
          <div>
            <div>
              {user.name} logged in
              <button onClick={handleLogout}>logout</button>
            </div>
            <Togglable buttonLabel="create a blog" ref={blogFormRef}>
              <h2>create new blog</h2>
              <BlogForm createBlog={createBlog} />
            </Togglable>
            <BlogList
              blogs={blogs}
              likeBlog={likeBlog}
              deleteBlog={deleteBlog}
              user={user}
            />
          </div>
        ) : (
          <div>
            <Togglable buttonLabel="login">
              <LoginForm loginUser={loginUser} />
            </Togglable>

            <Togglable buttonLabel="signup" ref={blogFormRef}>
              <SignupForm signup={signup} />
            </Togglable>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
