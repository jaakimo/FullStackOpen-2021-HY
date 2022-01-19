import React from 'react'
import Blog from './Blog'

const BlogList = ({ blogs, likeBlog, deleteBlog, userId }) => {

  return (
    <div className='bloglist'>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          likeBlog={likeBlog}
          blog={blog}
          deleteBlog={deleteBlog}
          userId={userId}
        />
      ))}
    </div>
  )
}

export default BlogList
