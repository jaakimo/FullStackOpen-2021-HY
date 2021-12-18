import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  const createBlog = jest.fn()

  test('component is rendered', () => {
    const component = render(<BlogForm />)
    const titleField = component.container.querySelector('#title')
    const authorField = component.container.querySelector('#author')
    const urlField = component.container.querySelector('#url')
    expect(titleField).toBeDefined()
    expect(authorField).toBeDefined()
    expect(urlField).toBeDefined()
  })

  test('should call createForm with valid data', () => {
    const component = render(<BlogForm />)
    const titleField = component.container.querySelector('#title')
    const authorField = component.container.querySelector('#author')
    const urlField = component.container.querySelector('#url')
    const form = component.container.querySelector('form')
    fireEvent.change(titleField, { target: { value: 'testtitle' } })
    fireEvent.change(authorField, { target: { value: 'testauthor' } })
    fireEvent.change(urlField, { target: { value: 'testurl' } })
    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toEqual({
      title: 'testtitle',
      author: 'testauthor',
      url: 'testurl',
    })
  })
})
