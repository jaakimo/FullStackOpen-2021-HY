import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../../reducers/blogsReducer'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const BlogForm = () => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (e) => {
    e.preventDefault()
    dispatch(createBlog({ title, author, url }))
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }
  const handleAuthorChange = (e) => {
    setAuthor(e.target.value)
  }
  const handleUrlChange = (e) => {
    setUrl(e.target.value)
  }
  return (
    <div className="p-2">
      <Form onSubmit={addBlog}>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter blog title"
          id="title"
          onChange={handleTitleChange}
          value={title}
        />
        <Form.Label>Author</Form.Label>

        <Form.Control
          type="text"
          placeholder="Author"
          id="author"
          onChange={handleAuthorChange}
          value={author}
        />
        <Form.Label>Url</Form.Label>

        <Form.Control
          type="url"
          placeholder="url"
          id="Url"
          onChange={handleUrlChange}
          value={url}
        />
        <Button id="submit-blog" type="submit" variant="success">
          create
        </Button>
      </Form>
    </div>
  )
}

export default BlogForm
