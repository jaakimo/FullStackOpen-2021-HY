import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addComment as addBlogComment } from '../reducers/blogsReducer'
import { useRouteMatch } from 'react-router'

const CommentForm = () => {
  const userMatch = useRouteMatch('/users/:id/comment')

  const blogMatch = useRouteMatch('/blogs/:id')
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')
  const handleChange = (e) => {
    setComment(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setComment('')

    if (blogMatch)
      dispatch(addBlogComment({ id: blogMatch.params.id, comment }))
    if (userMatch)
      dispatch(addBlogComment({ id: userMatch.params.id, comment }))
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={comment} onChange={handleChange} />
        <button type="submit">add comment</button>
      </form>
    </div>
  )
}

export default CommentForm
