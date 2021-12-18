const { UserInputError } = require('apollo-server-express')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
require('dotenv').config()

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      let books = await Book.find({}).populate('author')

      if (args.author) {
        books = books.filter((book) => book.author.name === args.author)
      }
      if (args.genres) {
        for (genre of args.genres) {
          books = books.filter((book) => book.genres.includes(genre))
        }
      }

      return books
    },
    authorCount: () => Author.collection.countDocuments(),
    allAuthors: async () => {
      return Author.find({})
    },
    me: async (root, args, context) =>
      context.currentUser
        ? context.currentUser
        : new UserInputError('not authenticated'),
  },

  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) throw new UserInputError('not authenticated')

      // check if author exists in DB. Create new author if it doensn't.
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        const newAuthor = new Author({ name: args.author })
        try {
          author = await newAuthor.save()
        } catch (error) {
          throw new UserInputError(error.message, { invalidArgs: args })
        }
      }

      const newBook = new Book({ ...args, author })
      try {
        await newBook.save()
        author = await Author.findByIdAndUpdate(
          author._id,
          {
            bookCount: author.bookCount + 1,
          },
          { new: true }
        )
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
      const book = await newBook.populate('author')
      pubsub.publish('BOOK_ADDED', { bookAdded: book })
      pubsub.publish('AUTHOR_MODIFIED', { authorModified: author })
      return book
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) throw new UserInputError('not authenticated')
      if (args.setBornTo < 1200 || args.setBornTo > new Date().getFullYear()) {
        throw new UserInputError('invalid year', { invalidArgs: args })
      }
      return Author.findByIdAndUpdate(
        args.id,
        { born: args.setBornTo },
        { new: true }
      )
    },

    createUser: (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      })
      try {
        return user.save()
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user | (args.password !== 'password')) {
        throw new UserInputError('wrong credentials')
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      }
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },

    authorModified: {
      subscribe: () => pubsub.asyncIterator(['AUTHOR_MODIFIED']),
    },
  },
}

module.exports = { resolvers }
