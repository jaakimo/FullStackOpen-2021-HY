import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { setNotificationWithSeconds } from '../reducers/notificationReducer'
import { initializeAnecdotes, voteAnecdote } from '../reducers/anecdoteReducer'

const style = {
  paddingBottom: '5px',
}
const AnecdoteList = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  const anecdotes = useSelector((state) => {
    if (state.filter)
      return state.anecdotes.filter((anecdote) =>
        RegExp(state.filter, 'gi').test(anecdote.content)
      )
    return state.anecdotes
  })

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id))
    dispatch(setNotificationWithSeconds(`you voted "${anecdote.content}"`, 5))
  }
  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div style={style} key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes} votes.
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
