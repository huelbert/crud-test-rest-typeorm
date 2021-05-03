import chai, { expect } from 'chai'
import chaiHTTP from 'chai-http'

import App from '../../src/app'
import Database from '../../src/database'
import dbConfig from '../../src/config/database'
import {
  clearTableBook,
  createBook,
  bookData,
  bookId
} from '../resources/book-seeder'

chai.use(chaiHTTP)

const url = '/v1/data-mapper/manager/book'

describe('book - Data Mapper Pattern (Manager)', () => {
  beforeEach(async () => {
    await Database.init(dbConfig)
    await clearTableBook()
  })

  it('index', async () => {
    await createBook()
    const app = await App.startServer()
    const response = await chai.request(app).get(url)

    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.a('array')
    expect(response.body[0].id).to.be.a('string')
    expect(response.body[0].name).to.be.a('string')
    expect(response.body[0].createdAt).to.be.a('string')
    expect(response.body[0].updatedAt).to.be.a('string')
  })

  it('show', async () => {
    await createBook()
    const app = await App.startServer()
    const response = await chai.request(app).get(`${url}/${bookId}`)

    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.a('object')
    expect(response.body.id).to.be.equal(bookId)
    expect(response.body.name).to.be.a('string')
    expect(response.body.createdAt).to.be.a('string')
    expect(response.body.updatedAt).to.be.a('string')
  })

  it('create', async () => {
    const app = await App.startServer()
    const response = await chai.request(app).post(url).send(bookData)

    expect(response.status).to.be.equal(201)
    expect(response.body).to.be.a('object')
    expect(response.body.id).to.be.a('string')
    expect(response.body.name).to.be.a('string')
    expect(response.body.createdAt).to.be.a('string')
    expect(response.body.updatedAt).to.be.a('string')
  })

  it('update', async () => {
    await createBook()
    const update = { name: 'New Name' }
    const app = await App.startServer()
    const response = await chai
      .request(app)
      .put(`${url}/${bookId}`)
      .send(update)

    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.a('object')
    expect(response.body.id).to.be.a('string')
    expect(response.body.name).to.be.a('string')
    expect(response.body.createdAt).to.be.a('string')
    expect(response.body.updatedAt).to.be.a('string')
    expect(response.body.name).to.be.equal(update.name)
  })

  it('delete', async () => {
    await createBook()
    const app = await App.startServer()
    const response = await chai.request(app).delete(`${url}/${bookId}`)

    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.a('object')
    expect(response.body).to.has.property('raw')
    expect(response.body.affected).to.be.a('number')
  })
})
