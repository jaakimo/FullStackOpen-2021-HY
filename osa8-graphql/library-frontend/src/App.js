import {
  useApolloClient,
  useQuery,
  useSubscription,
} from '@apollo/client'
import React, { useEffect, useState } from 'react'
import AuthorForm from './components/AuthorForm'
import Authors from './components/Authors'
import Books from './components/Books'
import Error from './components/Error'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Recommended from './components/Recommended'
import {
  ALL_AUTHORS,
  ALL_BOOKS,
  ME,
  BOOK_ADDED,
  AUTHOR_MODIFIED,
} from './queries'

const GENRES = [
  'patterns',
  'refactoring',
  'agile',
  'classic',
  'crime',
  'revolution',
  'design',
]

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const client = useApolloClient()

  const authorsQuery = useQuery(ALL_AUTHORS)
  const booksQuery = useQuery(ALL_BOOKS)
  const meQuery = useQuery(ME)

  const updateCacheWith = (itemAdded, query) => {
    const dataInStore = client.readQuery({ query: query })
    if (query === ALL_BOOKS) {
      if (
        dataInStore.allBooks &&
        dataInStore.allBooks.every((b) => b.id !== itemAdded.id)
      ) {
        client.writeQuery({
          query: ALL_BOOKS,
          data: {
            ...dataInStore,
            allBooks: [...dataInStore.allBooks, itemAdded],
          },
        })
      }
    }
    if (query === ALL_AUTHORS) {
      if (dataInStore.allAuthors) {
        let allAuthors
        if (dataInStore.allAuthors.every((a) => a.id !== itemAdded.id)) {
          allAuthors = [...dataInStore.allAuthors, itemAdded]
        } else {
          allAuthors = dataInStore.allAuthors.map((a) =>
            a.id === itemAdded.id ? itemAdded : a
          )
        }

        client.writeQuery({
          query: ALL_AUTHORS,
          data: {
            ...dataInStore,
            allAuthors: allAuthors,
          },
        })
      }
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      notify('book added')
      updateCacheWith(subscriptionData.data.bookAdded, ALL_BOOKS)
    },
  })
  useSubscription(AUTHOR_MODIFIED, {
    onSubscriptionData: ({ subscriptionData }) => {
      notify('book and author added')
      updateCacheWith(subscriptionData.data.authorModified, ALL_AUTHORS)
    },
  })

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    if (token) {
      setToken(token)
    }
  }, [])

  if (booksQuery.loading || authorsQuery.loading) {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.clearStore()
  }

  if (!token) {
    return (
      <div>
        {errorMessage ? <Error errorMessage={errorMessage} /> : null}
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('login')}>login</button>

        {page === 'authors' ? (
          <Authors authors={authorsQuery.data.allAuthors} />
        ) : null}

        {page === 'books' ? (
          <Books books={booksQuery.data.allBooks} allGenres={GENRES} />
        ) : null}

        {page === 'login' ? (
          <LoginForm setToken={setToken} setError={notify} />
        ) : null}
      </div>
    )
  }

  return (
    <div>
      {errorMessage ? <Error errorMessage={errorMessage} /> : null}

      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommended')}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <>
            <button onClick={() => setPage('login')}>login</button>
          </>
        )}
      </div>

      {page === 'authors' ? (
        <Authors authors={authorsQuery.data.allAuthors} setError={notify} />
      ) : null}

      {page === 'authors' && token ? (
        <AuthorForm setError={notify} authors={authorsQuery.data.allAuthors} />
      ) : null}
      {page === 'books' ? (
        <Books books={booksQuery.data.allBooks} allGenres={GENRES} />
      ) : null}
      {page === 'recommended' ? (
        <Recommended
          books={booksQuery.data.allBooks}
          favoriteGenre={meQuery.data.me.favoriteGenre}
        />
      ) : null}

      {page === 'add' ? (
        <NewBook
          show={page === 'add'}
          setError={notify}
          updateCacheWith={updateCacheWith}
          allGenres={GENRES}
        />
      ) : null}
    </div>
  )
}

export default App
