import chai, { expect } from 'chai'
import chaiHTTP from 'chai-http'

import App from '../../../src/app'
import Database from '../../../src/database'
import dbConfig from '../../../src/config/database'
import {
  STUDENTS,
  STUDENT,
  CREATE_STUDENT,
  UPDATE_STUDENT,
  DELETE_STUDENT
} from '../../helpers/gql/student'
import {
  clearTableStudent,
  createStudent,
  studentData,
  studentId
} from '../../resources/student-seeder'

chai.use(chaiHTTP)

const url = '/graphql'

describe('student - API GraphQL', () => {
  beforeEach(async () => {
    await Database.init(dbConfig)
    await clearTableStudent()
  })

  it('students - espera retornar um array de student', async () => {
    await createStudent()
    const app = await App.startServer()
    const body = STUDENTS()
    const response = await chai.request(app).post(url).send(body)

    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.eql({
      data: {
        students: [{ name: 'Student Y', phone: '+5535999998888' }]
      }
    })
  })

  it('student - espera retornar um objeto de student', async () => {
    await createStudent()
    const app = await App.startServer()
    const body = STUDENT({ id: studentId })
    const response = await chai.request(app).post(url).send(body)

    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.eql({
      data: {
        student: { name: 'Student Y', phone: '+5535999998888' }
      }
    })
  })

  it('createStudent - espera retornar um objeto de student', async () => {
    const app = await App.startServer()
    const variables = {
      name: studentData.name,
      phone: studentData.phone
    }
    const body = CREATE_STUDENT(variables)
    const response = await chai.request(app).post(url).send(body)

    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.eql({
      data: {
        createStudent: {
          name: 'Student Y',
          phone: '+5535999998888'
        }
      }
    })
  })

  it('updateStudent - espera retornar um objeto de student', async () => {
    await createStudent()
    const app = await App.startServer()
    const variables = {
      id: studentId,
      name: 'Maria'
    }
    const body = UPDATE_STUDENT(variables)
    const response = await chai.request(app).post(url).send(body)

    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.eql({
      data: {
        updateStudent: {
          name: 'Maria',
          phone: '+5535999998888'
        }
      }
    })
  })

  it('deleteStudent - espera retornar um objeto com status igual true', async () => {
    await createStudent()
    const app = await App.startServer()
    const variables = {
      id: studentId
    }
    const body = DELETE_STUDENT(variables)
    const response = await chai.request(app).post(url).send(body)

    expect(response.status).to.be.equal(200)
    expect(response.body).to.be.eql({
      data: { deleteStudent: { status: true } }
    })
  })
})
