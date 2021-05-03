import { expect } from 'chai'

import Database from '../../../src/database'
import dbConfig from '../../../src/config/database'
import BookResolver from '../../../src/graphql/resolvers/BookResolver'
import BookCreate from '../../../src/entities/BookCreate'
import BookUpdate from '../../../src/entities/BookUpdate'
import {
  clearTableBook,
  createBook,
  bookData,
  bookId
} from '../../resources/book-seeder'
import Book from '../../../src/entities/Book.DataMapper'

describe('src/graphql/resolvers/BookResolver', () => {
  beforeEach(async () => {
    await Database.init(dbConfig)
    await clearTableBook()
  })

  it('books - espera retornar um array de book', async () => {
    const resolver = new BookResolver()
    await createBook()
    const result = await resolver.books()
    const book = new Book()
    Object.assign(book, {
      id: '180a1b2a-66f5-4ed6-859b-8f411d9ce170',
      name: 'Livro X',
      createdAt: new Date(2021, 0, 1, 10, 30, 0),
      updatedAt: new Date(2021, 0, 1, 10, 30, 0)
    })
    expect(result).to.be.eql([book])
  })

  it('book - espera retornar um objeto de book', async () => {
    const resolver = new BookResolver()
    await createBook()
    const result = await resolver.book(bookId)
    const book = new Book()
    Object.assign(book, {
      id: '180a1b2a-66f5-4ed6-859b-8f411d9ce170',
      name: 'Livro X',
      createdAt: new Date(2021, 0, 1, 10, 30, 0),
      updatedAt: new Date(2021, 0, 1, 10, 30, 0)
    })

    expect(result).to.be.eql(book)
  })

  it('createBook - espera retornar um objeto de book', async () => {
    const resolver = new BookResolver()
    const book = new BookCreate()
    book.name = bookData.name
    const result = await resolver.createBook(book)

    expect(result).to.deep.include({
      name: 'Livro X'
    })
  })

  it('updateBook - espera retornar um objeto de book', async () => {
    const resolver = new BookResolver()
    await createBook()
    const book = new BookUpdate()
    book.name = 'Livro Z'
    const result = await resolver.updateBook(bookId, book)

    expect(result).to.deep.include({
      id: '180a1b2a-66f5-4ed6-859b-8f411d9ce170',
      name: 'Livro Z'
    })
  })

  it('deleteBook - espera retornar um objeto com status igual true', async () => {
    const resolver = new BookResolver()
    await createBook()
    const result = await resolver.deleteBook(bookId)

    expect(result).to.be.eql({ status: true })
  })
})
