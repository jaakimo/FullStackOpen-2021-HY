import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, removeBlog } from '../../../reducers/blogsReducer'
import { useHistory } from 'react-router-dom'
import CommentForm from '../../CommentForm'
import Button from 'react-bootstrap/Button'
const BlogInfo = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const history = useHistory()
  const addLike = () => {
    dispatch(likeBlog(blog.id))
  }
  const deleteBlog = () => {
    dispatch(removeBlog(blog.id))
    history.push('/')
  }

  if (!blog) return null

  let loggedInContent
  if (user) {
    if (user.id === blog.user.id) {
      loggedInContent = (
        <>
          <Button className="button-like me-2" onClick={addLike}>
            like
          </Button>
          <Button
            className="button-delete ml-5"
            variant="outline-danger"
            id={blog.id}
            blogtitle={blog.title}
            blogauthor={blog.author}
            onClick={deleteBlog}
          >
            delete
          </Button>
          <CommentForm />
        </>
      )
    } else {
      loggedInContent = (
        <>
          <button className="button-like" onClick={addLike}>
            like
          </button>
          <CommentForm />
        </>
      )
    }
  }
  return (
    <div>
      <h2>{blog.title}</h2>
      <div>{blog.author}</div>
      <div>{blog.url}</div>
      <div>
        <div className="blog-likes">{blog.likes} likes</div>
      </div>

      {loggedInContent}
      <ul>
        {blog.comments.map((comment, idx) => (
          <li key={idx}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default BlogInfo
