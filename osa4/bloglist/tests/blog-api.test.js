const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const helper = require('./blog_helper')
const Blog = require('../models/blog')

const api = supertest(app)

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await helper.setupTestUser()
    await Blog.deleteMany({})
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
    await helper.setupTestUser()
    await Blog.deleteMany({})
    await helper.initializeBlogs()
  })

  describe('adding a blog', () => {
    test('a blog can be added', async () => {
      const blogsAtStart = await helper.blogsInDb()

      const newBlog = {
        author: 'tester',
        title: 'testblog',
        url: 'testurl.url',
        likes: 10,
      }
      await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${helper.getToken()}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)
    })
    test('should fail with code 400 if token is invalid', async () => {
      const newBlog = {
        author: 'tester',
        title: 'testblog',
        url: 'testurl.url',
        likes: 10,
      }
      await api
        .post('/api/blogs')
        .set('Authorization', 'bearer laksdjflskdjfsdlkjfp124')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)
    })
  })

  describe('deleting a blog', () => {
    test('succeeds with status 200 if id is valid and blog owner', async () => {
      const blogsAtStart = await helper.blogsInDb()

      const blogToRemove = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToRemove.id}`)
        .set('Authorization', `bearer ${helper.getToken()}`)
        .expect(204)
      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).not.toContainEqual(blogToRemove)
    })

    test('should fail with code 401 if invalid token', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToRemove = blogsAtStart[0]
      await api
        .delete(`/api/blogs/${blogToRemove.id}`)
        .set('Authorization', 'bearer asldkfjewopi1519u5oikhj}')
        .expect(401)
    })
    test('should fail with code 403 if not blog owner token', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToRemove = blogsAtStart[0]
      await api
        .delete(`/api/blogs/${blogToRemove.id}`)
        .set('Authorization', `bearer ${helper.getToken2()}`)
        .expect(403)
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
