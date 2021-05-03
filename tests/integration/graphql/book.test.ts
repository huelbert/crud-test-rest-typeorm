import chai, { expect } from 'chai'
import chaiHTTP from 'chai-http'

import App from '../../../src/app'
import Database from '../../../src/database'
import dbConfig from '../../../src/config/database'
import {
  BOOKS,
  BOOK,
  CREATE_BOOK,
  UPDATE_BOOK,
  DELETE_BOOK
} from '../../helpers/gql/book'
import {
  clearTableBook,
  createBook,
  bookData,
  bookId
} from '../../resources/book-seeder'

chai.use(chaiHTTP)

const url = '/graphql'

describe('book - API GraphQL', () => {
  beforeEach(async () => {
    await Database.init(dbConfig)
    await clearTableBook()
  })

  it('books - espera retornar um array de book', async () => {
    await createBook()
    const app = await App.startServer()
    const body = BOOKS()
    const response = await chai.request(app).post(url).send(body)

    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.eql({
      data: {
        books: [{ name: 'Livro X' }]
      }
    })
  })

  it('book - espera retornar um objeto de book', async () => {
    await createBook()
    const app = await App.startServer()
    const body = BOOK({ id: bookId })
    const response = await chai.request(app).post(url).send(body)

    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.eql({
      data: {
        book: { name: 'Livro X' }
      }
    })
  })

  it('createBook - espera retornar um objeto de book', async () => {
    const app = await App.startServer()
    const variables = {
      name: bookData.name
    }
    const body = CREATE_BOOK(variables)
    const response = await chai.request(app).post(url).send(body)

    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.eql({
      data: {
        createBook: {
          name: 'Livro X'
        }
      }
    })
  })

  it('updateBook - espera retornar um objeto de book', async () => {
    await createBook()
    const app = await App.startServer()
    const variables = {
      id: bookId,
      name: 'Livro Z'
    }
    const body = UPDATE_BOOK(variables)
    const response = await chai.request(app).post(url).send(body)

    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.eql({
      data: {
        updateBook: {
          name: 'Livro Z'
        }
      }
    })
  })

  it('deleteBook - espera retornar um objeto com status igual true', async () => {
    await createBook()
    const app = await App.startServer()
    const variables = {
      id: bookId
    }
    const body = DELETE_BOOK(variables)
    const response = await chai.request(app).post(url).send(body)

    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.eql({
      data: { deleteBook: { status: true } }
    })
  })
})
