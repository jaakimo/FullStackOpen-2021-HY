import React from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap'

const BlogItem = ({ blog }) => {
  const blogStyle = {
    padding: '10px 0 0 2px',
    border: '1px solid',
    marginBottom: '5',
  }
  if (!blog) return null
  return (
    <div className="blog" style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
    </div>
  )
}
export default BlogItem
