import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries'
import Select from 'react-select'

const AuthorForm = ({ authors, setError }) => {
  const [updateAuthor, result] = useMutation(UPDATE_AUTHOR, {
    onError: (error) => {
      setError(error.message)
    },
    update: (store, response) => {
      const dataInStore = store.readQuery({ query: ALL_AUTHORS })
      store.writeQuery({
        query: ALL_AUTHORS,
        data: {
          ...dataInStore,
          allAuthors: dataInStore.allAuthors.map((author) =>
            author.id === selectedOption ? response.data.editAuthor : author
          ),
        },
      })
    },
  })

  const [selectedOption, setSelectedOption] = useState(null)
  const [born, setBorn] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (selectedOption) {
      updateAuthor({
        variables: { id: selectedOption.value, setBornTo: Number(born) },
      })
    }
    setBorn('')
  }

  const options = authors.map((author) => ({
    value: author.id,
    label: author.name,
  }))

  return (
    <div>
      <h4>Set birthyear</h4>
      <form onSubmit={handleSubmit}>
        <div>
          Name:
          <Select
            options={options}
            value={selectedOption}
            onChange={(e) => setSelectedOption(e)}
          />
        </div>
        <div>
          born:
          <input
            type="number"
            value={born}
            onChange={(e) => setBorn(e.target.value)}
          />
        </div>
        <button type="submit">update</button>
      </form>
    </div>
  )
}

export default AuthorForm
