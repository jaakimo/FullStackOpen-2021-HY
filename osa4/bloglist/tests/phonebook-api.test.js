// const jest = require('jest');
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)
const Blog = require('../models/blog')

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
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
    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(resultBlog.body).toEqual(JSON.parse(JSON.stringify(blogToView)))
  })
  test('fails with code 404 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()
    await api.get(`/api/blogs/${validNonexistingId}`).expect(404)
  })

  test('fails with code 400 if malformed id', async () => {
    const malformattedId = '1010010'
    await api.get(`/api/blogs/${malformattedId}`).expect(400)
  })
})
describe('adding a blog', () => {
  test('a blog can be added', async () => {
    const newBlog = {
      author: 'tester',
      title: 'testblog',
      url: 'testurl.url',
      likes: 10,
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  })
})

describe('deleting a blog', () => {
  test('succeeds with status 200 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).not.toContainEqual(blogToDelete)
  })
})
describe('updating a blog', () => {
  test('with valid id, should update with status 200', async () => {
    const blogsAtStart = await helper.blogsInDb()
    await api
      .put(`/api/blogs/${blogsAtStart[0].id}`)
      .send({ likes: 100000 })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[0].likes === 100000)
  })
})

afterAll(() => mongoose.connection.close())
