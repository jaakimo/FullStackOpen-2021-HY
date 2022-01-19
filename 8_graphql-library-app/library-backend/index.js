const { createServer } = require('http')
const { execute, subscribe } = require('graphql')
const { SubscriptionServer } = require('subscriptions-transport-ws')
const { makeExecutableSchema } = require('@graphql-tools/schema')

const { ApolloServer } = require('apollo-server-express')

const jwt = require('jsonwebtoken')
const { TEST_BOOKS, TEST_AUTHORS, TEST_USERS } = require('./data')
require('dotenv').config()

const mongoose = require('mongoose')

const { typeDefs } = require('./schema')
const { resolvers } = require('./resolvers')

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const express = require('express')

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.info('Connected to DB'))
  .catch((err) => console.error(err))
;(async function () {
  const app = express()
  const httpServer = createServer(app)

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  })

  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
    },
    {
      server: httpServer,
      path: '/graphql',
    }
  )

  const server = new ApolloServer({
    schema,
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close()
            },
          }
        },
      },
    ],
    context: async ({ req }) => {
      const auth = req ? req.headers.authorization : null
      if (auth && auth.toLowerCase().startsWith('bearer ')) {
        const decodedToken = jwt.verify(
          auth.substring(7),
          process.env.JWT_SECRET
        )
        const currentUser = await User.findById(decodedToken.id)
        return { currentUser }
      }
    },
  })

  await server.start()
  server.applyMiddleware({ app })
  httpServer.listen(4000, () => {
    console.log(`Server ready at ${4000}`)
  })
})()

// reset to initial state
;(async function () {
  await Book.collection.deleteMany({})
  await Author.collection.deleteMany({})
  await User.collection.deleteMany({})

  await Author.insertMany(TEST_AUTHORS)
  for (book of TEST_BOOKS) {
    let author = await Author.findOne({ name: book.author })
    const newBook = new Book({ ...book, author: author })
    await newBook.save()
    await author.updateOne({ bookCount: author.bookCount + 1 })
  }

  User.insertMany(TEST_USERS)
})()
