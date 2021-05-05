import { Request, Response } from 'express'
import { createQueryBuilder } from 'typeorm'

import Student from '../entities/Student.DataMapper'
import uuid from '../utils/uuid'

export default class StudentController {
  static async index(req: Request, res: Response): Promise<Response> {
    const students = await createQueryBuilder()
      .select([
        'students.id',
        'students.name',
        'students.phone',
        'students.createdAt',
        'students.updatedAt'
      ])
      .from(Student, 'students')
      .getMany()

    return res.json(students)
  }

  static async show(req: Request, res: Response): Promise<Response> {
    const student = await createQueryBuilder()
      .select([
        'student.id',
        'student.name',
        'student.phone',
        'student.createdAt',
        'student.updatedAt'
      ])
      .from(Student, 'student')
      .where('student.id = :id', { id: req.params.id })
      .getOne()

    return res.status(student ? 200 : 404).json(student)
  }

  static async create(req: Request, res: Response): Promise<Response> {
    const result = await createQueryBuilder()
      .insert()
      .into(Student)
      .values({
        ...req.body,
        id: uuid.v4(),
        createdAt: new Date(),
        updatedAt: new Date()
      })
      .returning(['id', 'name', 'phone', 'createdAt', 'updatedAt'])
      .execute()

    const student = result.generatedMaps[0]

    return res.status(201).json(student)
  }

  static async update(req: Request, res: Response): Promise<Response> {
    await createQueryBuilder()
      .update(Student)
      .set(req.body)
      .where('id = :id', { id: req.params.id })
      .execute()

    const student = await createQueryBuilder()
      .select([
        'student.id',
        'student.name',
        'student.phone',
        'student.createdAt',
        'student.updatedAt'
      ])
      .from(Student, 'student')
      .where('student.id = :id', { id: req.params.id })
      .getOne()

    return res.status(student ? 200 : 404).json(student)
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    const result = await createQueryBuilder()
      .delete()
      .from(Student)
      .where('id = :id', { id: req.params.id })
      .execute()

    return res.json(result)
  }
}
