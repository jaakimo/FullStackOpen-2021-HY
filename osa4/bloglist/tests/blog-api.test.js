// const jest = require('jest');
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./blog_helper')

const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    await helper.setupTestUser()
    await helper.initializeBlogs()
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is returned', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToView = helper.initialBlogs[0]
    const titles = blogsAtStart.map((blog) => blog.title)
    expect(titles).toContainEqual(blogToView.title)
  })
  test('identifier is named as id', async () => {
    const blogsAtStart = await helper.blogsInDb()
    expect(blogsAtStart[0].id).toBeDefined()
  })
})
describe('viewing a specific blog', () => {
  test('succeeds with a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToView = blogsAtStart[0]
    await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('fails with code 404 if user does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()
    await api.get(`/api/blogs/${validNonexistingId}`).expect(404)
  })

  test('fails with code 400 if malformed id', async () => {
    const malformattedId = '1010010'
    await api.get(`/api/blogs/${malformattedId}`).expect(400)
  })
})

describe('blog creation, deletion, updating', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    await helper.setupTestUser()
    await helper.initializeBlogs()
  })

  describe('adding a blog', () => {
    test('a blog can be added', async () => {
      const token = await helper.loginTestUser()
      const blogsAtStart = await helper.blogsInDb()

      const newBlog = {
        author: 'tester',
        title: 'testblog',
        url: 'testurl.url',
        likes: 10,
      }

      await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token[0]}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)
    })
  })

  describe('deleting a blog', () => {
    test('succeeds with status 200 if id is valid and blog owner', async () => {
      const tokenAndUserId = await helper.loginTestUser()

      const blogsAtStart = await helper.blogsInDb()

      const blogToRemove = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToRemove.id}`)
        .set('Authorization', `bearer ${tokenAndUserId[0]}`)
        .expect(204)
      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).not.toContainEqual(blogToRemove)
    })
  })

  describe('updating a blog', () => {
    test('with valid id, should update with status 200', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]
      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send({ likes: blogToUpdate.likes + 1 })
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd[0].likes === blogToUpdate.likes + 1)
    })
  })
})

afterAll(() => mongoose.connection.close())
