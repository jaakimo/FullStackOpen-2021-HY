import blogsService from '../services/blogs'
import { setErrorWithSeconds } from './errorReducer'
import { setNotificationWithSeconds } from './notificationReducer'
import { addUserLike } from './userReducer'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INITIALIZE_BLOGS':
      return action.data
    case 'CREATE_BLOG':
      return [...state, action.data]
    case 'LIKE_BLOG':
      return state.map((blog) =>
        blog.id === action.data.id ? { ...action.data, user: blog.user } : blog
      )
    case 'CREATE_COMMENT':
      return state.map((blog) =>
        blog.id === action.data.id ? { ...blog, ...action.data.comments } : blog
      )
    case 'REMOVE_BLOG':
      return state.filter((blog) => blog.id !== action.data.id)
    default:
      return state
  }
}

export const getBlogs = () => {
  return async (dispatch) => {
    try {
      const response = await blogsService.getAll()
      dispatch({ type: 'INITIALIZE_BLOGS', data: response })
    } catch (error) {
      dispatch(setErrorWithSeconds(error, 5))
    }
  }
}

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    try {
      const response = await blogsService.create(blogObject)
      dispatch(
        setNotificationWithSeconds(
          `blog "${blogObject.title}" by ${blogObject.author} created`,
          5
        )
      )
      dispatch({ type: 'CREATE_BLOG', data: response })
    } catch (error) {
      dispatch(setErrorWithSeconds(error, 5))
    }
  }
}

export const likeBlog = (id) => {
  return async (dispatch) => {
    const blog = await blogsService.getById(id)
    await blogsService.like(blog)
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    dispatch(addUserLike(id))
    dispatch({ type: 'LIKE_BLOG', data: updatedBlog })
  }
}

export const addComment = ({ id, comment }) => {
  return async (dispatch) => {
    const comments = await blogsService.comment({ id, comment })
    dispatch({ type: 'CREATE_COMMENT', data: { id, comments } })
  }
}

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogsService.remove(id)
    dispatch({ type: 'REMOVE_BLOG', data: { id } })
  }
}

export default reducer
