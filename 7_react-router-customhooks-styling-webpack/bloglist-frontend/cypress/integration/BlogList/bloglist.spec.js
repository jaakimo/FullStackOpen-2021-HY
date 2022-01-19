/// <reference types="cypress" />


const TEST_USERS = [
  {
    username: 'anotherUser',
    name: 'tester',
    password: 'password',
  },
  {
    username: 'testUser',
    name: '2nd tester',
    password: 'password',
  }
]
const TEST_BLOGS_TESTUSER = [
  {
    title: 'test users title',
    author: 'testauthor',
    url: 'testurl',
    likes:1,
  },
  {
    title: 'test users 2nd title',
    author: 'least liked author',
    url: 'testurl1',
    likes:0,
  }
]
const TEST_BLOG_ANOTHER = [{
  title: 'another users title',
  author: 'testauthor2',
  url: 'testurl2',
  likes:100,
}]
describe('Blog app', function () {
  beforeEach(function () {
    cy.resetDb(TEST_USERS)
    cy.visit('http://localhost:3000')
  })

  it('front page should contain blog as title', function () {
    cy.contains('blog')
  })
  it('login form can be opened', function () {
    cy.contains('login').click()
    cy.contains('username')
    cy.contains('password')
  })
  it('login with invalid credentials shows error message', function () {
    cy.contains('login').click()
    cy.get('#username').type('test')
    cy.get('#password').type('wrongpass')
    cy.get('#submit-login').click()
    cy.contains('invalid username or password')
  })
  it('user can log in', function () {
    cy.contains('login').click()
    cy.get('#username').type(TEST_USERS[0].username)
    cy.get('#password').type(TEST_USERS[0].password)
    cy.get('#submit-login').click()
    cy.contains('logged')
  })
})
describe('When logged in', function () {
  beforeEach(() => {
    cy.resetDb(TEST_USERS)
    cy.login(TEST_USERS[0])
  })
  it('A blog can be created', function () {
    const testBlog = {
      title: 'testtitle',
      author: 'testauthor',
      url: 'testurl',
    }
    cy.contains('create a blog').click()
    cy.get('#title').type(testBlog.title)
    cy.get('#author').type(testBlog.author)
    cy.get('#url').type(testBlog.url)
    cy.get('#submit-blog').click()
    cy.contains(testBlog.title)
    cy.contains(testBlog.author)
    cy.get('.togglableContent')
      .should('have.css', 'display')
      .and('match', /none/)
  })

  after(() => cy.request('POST','http://localhost:3001/api/testing/reset'))
})
describe('When logged in and blogs have been created', () => {
  beforeEach(() => {
    cy.resetDb(TEST_USERS)
    cy.login(TEST_USERS[0])
    cy.window().then(window => {
      const user = JSON.parse(window.localStorage.getItem('loggedUser'))
      cy.createBlogs({ user: user, blogs: TEST_BLOG_ANOTHER })
    })
    // add blogs with another user
    cy.login(TEST_USERS[1])
    cy.window().then(window => {
      const user = JSON.parse(window.localStorage.getItem('loggedUser'))
      cy.createBlogs({ user: user, blogs: TEST_BLOGS_TESTUSER })
    })
  })
  it('blog can be liked', () => {
    cy.contains('View').click()
    let likesBefore = 0
    cy.get('.blog-likes').eq(0).then($likes => {
      likesBefore = parseInt($likes.html())
    })
    cy.get('.button-like').eq(0).click()
    likesBefore++
    cy.get('.blog-likes').eq(0).contains(likesBefore)
  })
  it('blog can be removed by the creator', () => {
    cy.contains('test users title').siblings('.button-visibility').click()
    cy.contains('delete').click()
    cy.on('window:confirm', str => {
      expect(str).contain('remove')
    })
    cy.on('window:confirm', () => {
      return true
    })
    cy.contains('test users title').should('not.exist')
  })

  it('another users blogs cannot be removed', () => {
    cy.contains('another').filter('.button-delete').should('not.exist')
  })
  it('Blogs should be sorted by likes', () => {

    cy.get('.blog-likes').then(($blogs) => {

      const arr = $blogs.toArray()
      const likes = arr.map(elem => Number(elem.innerHTML))
      let sorted = true
      for (let index = 0; index < likes.length - 1; index++) {
        if (likes[index] < likes[index + 1]) {
          sorted = false
          break
        }
      }
      expect(sorted).to.be.true

    })
  })

  it('Blogs should remain sorted when likes are added', () => {
    let likesBefore = 0
    cy.get('.blog-likes').eq(2).then(($likes) => {
      likesBefore =  parseInt($likes.eq(0).text())
      cy.get('.button-like').eq(2).click({ force: true }).then(() => {
        cy.get('.blog-likes').eq(2).should('have.html', String(likesBefore + 1))
        cy.get('.button-like').eq(2).click({ force: true }).then(() => {
          cy.get('.blog').contains('2nd title').get('.blog-likes').contains(`${likesBefore + 2}`)
        }
        )
      })
    })


  })

  //after(() => cy.request('POST','http://localhost:3001/api/testing/reset'))
})

