import React from 'react'
import { useSelector } from 'react-redux'
import BlogItem from './BlogItem'
const BlogList = () => {
  const blogs = useSelector((state) =>
    state.blogs.sort((a, b) => b.likes - a.likes)
  )
  if (!blogs) return null
  return (
    <>
      <div className="bloglist">
        {blogs.map((blog) => (
          <BlogItem key={blog.id} blog={blog} />
        ))}
      </div>
    </>
  )
}

export default BlogList
