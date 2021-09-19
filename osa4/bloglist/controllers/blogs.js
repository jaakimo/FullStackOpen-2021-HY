const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', (req, res) => {
  Blog.find({})
    .then((blogs) => res.status(200).json(blogs));
});

blogsRouter.post('/', (req, res) => {
  const newBlog = new Blog(req.body);
  newBlog
    .save()
    .then((result) => res.status(201).json(result));
});

blogsRouter.delete('/:id', (req, res) => {
  Blog.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end());
});

module.exports = blogsRouter;
