import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, likeBlog, deleteBlog, user }) => {
  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          likeBlog={likeBlog}
          blog={blog}
          deleteBlog={deleteBlog}
          user={user}
        />
      ))}
    </div>
  )
}

export default BlogList
