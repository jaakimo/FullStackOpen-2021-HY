import React from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, deleteBlog, likeBlog, user }) => {
  const blogStyle = {
    padding: '10px 0 0 2px',
    border: '1px solid',
    marginBottom: '5',
  }

  const addLike = () => {
    likeBlog(blog)
  }
  return (
    <div style={blogStyle}>
      {blog.title} - {blog.author}
      <Togglable buttonLabel="View">
        <div>
          <div>{blog.title}</div>
          <div>{blog.author}</div>
          <div>{blog.url}</div>
          <div>
            {blog.likes} <button onClick={addLike}>like</button>
          </div>
          {user.id === blog.user.id ? (
            <button
              id={blog.id}
              blogtitle={blog.title}
              blogauthor={blog.author}
              onClick={deleteBlog}
            >
              delete
            </button>
          ) : (
            <></>
          )}
        </div>
      </Togglable>
    </div>
  )
}
export default Blog
