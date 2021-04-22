import { expect } from 'chai'

import Database from '../../../src/database'
import dbConfig from '../../../src/config/database'
import StudentResolver from '../../../src/graphql/resolvers/StudentResolver'
import StudentCreate from '../../../src/entities/StudentCreate'
import StudentUpdate from '../../../src/entities/StudentUpdate'
import {
  clearTableStudent,
  createStudent,
  studentData,
  studentId
} from '../../resources/student-seeder'
import Student from '../../../src/entities/Student.DataMapper'

describe('src/graphql/resolvers/StudentResolver', () => {
  beforeEach(async () => {
    await Database.init(dbConfig)
    await clearTableStudent()
  })

  it('students - espera retornar um array de student', async () => {
    const resolver = new StudentResolver()
    await createStudent()
    const result = await resolver.students()
    const student = new Student()
    Object.assign(student, {
      id: '5a0a1b2a-66f5-4ed6-859b-8f411d9ce170',
      name: 'Fulano de tal',
      phone: '+5535999998888',
      createdAt: new Date(2021, 0, 1, 10, 30, 0),
      updatedAt: new Date(2021, 0, 1, 10, 30, 0)
    })
    expect(result).to.be.eql([student])
  })

  it('student - espera retornar um objeto de student', async () => {
    const resolver = new StudentResolver()
    await createStudent()
    const result = await resolver.student(studentId)
    const student = new Student()
    Object.assign(student, {
      id: '5a0a1b2a-66f5-4ed6-859b-8f411d9ce170',
      name: 'Fulano de tal',
      phone: '+5535999998888',
      createdAt: new Date(2021, 0, 1, 10, 30, 0),
      updatedAt: new Date(2021, 0, 1, 10, 30, 0)
    })

    expect(result).to.be.eql(student)
  })

  it('createStudent - espera retornar um objeto de student', async () => {
    const resolver = new StudentResolver()
    const student = new StudentCreate()
    student.name = studentData.name
    student.phone = studentData.phone
    const result = await resolver.createStudent(student)

    expect(result).to.deep.include({
      name: 'Fulano de tal',
      phone: '+5535999998888'
    })
  })

  it('updateStudent - espera retornar um objeto de student', async () => {
    const resolver = new StudentResolver()
    await createStudent()
    const student = new StudentUpdate()
    student.name = 'Maria'
    const result = await resolver.updateStudent(studentId, student)

    expect(result).to.deep.include({
      id: '5a0a1b2a-66f5-4ed6-859b-8f411d9ce170',
      name: 'Maria',
      phone: '+5535999998888'
    })
  })

  it('deleteStudent - espera retornar um objeto de student', async () => {
    const resolver = new StudentResolver()
    await createStudent()
    const result = await resolver.deleteStudent(studentId)

    expect(result).to.be.eql({ status: true })
  })
})
