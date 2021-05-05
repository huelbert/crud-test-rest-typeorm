import {
  DeepPartial,
  EntityRepository,
  FindConditions,
  Repository
} from 'typeorm'

import Student from '../entities/Student.DataMapper'

@EntityRepository(Student)
export default class StudentRepository extends Repository<Student> {
  async createAndReturn(
    data: DeepPartial<Student>
  ): Promise<DeepPartial<Student>> {
    const student = this.create(data)
    const registry = await this.save(student)

    const { id, name, phone, createdAt, updatedAt } = registry

    return {
      id,
      name,
      phone,
      createdAt,
      updatedAt
    }
  }

  async updateAndReturn(
    criteria: FindConditions<Student>,
    data: DeepPartial<Student>
  ): Promise<Student> {
    const result = await this.createQueryBuilder()
      .update(Student)
      .set(data)
      .where(criteria)
      .returning('*')
      .execute()

    const { id, name, phone, created_at, updated_at } = result.raw[0]

    const student = new Student()
    student.id = id
    student.name = name
    student.phone = phone
    student.createdAt = created_at
    student.updatedAt = updated_at

    return student
  }
}
