/* eslint-disable no-restricted-syntax */
// eslint-disable-next-line import/no-extraneous-dependencies
const supertest = require('supertest')
const Blog = require('../models/blog')
const User = require('../models/user')
const app = require('../app')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
]

const setupTestUser = async () => {
  await User.deleteMany({})
  await api.post('/api/users').send({
    username: 'testUser',
    name: 'user',
    password: 'test',
  })
}

const loginTestUser = async () => {
  const r = await api
    .post('/api/login')
    .send({ username: 'testUser', password: 'test' })
    .expect(200)

  const { token } = r.body
  const userId = r.body.id
  return [token, userId]
}

const initializeBlogs = async () => {
  const tokenAndId = await loginTestUser()
  for (const blog of initialBlogs) {
    const newBlog = new Blog({ ...blog, user: tokenAndId[1] })
    // eslint-disable-next-line no-await-in-loop
    await newBlog.save()
  }
}

const nonExistingId = async () => {
  const newBlog = new Blog({
    title: 'willremovethissoon',
    url: 'a',
    author: 'a',
    likes: 0,
  })
  await newBlog.save()
  await newBlog.remove()

  return newBlog._id.toString()
}

const blogsInDb = async () => {
  const response = await Blog.find({})
  return response.map((blog) => blog.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  initializeBlogs,
  setupTestUser,
  loginTestUser,
}
