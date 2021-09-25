/* eslint-disable import/no-extraneous-dependencies */

const supertest = require('supertest')
const Blog = require('../models/blog')
const User = require('../models/user')
const app = require('../app')

const api = supertest(app)
let userCreated = false
let token
let token2
let userId

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
  if (!userCreated) {
    await User.deleteMany({})
    await api
      .post('/api/users')
      .send({
        username: 'testUser',
        name: 'user',
        password: 'test',
      })
      .expect(201)

    userCreated = true
    const testUser = await api
      .post('/api/login')
      .send({ username: 'testUser', password: 'test' })
      .expect(200)

    token = testUser.body.token
    userId = testUser.body.id

    await api
      .post('/api/users')
      .send({
        username: 'testUser2',
        name: 'user',
        password: 'test',
      })
      .expect(201)

    userCreated = true
    const testUser2 = await api
      .post('/api/login')
      .send({ username: 'testUser2', password: 'test' })
      .expect(200)

    token2 = testUser2.body.token
  }
}

const initializeBlogs = async () => {
  const blogObjects = initialBlogs.map(
    (blog) => new Blog({ ...blog, user: userId })
  )
  await Blog.insertMany(blogObjects)
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

const getToken = () => token
const getToken2 = () => token2

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  initializeBlogs,
  setupTestUser,
  getToken,
  getToken2,
}
