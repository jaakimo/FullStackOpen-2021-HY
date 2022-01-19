import React, { useState } from 'react'

import { useMutation } from '@apollo/client'
import { ADD_BOOK, ALL_BOOKS } from '../queries'

const NewBook = ({ setError, updateCacheWith, allGenres }) => {
  const [addBook] = useMutation(ADD_BOOK, {
    onError: (error) => {
      setError(error.message)
    },
    update: (_, response) => {
      updateCacheWith(response.data.addBook, ALL_BOOKS)
    },
  })

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genres, setGenres] = useState([])

  const submit = async (event) => {
    event.preventDefault()
    addBook({
      variables: { title, author, published: Number(published), genres },
    })
  }

  const selectGenre = (e) => {
    if (genres.includes(e.target.value)) {
      setGenres(genres.filter((genre) => genre !== e.target.value))
    } else setGenres([...genres, e.target.value])
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          {allGenres.map((genre) => {
            return (
              <>
                {' '}
                {genre}
                <input
                  type="checkbox"
                  value={genre}
                  name={genre}
                  onClick={selectGenre}
                />
                ,
              </>
            )
          })}
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
