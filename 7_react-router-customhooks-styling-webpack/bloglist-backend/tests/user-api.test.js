const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./user_helper')

const api = supertest(app)
const User = require('../models/user')

describe('when there is initially some users saved', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)
  })
  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all users are returned', async () => {
    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(helper.initialUsers.length)
  })
  test('should be able to find a specific user', async () => {
    const usersAtStart = await helper.usersInDb()
    const userToView = helper.initialUsers[0]
    const usernames = usersAtStart.map((u) => u.username)

    expect(usernames).toContainEqual(userToView.username)
  })
  test('identifier is named as id', async () => {
    const usersAtStart = await helper.usersInDb()
    expect(usersAtStart[0].id).toBeDefined()
  })
})

describe('viewing a specific user', () => {
  test('should be able to find user with valid id', async () => {
    const usersAtStart = await helper.usersInDb()
    const userToView = usersAtStart[0]
    await api
      .get(`/api/users/${userToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('should fail with code 404 with valid nonexisting user id', async () => {
    const validNonexistingId = await helper.validNonexistingId()

    await api
      .get(`/api/users/${validNonexistingId}`)
      .expect(404)
      .expect('Content-Type', /application\/json/)
  })
  test('should fail with code 400 with invalid id', async () => {
    const malformattedId = '200201010'
    await api
      .get(`/api/users/${malformattedId}`)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
})

describe('when user is added', () => {
  test('should add user with valid input', async () => {
    const newUser = {
      username: 'jaakko',
      name: 'Jaakko Kotitalo',
      password: 'goodpassword',
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(helper.initialUsers.length + 1)
  })
  test('should fail with code 400 with too short password', async () => {
    const invalidUserPw = {
      username: 'username',
      name: 'user with a name',
      password: '0',
    }
    await api
      .post('/api/users')
      .send(invalidUserPw)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
  test('should fail with code 400 with missing username', async () => {
    const invalidUserPw = {
      username: '',
      name: 'teeeppo',
      password: '01124142',
    }
    await api
      .post('/api/users')
      .send(invalidUserPw)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
  test('should fail with code 400 with missing name', async () => {
    const invalidUserPw = {
      username: 'tetktje',
      name: '',
      password: '01124142',
    }
    await api
      .post('/api/users')
      .send(invalidUserPw)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('should fail with code 400 when username already taken', async () => {
    const duplicateUsername = {
      username: 'hellas',
      name: 'arto',
      password: 'passu',
    }
    await api
      .post('/api/users')
      .send(duplicateUsername)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(helper.initialUsers.length + 1)
  })
})

describe('when user is deleted', () => {
  test('should succeed with code 204 with valid id', async () => {
    const usersAtStart = await helper.usersInDb()
    const userToDelete = usersAtStart[0]
    await api.delete(`/api/users/${userToDelete.id}`).expect(204)
  })
  test('should fail with code 404 with nonexisting user id', async () => {
    const validNonexistingId = await helper.validNonexistingId()
    await api
      .delete(`/api/users/${validNonexistingId}`)
      .expect(404)
      .expect('Content-Type', /application\/json/)
  })
  test('should fail with code 400 with malformed id', async () => {
    const malformedId = '1010241lkdfjg'
    await api
      .delete(`/api/users/${malformedId}`)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
