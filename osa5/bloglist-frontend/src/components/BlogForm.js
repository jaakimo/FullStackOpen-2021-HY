import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (e) => {
    e.preventDefault()
    createBlog({ title, author, url })
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
    <div>
      <form onSubmit={addBlog}>
        <div>
          title:{' '}
          <input
            id="title"
            type="text"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author:{' '}
          <input
            id="author"
            type="text"
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url:{' '}
          <input id="url" type="text" value={url} onChange={handleUrlChange} />
        </div>
        <button id="submit" type="submit">
          create
        </button>
      </form>
    </div>
  )
}

BlogForm.propTypes = { createBlog: PropTypes.func.isRequired }

export default BlogForm
