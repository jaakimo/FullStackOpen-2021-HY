import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const selectedStyle = {
  backgroundColor: 'gray',
}

const Books = ({ books, allGenres }) => {
  const [filters, setFilters] = useState([])
  const [filteredBooks, setFilteredBooks] = useState(books)
  const [getBooks, result] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    if (filters.length > 0) {
      getBooks({ variables: { genres: filters } })
    } else {
      getBooks()
    }
  }, [filters]) //eslint-disable-line

  useEffect(() => {
    if (result.data) {
      setFilteredBooks(result.data.allBooks)
    }
  }, [result])

  const filterbuttons = allGenres.map((genre) => {
    if (filters.includes(genre))
      return (
        <button
          style={selectedStyle}
          onClick={() =>
            setFilters(filters.filter((filter) => filter !== genre))
          }
        >
          {genre}
        </button>
      )
    return (
      <button onClick={() => setFilters([...filters, genre])}>{genre}</button>
    )
  })

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
            <th>genres</th>
          </tr>
          {filteredBooks.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
              <td>{book.genres.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <b>filter by genre </b>
      {filterbuttons}
    </div>
  )
}

export default Books
