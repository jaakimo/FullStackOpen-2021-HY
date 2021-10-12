// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username,
    password,
  }).then(({ body }) =>
    localStorage.setItem('loggedUser', JSON.stringify(body))
  )
  cy.visit('http://localhost:3000')
})

Cypress.Commands.add('resetDb', (users) => {
  cy.request('POST', 'http://localhost:3001/api/testing/reset')
  users.forEach(user => {
    cy.request('POST', 'http://localhost:3001/api/users', user)

  })
})

Cypress.Commands.add('createBlogs', ({ user, blogs }) => {
  blogs.forEach(blog => {
    cy.request({ method: 'POST', url: 'http://localhost:3001/api/blogs', body:blog, headers:{ Authorization: `bearer ${user.token}` } } )
  })
  cy.visit('http://localhost:3000')
})