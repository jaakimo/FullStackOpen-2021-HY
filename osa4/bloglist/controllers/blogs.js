const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.status(200).json(blogs)
})

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)

  if (blog) res.status(200).json(blog)
  else res.status(404).end()
})

blogsRouter.post('/', async (req, res) => {
  const newBlog = new Blog(req.body)
  const result = await newBlog.save()
  res.status(201).json(result)
})

blogsRouter.delete('/:id', async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
  const result = await Blog.findByIdAndUpdate(req.params.id)
  res.status(200).json(result.body)
})

module.exports = blogsRouter
