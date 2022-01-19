import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog/>', () => {
  const blog = {
    title: 'testTitle',
    author: 'testAuthor',
    url: 'testUrl',
    likes: 222,
    user: { id: 'testId' },
  }
  const likeBlog = jest.fn()
  const deleteBlog = jest.fn()

  test('component is rendered', () => {
    const component = render(
      <Blog
        blog={blog}
        likeBlog={likeBlog}
        deleteBlog={deleteBlog}
        user={blog.user}
      />
    )

    expect(component.container).toHaveTextContent('testTitle')
    expect(component.container).toHaveTextContent('testAuthor')
    expect(component.container).toHaveTextContent('testUrl')
    expect(component.container).toHaveTextContent('222')
  })
  describe('Hidden content', () => {
    test('Blog url and likes should be hidden at start', () => {
      const component = render(
        <Blog
          blog={blog}
          likeBlog={likeBlog}
          deleteBlog={deleteBlog}
          user={blog.user}
        />
      )

      const togglableContent =
        component.container.querySelector('.togglableContent')
      expect(togglableContent).toBeDefined()
      expect(togglableContent).toHaveStyle('display: none')
    })

    test('clicking View button on a Blog should display url and likes', () => {
      const component = render(
        <Blog
          blog={blog}
          likeBlog={likeBlog}
          deleteBlog={deleteBlog}
          user={blog.user}
        />
      )
      const button = component.getByText('View')
      fireEvent.click(button)
      const togglableContent =
        component.container.querySelector('.togglableContent')
      expect(togglableContent).toBeDefined()
      expect(togglableContent).not.toHaveStyle('display: none')
    })
  })

  describe('Function calls', () => {
    test('clicking like button twice should call event handler twice', () => {
      const component = render(
        <Blog
          blog={blog}
          likeBlog={likeBlog}
          deleteBlog={deleteBlog}
          user={blog.user}
        />
      )
      const likebutton = component.getByText('like')
      fireEvent.click(likebutton)
      fireEvent.click(likebutton)
      expect(likeBlog.mock.calls).toHaveLength(2)
    })
  })
})
