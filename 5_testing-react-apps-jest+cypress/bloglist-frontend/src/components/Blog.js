import React from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, deleteBlog, likeBlog, userId }) => {
  const blogStyle = {
    padding: '10px 0 0 2px',
    border: '1px solid',
    marginBottom: '5',
  }
  const addLike = () => {
    likeBlog(blog)
  }
  return (
    <div className="blog" style={blogStyle}>
      <h4>
        {blog.title} - {blog.author}
      </h4>
      <Togglable buttonLabel="View">
        <div>
          <div>{blog.title}</div>
          <div>{blog.author}</div>
          <div>{blog.url}</div>
          <div>
            <div className='blog-likes'>{blog.likes}</div>
            <button className='button-like' onClick={addLike}>like</button>
          </div>
          {userId === blog.user.id ? (
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
