const blogsRouter = require('express').Router()
const tokenExtractor = require('../middleware/tokenextractor')
const userExtractor = require('../middleware/userextractor')
const Blog = require('../models/blog')

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

blogsRouter.post('/', tokenExtractor, userExtractor, async (req, res) => {
  const newBlog = new Blog({ ...req.body, user: req.user._id })
  const result = await newBlog.save()
  res.status(201).json(result)
})

blogsRouter.delete('/:id', tokenExtractor, userExtractor, async (req, res) => {
  const blogToRemove = await Blog.findById(req.params.id)
  if (
    !req.user._id ||
    !blogToRemove.user.toString() ||
    blogToRemove.user.toString() !== req.user.id.toString()
  ) {
    return res.status(403).json({ error: 'not authorized to remove that blog' })
  }

  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
  const result = await Blog.findByIdAndUpdate(req.params.id)
  res.status(200).json(result.body)
})

module.exports = blogsRouter
