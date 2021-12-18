const blogsRouter = require('express').Router()
const checkUpdateAuthorization = require('../middleware/checkupdateauthorization')
const userExtractor = require('../middleware/userextractor')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  })
  res.status(200).json(blogs)
})

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)

  if (blog) res.status(200).json(blog)
  else res.status(404).end()
})

blogsRouter.post('/', userExtractor, async (req, res) => {
  const newBlog = new Blog({ ...req.body, user: req.user._id })
  const response = await newBlog.save()

  // Update user blogs
  const user = await User.findById(req.user._id)
  await User.findByIdAndUpdate(req.user._id, {
    blogs: [...user.blogs, response.id],
  })

  const result = await response.populate('user', {
    username: 1,
    name: 1,
    id: 1,
  })
  res.status(201).json(result)
})

blogsRouter.delete(
  '/:id',
  userExtractor,
  checkUpdateAuthorization,
  async (req, res) => {
    await Blog.findByIdAndDelete(req.params.id)

    const user = await User.findById(req.user._id)
    const updatedBlogs = user.blogs.filter(
      (blogId) => blogId.toString() !== req.params.id
    )
    await User.findByIdAndUpdate(req.user._id, {
      blogs: updatedBlogs,
    })
    return res.status(204).end()
  }
)

blogsRouter.put('/:id', async (req, res) => {
  const result = await Blog.findByIdAndUpdate(req.params.id, req.body)
  return res.status(200).json(result.body)
})

blogsRouter.post('/:id/comment', async (req, res) => {
  const blog = await Blog.findById(req.params.id)

  if (!blog) return res.status(404).end()

  const comments = [...blog.comments, req.body.comment]

  const result = await Blog.findByIdAndUpdate(req.params.id, { comments })
  return res.status(201).json({ comments })
})

module.exports = blogsRouter
